/**
 * WPS 多维表格 AirScript — 按视图(View)导出数据到 PostgreSQL
 *
 * 功能:
 *   1. main(viewNames) 参数为视图名数组, 导出指定视图的数据
 *   2. PostgreSQL 中以视图名(viewName)作为表名保存
 *   3. 自动检测 Link (关联) 字段, 递归导出关联表的默认视图
 *   4. 发送字段类型信息, 服务端按 WPS 类型创建 PostgreSQL 列
 *   5. 分页获取 + 分批发送, 支持大数据量
 *   6. 所有同步字段值统一 trim (字符串/数组/对象递归; 含全角空格)
 *
 * ⚠️ 使用前必须修改 SERVER_URL 为你的 ngrok 公网地址!
 *
 * 使用步骤:
 *   1. 本地: node server.js
 *   2. 本地: npx ngrok http 3456
 *   3. 复制 ngrok 地址填入下方 SERVER_URL
 *   4. 修改最底部 main([...]) 参数为你要导出的视图名
 *   5. 在 WPS 多维表格「开发」→「脚本编辑器」粘贴运行
 */

// ============================================================
// 🔧 修改这里: 你的 ngrok 公网地址 (不带末尾斜杠)
const SERVER_URL = 'https://equicontinuous-dominique-meandrous.ngrok-free.dev';
// ============================================================

const PAGE_SIZE = 1000;
const BATCH_SIZE = 500;

/** JSON.parse 失败时的哨兵 (避免与合法解析结果 null 混淆) */
var _wpsJsonParseFailed = {};

function normWpsType(t) {
  return String(t == null ? '' : t).trim();
}

function isFormulaField(fld) {
  return normWpsType(fld.type).toLowerCase() === 'formula';
}

/**
 * WPS 中应按标量数字导出、避免把数组原样插入 PG NUMERIC 的类型 (大小写 + 别名)
 */
function isStrictNumericWpsType(type) {
  var t = normWpsType(type).toLowerCase();
  return (
    t === 'number' ||
    t === 'integer' ||
    t === 'currency' ||
    t === 'percent' ||
    t === 'percentage' ||
    t === 'autonumber' ||
    t === 'rating' ||
    t === 'progress'
  );
}

function lenientPrepJsonString(s) {
  return String(s)
    .trim()
    .replace(/^﻿/, '')
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'");
}

function tryLenientJsonParse(s) {
  try {
    return JSON.parse(lenientPrepJsonString(s));
  } catch (e) {
    return _wpsJsonParseFailed;
  }
}

/**
 * JSON.parse 仍失败时, 从类 JSON 数组字串里抠出第一个可解析数字 (如智能引号数组)
 * 先匹配货币形态, 避免把 #DIV/0! 里的单个 0 当成有效数
 */
function fallbackNumericFromBracketString(s) {
  var prep = lenientPrepJsonString(s);
  if (prep.charAt(0) !== '[') return null;
  var dollarRe = /\$[\d,]+\.?\d*/g;
  var m;
  while ((m = dollarRe.exec(prep)) !== null) {
    var n1 = parseWpsNumberToken(m[0]);
    if (n1 !== null) return n1;
  }
  var re = /[+\-]?\d+\.?\d*([eE][+\-]?\d+)?/g;
  while ((m = re.exec(prep)) !== null) {
    if (m.index > 0 && prep.charAt(m.index - 1) === '/') continue;
    var n2 = parseWpsNumberToken(m[0]);
    if (n2 !== null) return n2;
  }
  return null;
}

/**
 * 从单个 token 解析数字 (忽略货币符号与千分位); Excel 错误串视为无效
 */
function parseWpsNumberToken(token) {
  if (token === null || token === undefined) return null;
  if (typeof token === 'number') return isNaN(token) ? null : token;
  if (typeof token !== 'string') return null;
  var s = String(token).trim();
  if (!s) return null;
  if (s.charAt(0) === '#') return null;
  s = s.replace(/[$€£¥,\s]/g, '');
  var n = parseFloat(s);
  return isNaN(n) ? null : n;
}

/**
 * 将 WPS 可能返回的数组/货币串/JSON 数组字串规范为单个 number 或 null
 * 例如 Currency/Formula: ["#DIV/0!","$833.87"] → 833.87
 */
function normalizeNumericLikeValue(val) {
  if (val === null || val === undefined || val === '') return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;
  if (Array.isArray(val)) {
    for (var i = 0; i < val.length; i++) {
      var n = parseWpsNumberToken(val[i]);
      if (n !== null) return n;
    }
    return null;
  }
  if (typeof val === 'object') {
    if (val.value !== undefined && val.value !== val) {
      return normalizeNumericLikeValue(val.value);
    }
    return null;
  }
  if (typeof val === 'string') {
    var prep = lenientPrepJsonString(val);
    if (prep.charAt(0) === '[') {
      var parsed = tryLenientJsonParse(val);
      if (parsed !== _wpsJsonParseFailed) {
        return normalizeNumericLikeValue(parsed);
      }
      var fb = fallbackNumericFromBracketString(val);
      if (fb !== null) return fb;
    }
    return parseWpsNumberToken(prep);
  }
  return null;
}

/**
 * Lookup 用 baseType; 其余用 type
 */
function effectiveWpsFieldType(fld) {
  if (normWpsType(fld.type).toLowerCase() === 'lookup' && fld.baseType) return fld.baseType;
  return fld.type;
}

/**
 * Formula 可能返回标量、对象、或「错误+显示值」字符串数组; 仅对「全原始类型」的数组做数字归一, 其余保持原样 (如 JSON 结构)
 */
function normalizeValueForExport(val, fld) {
  var eff = effectiveWpsFieldType(fld);

  if (isStrictNumericWpsType(eff)) {
    return normalizeNumericLikeValue(val);
  }

  if (isFormulaField(fld)) {
    if (Array.isArray(val)) {
      var primitivesOnly = true;
      for (var i = 0; i < val.length; i++) {
        var item = val[i];
        var ti = typeof item;
        if (ti !== 'string' && ti !== 'number' && item !== null) {
          primitivesOnly = false;
          break;
        }
      }
      if (primitivesOnly) {
        return normalizeNumericLikeValue(val);
      }
    }
    if (typeof val === 'string') {
      var st = lenientPrepJsonString(val);
      if (st.charAt(0) === '[') {
        var arr = tryLenientJsonParse(val);
        if (arr !== _wpsJsonParseFailed && Array.isArray(arr)) {
          return normalizeValueForExport(arr, fld);
        }
        var fbForm = fallbackNumericFromBracketString(val);
        if (fbForm !== null) return fbForm;
      }
    }
  }

  return val;
}

/**
 * 对同步字段值统一 trim — 递归处理字符串、数组、对象
 * - 字符串: 去掉首尾空白 (含半角 \s 与全角空格 　); 空串原样返回
 * - 数字/布尔/null/undefined: 原样返回 (数值列不会被影响)
 * - 数组: 逐元素递归 trim
 * - 对象: 逐属性值递归 trim
 *
 * 注意: 在所有数值归一化之后调用, 因此不会破坏 number 类型字段。
 */
function trimValue(val) {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    return val.replace(/^[\s　]+|[\s　]+$/g, '');
  }
  if (Array.isArray(val)) {
    for (var i = 0; i < val.length; i++) {
      val[i] = trimValue(val[i]);
    }
    return val;
  }
  if (typeof val === 'object') {
    var ks = Object.keys(val);
    for (var k = 0; k < ks.length; k++) {
      val[ks[k]] = trimValue(val[ks[k]]);
    }
    return val;
  }
  return val;
}

// ===== 辅助函数 =====

/**
 * 获取所有表信息, 构建多种索引
 * 返回: {
 *   sheets: [...],
 *   sheetById: { id → sheet },
 *   viewIndex: { viewName → { sheet, view } }
 * }
 */
function buildIndex() {
  var sheets = Application.Sheet.GetSheets();
  var sheetById = {};
  var viewIndex = {};

  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    sheetById[sheet.id] = sheet;

    // 索引该表下的所有视图
    if (sheet.views && sheet.views.length > 0) {
      for (var v = 0; v < sheet.views.length; v++) {
        var view = sheet.views[v];
        viewIndex[view.name] = {
          sheet: sheet,
          view: view,
        };
      }
    }
  }

  return {
    sheets: sheets,
    sheetById: sheetById,
    viewIndex: viewIndex,
  };
}

/**
 * 获取一张表的所有字段定义
 */
function getFieldsForSheet(sheetId) {
  var fields = Application.Field.GetFields({ SheetId: sheetId });

  const filteredFields = fields.filter(field => {
    // 过滤掉字段名包含非字母数字字符的字段
    if (/[^a-zA-Z0-9_]/.test(field.name)) {
      return false;
    }

    // 过滤掉系统字段类型
    if (['CreatedBy', 'ModifiedBy', 'CreatedTime', 'ModifiedTime'].includes(field.type)) {
      return false;
    }

    // 过滤掉系统字段名
    if (['created_at', 'updated_at', 'created_by', 'updated_by', 'created_time', 'updated_time', 'last_updated_at', 'last_updated_by'].includes(field.name.toLowerCase())) {
      return false;
    }

    return true;
  });

  return filteredFields || [];
}

/**
 * 分页获取指定视图的所有记录
 * @param {number} sheetId - 表 ID
 * @param {string} viewId  - 视图 ID (传入后只获取该视图可见的记录)
 */
function getAllRecords(sheetId, viewId) {
  var allRecords = [];
  var offset = null;
  var hasMore = true;

  while (hasMore) {
    var params = { SheetId: sheetId, PageSize: PAGE_SIZE };

    // 指定视图
    if (viewId) {
      params.ViewId = viewId;
    }

    if (offset !== null && offset !== undefined) {
      params.Offset = offset;
    }

    var result = Application.Record.GetRecords(params);

    if (result && result.records && result.records.length > 0) {
      for (var i = 0; i < result.records.length; i++) {
        allRecords.push(result.records[i]);
      }
    }

    if (result && result.offset !== undefined && result.offset !== null) {
      offset = result.offset;
    } else {
      hasMore = false;
    }
  }

  return allRecords;
}

/**
 * 系统自动生成的字段类型 (不作为判断记录是否为空的依据)
 */
var SYSTEM_FIELD_TYPES = {
  'CreatedBy': true, 'ModifiedBy': true,
  'CreatedTime': true, 'ModifiedTime': true,
  'AutoNumber': true, 'Formula': true,
};

/**
 * 过滤掉空记录: 如果一条记录的所有「用户字段」都为空, 则视为空行
 */
function filterEmptyRecords(records, fields) {
  // 找出用户字段名列表 (排除系统字段)
  var userFieldNames = [];
  for (var i = 0; i < fields.length; i++) {
    if (!SYSTEM_FIELD_TYPES[fields[i].type]) {
      userFieldNames.push(fields[i].name);
    }
  }

  var filtered = [];
  for (var r = 0; r < records.length; r++) {
    var data = records[r].fields || records[r];
    var hasValue = false;

    for (var f = 0; f < userFieldNames.length; f++) {
      var val = data[userFieldNames[f]];
      if (val !== null && val !== undefined && val !== '' && val !== 0) {
        // 数组/对象: 检查是否为空
        if (Array.isArray(val) && val.length === 0) continue;
        if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) continue;
        hasValue = true;
        break;
      }
    }

    if (hasValue) {
      filtered.push(records[r]);
    }
  }

  return filtered;
}

/**
 * 从字段列表中找出所有关联字段, 返回关联的 sheetId 列表
 * 兼容多种属性路径, 因为 GetFields 返回的结构可能和 CreateFields 不同
 */
function findLinkedSheetIds(fields) {
  var linkedIds = [];
  var seen = {};

  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    var fType = f.type;

    // 只关注可能关联其他表的字段类型
    if (fType !== 'Link' && fType !== 'Lookup') continue;

    // 尝试多种可能的属性路径来获取关联表 ID
    var linkedId = null;

    // 直接属性
    if (f.linkSheet !== undefined && f.linkSheet !== null) linkedId = f.linkSheet;
    if (!linkedId && f.lookupSheetId !== undefined) linkedId = f.lookupSheetId;
    if (!linkedId && f.linkSheetId !== undefined) linkedId = f.linkSheetId;
    if (!linkedId && f.tableId !== undefined) linkedId = f.tableId;
    if (!linkedId && f.linkedSheetId !== undefined) linkedId = f.linkedSheetId;
    if (!linkedId && f.linkedTableId !== undefined) linkedId = f.linkedTableId;

    // 嵌套在 property 对象中
    if (!linkedId && f.property) {
      var p = f.property;
      if (p.linkSheet !== undefined) linkedId = p.linkSheet;
      if (!linkedId && p.linkSheetId !== undefined) linkedId = p.linkSheetId;
      if (!linkedId && p.tableId !== undefined) linkedId = p.tableId;
      if (!linkedId && p.linkedSheetId !== undefined) linkedId = p.linkedSheetId;
      if (!linkedId && p.linkedTableId !== undefined) linkedId = p.linkedTableId;
    }

    // 嵌套在 extra / config 中 (某些版本 API)
    if (!linkedId && f.extra && f.extra.linkSheet !== undefined) linkedId = f.extra.linkSheet;
    if (!linkedId && f.config && f.config.linkSheet !== undefined) linkedId = f.config.linkSheet;

    if (linkedId !== null && !seen[linkedId]) {
      seen[linkedId] = true;
      linkedIds.push(linkedId);
      console.log('   🔗 字段 "' + f.name + '" 关联到表 ID: ' + linkedId);
    } else if (linkedId === null) {
      console.log('   ⚠️ 字段 "' + f.name + '" 类型为 ' + fType + ' 但未找到关联表 ID');
    }
  }

  return linkedIds;
}

/**
 * 通过 HTTP 将数据发送到服务器
 * @param {string} pgTableName - PostgreSQL 中保存的表名 (即视图名)
 * @param {Array} fields - 字段定义
 * @param {Array} records - 记录数据
 */
function sendToServer(pgTableName, fields, records) {
  var url = SERVER_URL + '/import';
  var totalSent = 0;

  // 构建字段定义: Lookup 字段用 baseType 替代, 这样 PG 建正确的列类型
  var fieldDefs = [];
  var lookupFields = {}; // name → true (标记哪些字段是 Lookup, 需要解包数组)
  var fieldByName = {}; // name → 字段定义 (用于按类型规范化数值)
  var sendTypeByName = {}; // name → 发往服务端的类型 (与 fieldDefs 一致, 用于数值列二次兜底)

  for (var f = 0; f < fields.length; f++) {
    var fld = fields[f];

    // 再次过滤: 确保不包含非字母数字字符的字段名
    if (/[^a-zA-Z0-9_]/.test(fld.name)) {
      continue;
    }

    // 过滤系统字段类型
    if (['CreatedBy', 'ModifiedBy', 'CreatedTime', 'ModifiedTime'].includes(fld.type)) {
      continue;
    }

    // 过滤系统字段名
    if (['created_at', 'updated_at', 'created_by', 'updated_by', 'created_time', 'updated_time'].includes(fld.name.toLowerCase())) {
      continue;
    }

    var sendType = fld.type;

    if (normWpsType(fld.type).toLowerCase() === 'lookup' && fld.baseType) {
      sendType = fld.baseType; // 用实际数据类型, 如 Number → DOUBLE PRECISION
      lookupFields[fld.name] = true;
    }

    fieldByName[fld.name] = fld;
    fieldDefs.push({ name: fld.name, type: sendType });
    sendTypeByName[fld.name] = sendType;
  }

  for (var i = 0; i < records.length; i += BATCH_SIZE) {
    var batch = records.slice(i, i + BATCH_SIZE);
    var batchNum = Math.floor(i / BATCH_SIZE) + 1;
    var totalBatches = Math.ceil(records.length / BATCH_SIZE);

    console.log('   📤 发送第 ' + batchNum + '/' + totalBatches + ' 批 (' + batch.length + ' 条)...');

    // 构建允许的字段名集合 (从 fieldDefs，而不是 fields，因为 fieldDefs 才是真正要发送的)
    var allowedFieldNames = {};
    for (var f = 0; f < fieldDefs.length; f++) {
      allowedFieldNames[fieldDefs[f].name] = true;
    }

    var cleanRecords = [];
    for (var j = 0; j < batch.length; j++) {
      var rawFields = batch[j].fields || batch[j];

      // 对 Lookup 字段解包: [3] → 3, [3,4] 保持数组
      // 同时只包含允许的字段 (过滤掉被 getFieldsForSheet 排除的字段)
      var processedFields = {};
      var keys = Object.keys(rawFields);

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];
        var val = rawFields[key];

        if (lookupFields[key] && Array.isArray(val)) {
          val = val.length === 1 ? val[0] : val;
        }

        var fldDef = fieldByName[key];
        if (fldDef) {
          val = normalizeValueForExport(val, fldDef);
        }

        var st = sendTypeByName[key];
        if (st && isStrictNumericWpsType(st)) {
          val = normalizeNumericLikeValue(val);
        }

        // 所有同步字段值统一 trim (在数值归一化之后, 数字/布尔不受影响)
        val = trimValue(val);

        processedFields[key] = val;
      }

      cleanRecords.push({ fields: processedFields });
    }

    var body = JSON.stringify({
      tableName: pgTableName,
      fields: fieldDefs,
      records: cleanRecords,
      truncate: i === 0,  // 首批清空旧数据, 后续批次追加
    });

    var resp = HTTP.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });

    var result = resp.json();

    if (result.success) {
      totalSent += result.inserted;
      console.log('   ✅ 第 ' + batchNum + ' 批完成, 已插入 ' + result.inserted + ' 条');
    } else {
      console.log('   ❌ 第 ' + batchNum + ' 批失败: ' + result.error);
      throw new Error('导入失败: ' + result.error);
    }
  }

  return totalSent;
}

/**
 * 导出一个视图的数据到 PostgreSQL
 * @param {string} viewName  - 视图名 (也用作 PG 表名)
 * @param {object} sheet     - 所属表 { id, name, ... }
 * @param {object} view      - 视图 { id, name }
 * @param {object} index     - 全局索引
 * @param {object} exportedSet - 已导出集合 (防止重复, key = pgTableName)
 * @param {Array}  summary   - 汇总数组
 * @param {boolean} exportLinked - 是否导出关联表 (默认 true)
 */
function exportView(viewName, sheet, view, index, exportedSet, summary, exportLinked) {
  // 用视图名作为 PG 表名, 防止重复
  if (exportedSet[viewName]) {
    console.log('   ⏭️ "' + viewName + '" 已导出过, 跳过');
    return;
  }
  exportedSet[viewName] = true;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 导出视图: "' + viewName + '"');
  console.log('   所属表: "' + sheet.name + '" (SheetID: ' + sheet.id + ')');
  console.log('   视图ID: ' + view.id);

  // 1. 获取字段定义
  var fields = getFieldsForSheet(sheet.id);
  console.log('   📋 字段数: ' + fields.length);
  for (var i = 0; i < fields.length; i++) {
    console.log('      - ' + fields[i].name + ' (' + fields[i].type + ')');
  }

  // 2. 获取该视图的所有记录 (使用 ViewId)
  console.log('   🔄 读取视图 "' + viewName + '" 的记录...');
  var rawRecords = getAllRecords(sheet.id, view.id);
  console.log('   📦 原始记录: ' + rawRecords.length + ' 条');

  // 过滤空记录
  var records = filterEmptyRecords(rawRecords, fields);
  var skipped = rawRecords.length - records.length;
  if (skipped > 0) {
    console.log('   🗑️ 过滤掉 ' + skipped + ' 条空记录');
  }
  console.log('   📦 有效记录: ' + records.length + ' 条');

  if (records.length === 0) {
    console.log('   ⏭️ 视图为空, 跳过');
    summary.push({ view: viewName, records: 0, status: '跳过(空视图)' });
    return;
  }

  // 3. 发送到服务器, PG 表名 = 视图名
  try {
    var inserted = sendToServer(viewName, fields, records);
    summary.push({ view: viewName, records: inserted, status: '✅ 成功' });
  } catch (e) {
    summary.push({ view: viewName, records: 0, status: '❌ ' + e.message });
    return;
  }

  // 4. 检查关联表, 递归导出 (关联表使用其默认第一个视图)
  if (exportLinked !== false) {
    var linkedSheetIds = findLinkedSheetIds(fields);
    if (linkedSheetIds.length > 0) {
      console.log('   🔗 发现 ' + linkedSheetIds.length + ' 个关联表, 递归导出...');
      for (var k = 0; k < linkedSheetIds.length; k++) {
        var linkedSheet = index.sheetById[linkedSheetIds[k]];
        if (linkedSheet && linkedSheet.views && linkedSheet.views.length > 0) {
          // 关联表使用第一个视图, 视图名作为 PG 表名
          var linkedView = linkedSheet.views[0];
          var linkedViewName = linkedView.name;
          console.log('   🔗 → 关联表: "' + linkedSheet.name + '" → 视图: "' + linkedViewName + '"');
          exportView(linkedViewName, linkedSheet, linkedView, index, exportedSet, summary, exportLinked);
        } else if (linkedSheet) {
          console.log('   ⚠️ 关联表 "' + linkedSheet.name + '" 没有视图');
        } else {
          console.log('   ⚠️ 关联表 ID=' + linkedSheetIds[k] + ' 未找到');
        }
      }
    }
  } else {
    console.log('   ⏭️ 跳过关联表导出 (exportLinked = false)');
  }
}

// ===== 主函数 =====

/**
 * 按视图名导出数据到 PostgreSQL
 *
 * @param {string[]} viewNames - 要导出的视图名数组
 *   - 每个视图的数据会保存到以该视图名命名的 PG 表中
 *   - 如果视图对应的表有 Link 关联字段, 关联表也会自动导出 (除非 exportLinked = false)
 *   - 传空数组则导出所有表的所有视图
 *
 *   示例: main(['产品视图', '订单视图'])
 *   示例: main(['产品视图'], false) - 不导出关联表
 *
 * @param {boolean} exportLinked - 是否自动导出关联表 (默认 true)
 */
function main(viewNames, exportLinked = true) {
  console.log('🚀 WPS 多维表格 → PostgreSQL (按视图导出)');
  console.log('   服务器: ' + SERVER_URL);

  // 0. 参数处理
  if (!viewNames || !Array.isArray(viewNames)) {
    viewNames = [];
  }

  if (viewNames.length > 0) {
    console.log('   📌 指定导出视图: ' + viewNames.join(', '));
  } else {
    console.log('   📌 未指定视图名, 将导出所有视图');
  }

  console.log('   📌 自动导出关联表: ' + (exportLinked ? '是' : '否'));

  // 1. 健康检查
  console.log('\n🏥 测试服务器连接...');
  try {
    var healthResp = HTTP.fetch(SERVER_URL + '/health', { method: 'GET' });
    var healthResult = healthResp.json();
    if (healthResult.status === 'ok') {
      console.log('   ✅ 服务器已连接, 数据库正常');
    } else {
      console.log('   ❌ 服务器异常: ' + JSON.stringify(healthResult));
      return;
    }
  } catch (e) {
    console.log('   ❌ 无法连接服务器!');
    console.log('      请确保: 1) server.js 已启动  2) ngrok 已运行  3) URL 正确');
    console.log('      错误: ' + e.message);
    return;
  }

  // 2. 构建索引
  var index = buildIndex();
  console.log('\n📋 文件共有 ' + index.sheets.length + ' 张表');

  // 列出所有视图供参考
  var allViewNames = Object.keys(index.viewIndex);
  console.log('📋 共有 ' + allViewNames.length + ' 个视图:');
  for (var v = 0; v < allViewNames.length; v++) {
    var info = index.viewIndex[allViewNames[v]];
    console.log('   ' + (v + 1) + '. "' + allViewNames[v] + '" (表: "' + info.sheet.name + '")');
  }

  // 3. 确定要导出的视图
  var targets = []; // [{ viewName, sheet, view }]

  if (viewNames.length === 0) {
    // 导出所有视图
    for (var a = 0; a < allViewNames.length; a++) {
      var entry = index.viewIndex[allViewNames[a]];
      targets.push({
        viewName: allViewNames[a],
        sheet: entry.sheet,
        view: entry.view,
      });
    }
  } else {
    // 按名称匹配
    for (var t = 0; t < viewNames.length; t++) {
      var match = index.viewIndex[viewNames[t]];
      if (match) {
        targets.push({
          viewName: viewNames[t],
          sheet: match.sheet,
          view: match.view,
        });
      } else {
        console.log('   ⚠️ 未找到视图: "' + viewNames[t] + '", 跳过');
      }
    }
  }

  if (targets.length === 0) {
    console.log('❌ 没有找到任何匹配的视图!');
    return;
  }

  console.log('\n🎯 将导出 ' + targets.length + ' 个视图' + (exportLinked ? ' (关联表视图会自动追加)' : ''));

  // 4. 逐视图导出
  var exportedSet = {};
  var summary = [];

  for (var s = 0; s < targets.length; s++) {
    exportView(targets[s].viewName, targets[s].sheet, targets[s].view, index, exportedSet, summary, exportLinked);
  }

  // 5. 汇总
  console.log('\n\n══════════════════════════════════════');
  console.log('📊 导出完成! 汇总:');
  console.log('══════════════════════════════════════');
  for (var i = 0; i < summary.length; i++) {
    console.log('  视图 "' + summary[i].view + '": ' + summary[i].records + ' 条 → ' + summary[i].status);
  }
  console.log('══════════════════════════════════════\n');

  const resp = HTTP.fetch(SERVER_URL + '/refresh-metabase-schema', {
    method: 'GET',
  })

  var result = resp.json();
  if (result.success) {
    console.log('\n══════════════════════════════════════');
    console.log('   ✅ 刷新 Metabase 模式完成');
    console.log('══════════════════════════════════════\n');
  } else {
    console.log('\n══════════════════════════════════════');
    console.log('   ❌ 刷新 Metabase 模式失败: ' + result.error);
    console.log('══════════════════════════════════════\n');
  }
}

// ============================================================
// 🔧 修改这里: 填入你要导出的视图名 (数组)
//    示例: main(['全部产品', '待发货订单'])
//    示例: main(['全部产品'], false) - 只导出指定视图，不导出关联表
//    传空数组 main([]) 则导出所有视图
// ============================================================
main(['product', 'pricing', 'po_header', 'po_items', 'factory', 'production', 'inspection', 'shipment_invoice', 'shipment_po_map', 'shipment', 'shipment_items', 'freight', 'exchange_rates','sales_forecast','pick_items']);
// main(['shipment_items'], false);
