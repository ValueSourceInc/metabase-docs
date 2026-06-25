import { config as loadDotenv } from "dotenv";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type JsonRecord = Record<string, unknown>;

interface CollectionSummary {
  id: number | string;
  name: string;
  parent_id?: number | string | null;
  location?: string | null;
  description?: string | null;
  archived?: boolean;
  is_personal?: boolean;
}

interface CardSummary {
  id: number;
  name: string;
  description?: string | null;
  collection_id?: number | null;
  display?: string | null;
  type?: string | null;
  query_type?: string | null;
  database_id?: number | null;
  archived?: boolean;
  dataset_query?: JsonRecord;
  result_metadata?: FieldMetadata[];
  updated_at?: string;
  created_at?: string;
}

interface DashboardSummary {
  id: number;
  name: string;
  description?: string | null;
  collection_id?: number | null;
  archived?: boolean;
  dashcards?: DashcardSummary[];
}

interface DashcardSummary {
  card_id?: number | null;
  card?: CardSummary | null;
}

interface FieldMetadata {
  name?: string;
  display_name?: string;
  base_type?: string;
  effective_type?: string;
  semantic_type?: string | null;
}

interface CardDoc {
  id: number;
  name: string;
  databaseId: number | null;
  collectionId: number | null;
  collectionName: string;
  display: string;
  type: string;
  queryType: string;
  description: string;
  domains: string[];
  fields: FieldDoc[];
  upstreamCardIds: number[];
  downstreamCardIds: number[];
  dashboardIds: number[];
  dashboardNames: string[];
  risks: string[];
  dependencyDepth: number;
  isNative: boolean;
  isArchived: boolean;
  updatedAt: string;
}

interface FieldDoc {
  name: string;
  displayName: string;
  type: string;
  semanticType: string;
}

interface MetabaseSnapshot {
  generatedAt: string;
  databaseIds: number[];
  collections: CollectionSummary[];
  cards: CardSummary[];
  dashboards: DashboardSummary[];
  cardDocs: CardDoc[];
}

const DOMAIN_RULES: Array<{ domain: string; keywords: string[] }> = [
  {
    domain: "finance",
    keywords: [
      "settlement",
      "revenue",
      "profit",
      "roi",
      "cost",
      "fee",
      "payment",
      "amount",
      "cash",
      "expense",
      "结算",
      "利润",
      "成本",
      "费用",
      "投入",
    ],
  },
  {
    domain: "inventory",
    keywords: ["inventory", "stock", "fba", "warehouse", "inbound", "wos", "库存", "补货"],
  },
  {
    domain: "replenishment",
    keywords: ["shipment", "replenishment", "factory", "moq", "need_to_ship", "produce", "发货", "工厂", "生产"],
  },
  {
    domain: "production",
    keywords: ["production", "po", "factory", "unit cost", "采购", "生产", "工厂"],
  },
  {
    domain: "logistics",
    keywords: ["shipping", "freight", "shipment cost", "delivery", "物流", "头程"],
  },
  {
    domain: "returns",
    keywords: ["return", "refund", "removal", "disposal", "unsellable", "退货", "退款"],
  },
  {
    domain: "advertising",
    keywords: ["ad", "ads", "advertising", "campaign", "acos", "广告"],
  },
  {
    domain: "sales",
    keywords: ["sales", "order", "sku", "marketplace", "store", "销售", "订单"],
  },
];

const BUSINESS_GLOSSARY: Array<{ term: string; meaning: string; warning?: string }> = [
  {
    term: "Product Sales",
    meaning: "商品销售本金，通常表示商品售价本身，不扣平台费用、广告、产品成本或物流成本。",
    warning: "不要和 Settlement Net Amount 混用。",
  },
  {
    term: "Settlement Net Amount",
    meaning: "销售结算净额，可能已经包含退款、促销折扣、平台佣金、FBA fee、补偿款等正负项。",
    warning: "它不是纯商品销售额。",
  },
  {
    term: "Net Profit",
    meaning: "已售经营净利润，应按已售商品收入和已售商品相关成本匹配计算。",
    warning: "不要和库存投入视角里的 Net Investment Position 混用。",
  },
  {
    term: "Inventory Investment",
    meaning: "库存相关投入，通常包含生产/采购投入和物流/头程投入，可能包含未售库存。",
  },
  {
    term: "Production Investment Cost",
    meaning: "按采购或预计付款节奏计入的生产/采购投入。",
    warning: "不等同于已售商品成本。",
  },
  {
    term: "Shipping Investment Cost",
    meaning: "按物流付款节奏计入的物流/头程投入。",
    warning: "不等同于已售订单分摊物流成本。",
  },
  {
    term: "Total Cost",
    meaning: "需要结合具体图表口径理解；在已售经营表中通常表示已售收入和净利润之间的成本差额。",
  },
  {
    term: "ROI",
    meaning: "通常为 Net Profit / Total Cost 或 Net Profit / Total Spend。",
    warning: "不同图表可能使用不同成本范围，必须查看 description。",
  },
  {
    term: "WOS",
    meaning: "Weeks of Stock，库存可支撑的周数。",
  },
];

async function main() {
  loadEnv();
  const outputDir = resolve(process.cwd(), getArgValue("--output") ?? "docs/metabase");
  const snapshot = await loadMetabaseSnapshot();

  // Core documents
  await writeReportFile(`${outputDir}/README.md`, renderReadme(snapshot));
  await writeReportFile(`${outputDir}/collections.md`, renderCollections(snapshot));
  await writeReportFile(`${outputDir}/cards.md`, renderCards(snapshot.cardDocs));
  await writeReportFile(`${outputDir}/dashboards.md`, renderDashboards(snapshot));
  await writeReportFile(`${outputDir}/dependencies.md`, renderDependencies(snapshot));
  await writeReportFile(`${outputDir}/glossary.md`, renderGlossary(snapshot));

  // Domain indexes
  for (const domain of getDomainNames()) {
    await writeReportFile(`${outputDir}/domains/${domain}.md`, renderDomain(snapshot, domain));
  }

  // Machine-readable indexes (compact, for AI consumption)
  // _catalog.md: PRIMARY discovery file — one line per card (~15KB). Read in full.
  await writeReportFile(`${outputDir}/_catalog.md`, renderCatalog(snapshot));
  // _index.json: full-text search across ALL cards (grep only, don't read in full)
  await writeJsonFile(`${outputDir}/_index.json`, renderIndexJson(snapshot));
  await writeJsonFile(`${outputDir}/_deps.json`, renderDepsJson(snapshot));

  // Individual card detail files (on-demand reading)
  const cardDir = `${outputDir}/cards`;
  await writeReportFile(`${cardDir}/_README.md`, renderCardsReadme(snapshot));
  for (const card of snapshot.cardDocs) {
    await writeReportFile(`${cardDir}/${card.id}.md`, renderCardDetail(card, snapshot));
  }

  printSummary(snapshot, outputDir);
}

function loadEnv() {
  const envFile = getArgValue("--env-file");
  if (envFile) {
    loadDotenv({ path: resolve(process.cwd(), envFile) });
  } else {
    loadDotenv();
  }

  if (isEnabled(process.env.METABASE_ALLOW_SELF_SIGNED_CERT)) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
}

function isEnabled(value: string | undefined): boolean {
  return ["1", "true", "yes"].includes(value?.replace(/^"|"$/g, "").toLowerCase() ?? "");
}

function getDomainNames(): string[] {
  return DOMAIN_RULES.map((rule) => rule.domain);
}

async function loadMetabaseSnapshot(): Promise<MetabaseSnapshot> {
  const generatedAt = new Date().toISOString();
  const databaseIds = getAllowedDatabaseIds();
  const [collections, cardList, dashboardList] = await Promise.all([
    apiGet<CollectionSummary[]>("/collection"),
    apiGet<CardSummary[]>("/card"),
    apiGet<DashboardSummary[]>("/dashboard"),
  ]);

  const cards = await mapWithConcurrency(cardList, 8, async (card) => {
    try {
      return await apiGet<CardSummary>(`/card/${card.id}`);
    } catch (error) {
      // Fall back to the list entry (may be missing result_metadata, hence
      // empty fields in output). Log so empty fields aren't mistaken for
      // genuinely field-less cards.
      console.warn(`Warning: failed to load card #${card.id} detail, using list entry — ${(error as Error).message}`);
      return card;
    }
  });

  const dashboards = await mapWithConcurrency(dashboardList, 5, async (dashboard) => {
    try {
      return await apiGet<DashboardSummary>(`/dashboard/${dashboard.id}`);
    } catch (error) {
      console.warn(`Warning: failed to load dashboard #${dashboard.id} detail, using list entry — ${(error as Error).message}`);
      return dashboard;
    }
  });

  const filteredCards = filterCardsByDatabase(cards, databaseIds);
  const filteredDashboards = filterDashboardsByCards(dashboards, filteredCards);

  return {
    generatedAt,
    databaseIds,
    collections,
    cards: filteredCards,
    dashboards: filteredDashboards,
    cardDocs: buildCardDocs(collections, filteredCards, filteredDashboards),
  };
}

function getAllowedDatabaseIds(): number[] {
  const rawValue = process.env.METABASE_DATABASE_IDS ?? process.env.METABASE_DB_ID ?? "";
  return rawValue
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function filterCardsByDatabase(cards: CardSummary[], databaseIds: number[]): CardSummary[] {
  if (databaseIds.length === 0) {
    // No DB filter configured — emit a warning so generating docs for every
    // database isn't a silent foot-gun.
    console.warn(
      "Warning: METABASE_DB_ID / METABASE_DATABASE_IDS not set — generating docs for ALL databases.",
    );
    return cards;
  }
  const allowedDatabaseIds = new Set(databaseIds);
  return cards.filter((card) => {
    if (card.database_id == null) return false;
    if (!allowedDatabaseIds.has(card.database_id)) return false;
    return true;
  });
}

function filterDashboardsByCards(dashboards: DashboardSummary[], cards: CardSummary[]): DashboardSummary[] {
  const allowedCardIds = new Set(cards.map((card) => card.id));
  return dashboards
    .map((dashboard) => ({
      ...dashboard,
      dashcards: (dashboard.dashcards ?? []).filter((dashcard) => {
        const cardId = typeof dashcard.card_id === "number" ? dashcard.card_id : dashcard.card?.id;
        return typeof cardId === "number" && allowedCardIds.has(cardId);
      }),
    }))
    .filter((dashboard) => (dashboard.dashcards ?? []).length > 0);
}

async function apiGet<T>(path: string): Promise<T> {
  const baseUrl = process.env.METABASE_API_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.METABASE_API_KEY?.replace(/^"|"$/g, "");

  if (!baseUrl || !apiKey) {
    throw new Error("Missing METABASE_API_BASE_URL or METABASE_API_KEY");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    signal: AbortSignal.timeout(120000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Metabase API ${path} failed (${response.status}): ${body.slice(0, 500)}`);
  }

  return (await response.json()) as T;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

function buildCardDocs(
  collections: CollectionSummary[],
  cards: CardSummary[],
  dashboards: DashboardSummary[],
): CardDoc[] {
  const collectionById = new Map<string, CollectionSummary>();
  collections.forEach((collection) => collectionById.set(String(collection.id), collection));

  const upstreamByCard = new Map<number, number[]>();
  cards.forEach((card) => upstreamByCard.set(card.id, extractSourceCardIds(card.dataset_query)));

  const downstreamByCard = new Map<number, number[]>();
  for (const card of cards) {
    const upstreamIds = upstreamByCard.get(card.id) ?? [];
    upstreamIds.forEach((upstreamId) => {
      const downstream = downstreamByCard.get(upstreamId) ?? [];
      downstream.push(card.id);
      downstreamByCard.set(upstreamId, downstream);
    });
  }

  const dashboardsByCard = new Map<number, DashboardSummary[]>();
  for (const dashboard of dashboards) {
    extractDashboardCardIds(dashboard).forEach((cardId) => {
      const refs = dashboardsByCard.get(cardId) ?? [];
      refs.push(dashboard);
      dashboardsByCard.set(cardId, refs);
    });
  }

  return cards
    .map((card) => {
      const collection = card.collection_id == null ? undefined : collectionById.get(String(card.collection_id));
      const fields = toFieldDocs(card.result_metadata ?? []);
      const searchableText = buildSearchableText(card, collection, fields);
      const domains = classifyDomains(searchableText);
      const upstreamCardIds = uniqueNumbers(upstreamByCard.get(card.id) ?? []);
      const downstreamCardIds = uniqueNumbers(downstreamByCard.get(card.id) ?? []);
      const dashboardRefs = dashboardsByCard.get(card.id) ?? [];
      const isNative = hasNativeStage(card);

      return {
        id: card.id,
        name: card.name,
        databaseId: card.database_id ?? null,
        collectionId: card.collection_id ?? null,
        collectionName: collection?.name ?? "Unfiled / Unknown",
        display: card.display ?? "unknown",
        type: inferCardType(card, downstreamCardIds, dashboardRefs, isNative),
        queryType: card.query_type ?? "unknown",
        description: normalizeText(card.description),
        domains,
        fields,
        upstreamCardIds,
        downstreamCardIds,
        dashboardIds: dashboardRefs.map((dashboard) => dashboard.id),
        dashboardNames: dashboardRefs.map((dashboard) => dashboard.name),
        risks: inferRisks(card, fields, upstreamCardIds, downstreamCardIds, dashboardRefs, isNative, searchableText),
        dependencyDepth: calculateDependencyDepth(card.id, upstreamByCard),
        isNative,
        isArchived: Boolean(card.archived),
        updatedAt: card.updated_at ?? "",
      };
    })
    .sort((a, b) => a.id - b.id);
}

function toFieldDocs(fields: FieldMetadata[]): FieldDoc[] {
  return fields
    .map((field) => ({
      name: field.name ?? "",
      displayName: field.display_name ?? field.name ?? "",
      type: field.effective_type ?? field.base_type ?? "",
      semanticType: field.semantic_type ?? "",
    }))
    .filter((field) => field.name.length > 0);
}

function buildSearchableText(
  card: CardSummary,
  collection: CollectionSummary | undefined,
  fields: FieldDoc[],
): string {
  return [
    card.name,
    card.description ?? "",
    collection?.name ?? "",
    fields.map((field) => `${field.name} ${field.displayName}`).join(" "),
    JSON.stringify(card.dataset_query ?? {}),
  ]
    .join(" ")
    .toLowerCase();
}

function classifyDomains(searchableText: string): string[] {
  const domains = DOMAIN_RULES.filter((rule) =>
    rule.keywords.some((keyword) => keywordMatches(searchableText, keyword)),
  ).map((rule) => rule.domain);

  return domains.length > 0 ? uniqueStrings(domains) : ["uncategorized"];
}

function keywordMatches(searchableText: string, keyword: string): boolean {
  const normalizedKeyword = keyword.toLowerCase();
  const asciiKeyword = /^[a-z0-9 ]+$/.test(normalizedKeyword);

  if (!asciiKeyword) return searchableText.includes(normalizedKeyword);
  if (normalizedKeyword.includes(" ")) return searchableText.includes(normalizedKeyword);
  if (normalizedKeyword.length > 3) return searchableText.includes(normalizedKeyword);

  // Short ASCII keywords: match on word boundaries, but also tolerate a
  // trailing plural "s" (e.g. "fee" → "fees", "fba" → "fbas") so plural
  // variants aren't silently dropped from a domain.
  const escapedKeyword = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escapedKeyword}s?([^a-z0-9]|$)`).test(searchableText);
}

function inferCardType(
  card: CardSummary,
  downstreamCardIds: number[],
  dashboardRefs: DashboardSummary[],
  isNative: boolean,
): string {
  if (card.archived) return "archived";

  // Metabase's `type` field is the authoritative signal: "model" for models,
  // "question" for questions. Prefer it over name heuristics, which misclassify
  // cards whose names merely contain "model"/"source" (e.g. "Data Modeling Notes").
  const metabaseType = (card.type ?? "").toLowerCase();
  const isModel = metabaseType === "model" || metabaseType === "dataset";

  // A model with broad reuse is a source model (the high-leverage nodes worth
  // guarding on change). Models with lighter reuse are still models.
  if (isModel) {
    return downstreamCardIds.length >= 3 ? "source model" : "model";
  }

  // A table-display question reused downstream behaves like a table model.
  if (card.display === "table" && downstreamCardIds.length > 0) return "table model";
  if (dashboardRefs.length > 0) return "dashboard component";
  if (isNative) return "native question";
  return "question";
}

function inferRisks(
  card: CardSummary,
  fields: FieldDoc[],
  upstreamCardIds: number[],
  downstreamCardIds: number[],
  dashboardRefs: DashboardSummary[],
  isNative: boolean,
  searchableText: string,
): string[] {
  const risks: string[] = [];
  if (!normalizeText(card.description)) risks.push("missing description");
  if (isNative && !normalizeText(card.description)) risks.push("native SQL without business description");
  if (fields.some((field) => /^sum(_\d+)?$|^avg(_\d+)?$|^min$|^max$/.test(field.name))) {
    risks.push("generic aggregation field names");
  }
  if (upstreamCardIds.length >= 4) risks.push("many upstream dependencies");
  if (downstreamCardIds.length >= 5) risks.push("high reuse / change carefully");
  if (dashboardRefs.length === 0 && downstreamCardIds.length === 0) {
    risks.push("not referenced by dashboards or downstream cards");
  }
  if (
    searchableText.includes("revenue") &&
    searchableText.includes("inventory") &&
    searchableText.includes("cost")
  ) {
    risks.push("mixed finance and inventory timing");
  }
  if (card.archived) risks.push("archived");
  return uniqueStrings(risks);
}

function extractSourceCardIds(value: unknown): number[] {
  const ids: number[] = [];

  function walk(node: unknown) {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (!node || typeof node !== "object") return;

    const record = node as JsonRecord;
    const sourceCard = record["source-card"];
    if (typeof sourceCard === "number") ids.push(sourceCard);

    const cardId = record["card-id"];
    if (typeof cardId === "number") ids.push(cardId);

    Object.values(record).forEach(walk);
  }

  walk(value);
  return uniqueNumbers(ids);
}

function extractDashboardCardIds(dashboard: DashboardSummary): number[] {
  const ids: number[] = [];
  (dashboard.dashcards ?? []).forEach((dashcard) => {
    if (typeof dashcard.card_id === "number") ids.push(dashcard.card_id);
    if (typeof dashcard.card?.id === "number") ids.push(dashcard.card.id);
  });
  return uniqueNumbers(ids);
}

function hasNativeStage(card: CardSummary): boolean {
  // `query_type` is Metabase's authoritative signal ("native" = raw SQL,
  // "query" = MBQL builder). Falling back to scanning the dataset_query JSON
  // for a native stage covers models whose type may not be set yet.
  if (card.query_type === "native") return true;
  const datasetQuery = card.dataset_query;
  if (!datasetQuery) return false;
  const queryText = JSON.stringify(datasetQuery);
  return queryText.includes('"mbql.stage/native"');
}

function calculateDependencyDepth(cardId: number, upstreamByCard: Map<number, number[]>): number {
  // Longest-path computation over the upstream DAG. Memoization makes each
  // node's true depth reusable across branches; `visiting` only tracks the
  // current recursion path to break cycles (returning 0 for a back-edge so a
  // self-referential loop terminates without polluting the real depth).
  const memo = new Map<number, number>();
  const visiting = new Set<number>();

  function depth(id: number): number {
    const cached = memo.get(id);
    if (cached !== undefined) return cached;
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const upstream = upstreamByCard.get(id) ?? [];
    const result = upstream.length === 0 ? 0 : 1 + Math.max(...upstream.map(depth));
    visiting.delete(id);
    memo.set(id, result);
    return result;
  }

  return depth(cardId);
}

function renderReadme(snapshot: MetabaseSnapshot): string {
  const activeCards = snapshot.cardDocs.filter((card) => !card.isArchived);
  const domainCounts = countDomains(snapshot.cardDocs);
  const highRisk = snapshot.cardDocs.filter((card) => card.risks.length >= 3).slice(0, 15);
  const keySourceModels = snapshot.cardDocs
    .filter((card) => card.type.includes("model"))
    .sort((a, b) => b.downstreamCardIds.length - a.downstreamCardIds.length)
    .slice(0, 10);

  return [
    "# Metabase Knowledge Base",
    "",
    `Generated at: ${snapshot.generatedAt}`,
    "",
    "This folder is generated from Metabase metadata. It provides navigation and business context for AI-assisted Metabase work.",
    "",
    "## Reading Strategy (for AI)",
    "",
    "| File | When to Read | Approx Size |",
    "| --- | --- | --- |",
    "| `_catalog.md` | **Always first** — one line per card; read IN FULL to discover by name/domain/collection/id | ~15KB |",
    "| `_index.json` | Grep ONLY (don't read in full) — when you need upstream/downstream/risks for specific cards | ~170KB |",
    "| `_deps.json` | Follow upstream/downstream dependencies | ~30KB |",
    "| `cards/{id}.md` | Read a specific card's full field metadata | ~1KB each |",
    "| `collections.md` | Understand collection hierarchy | ~5KB |",
    "| `domains/{domain}.md` | Browse all cards in a domain | varies |",
    "| `glossary.md` | Look up business terms | ~17KB |",
    "| `cards.md` | Master table of all cards (human browsing) | ~30KB |",
    "",
    "## Summary",
    "",
    `- Database filter: ${snapshot.databaseIds.length > 0 ? snapshot.databaseIds.join(", ") : "all databases"}`,
    `- Collections: ${snapshot.collections.length}`,
    `- Cards / questions / models: ${snapshot.cardDocs.length}`,
    `- Active cards: ${activeCards.length}`,
    `- Dashboards: ${snapshot.dashboards.length}`,
    "",
    "## Key Source Models",
    "",
    "Most-reused source models and table models. Changing these affects the most downstream cards and dashboards.",
    "",
    renderCardTable(keySourceModels, { includeRisks: true, includeDependencies: true }),
    "",
    "## Documents",
    "",
    "- [_catalog.md](_catalog.md) — Compact one-line-per-card catalog (primary discovery file)",
    "- [_index.json](_index.json) — Full machine-readable index (grep only)",
    "- [_deps.json](_deps.json) — Dependency graph",
    "- [Collections](collections.md)",
    "- [Cards and models](cards.md)",
    "- [Individual card details](cards/_README.md)",
    "- [Dashboards](dashboards.md)",
    "- [Dependencies](dependencies.md)",
    "- [Glossary](glossary.md)",
    ...getDomainNames().map((domain) => `- [${capitalize(domain)} domain](domains/${domain}.md)`),
    "",
    "## Domain Counts",
    "",
    renderTable(
      ["Domain", "Cards"],
      Object.entries(domainCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([domain, count]) => [domain, String(count)]),
    ),
    "",
    "## Highest Priority Cleanup Candidates",
    "",
    "These cards have multiple documentation or dependency risks and are worth reviewing first.",
    "",
    renderCardTable(highRisk, { includeRisks: true, includeDependencies: true }),
    "",
    "## Refreshing These Docs",
    "",
    "Run:",
    "",
    "```bash",
    "pnpm gen",
    "```",
    "",
  ].join("\n");
}

function renderCollections(snapshot: MetabaseSnapshot): string {
  const cardCounts = new Map<string, number>();
  const dashboardCounts = new Map<string, number>();
  snapshot.cardDocs.forEach((card) => {
    const key = String(card.collectionId ?? "null");
    cardCounts.set(key, (cardCounts.get(key) ?? 0) + 1);
  });
  snapshot.dashboards.forEach((dashboard) => {
    const key = String(dashboard.collection_id ?? "null");
    dashboardCounts.set(key, (dashboardCounts.get(key) ?? 0) + 1);
  });

  interface TreeNode {
    id: string;
    name: string;
    location: string;
    isPersonal: boolean;
    children: TreeNode[];
  }

  const byId = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const c of snapshot.collections) {
    byId.set(String(c.id), {
      id: String(c.id),
      name: c.name,
      location: String(c.location ?? ""),
      isPersonal: Boolean(c.is_personal),
      children: [],
    });
  }

  for (const c of snapshot.collections) {
    const node = byId.get(String(c.id))!;
    const parentId = c.parent_id != null ? String(c.parent_id) : null;
    if (parentId && byId.has(parentId)) {
      byId.get(parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // Sort children by name
  function sortTree(nodes: TreeNode[]) {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    nodes.forEach((n) => sortTree(n.children));
  }
  sortTree(roots);

  const lines: string[] = [
    "# Metabase Collections",
    "",
    "## Tree View",
    "",
    "```",
  ];

  function renderTree(nodes: TreeNode[], indent: string) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const isLast = i === nodes.length - 1;
      const prefix = isLast ? "└── " : "├── ";
      const cards = cardCounts.get(node.id) ?? 0;
      const dashboards = dashboardCounts.get(node.id) ?? 0;
      const parts: string[] = [];
      if (cards > 0) parts.push(`${cards} cards`);
      if (dashboards > 0) parts.push(`${dashboards} dashboards`);
      const stats = parts.length > 0 ? ` (${parts.join(", ")})` : "";
      const personal = node.isPersonal ? " [personal]" : "";
      lines.push(`${indent}${prefix}#${node.id} ${node.name}${stats}${personal}`);
      if (node.children.length > 0) {
        renderTree(node.children, indent + (isLast ? "    " : "│   "));
      }
    }
  }

  renderTree(roots, "");
  lines.push("```");
  lines.push("");
  lines.push("## Flat Table");
  lines.push("");

  const rows = snapshot.collections
    .slice()
    .sort(
      (a, b) =>
        String(a.location ?? "").localeCompare(String(b.location ?? "")) ||
        String(a.name).localeCompare(b.name),
    )
    .map((collection) => [
      String(collection.id),
      collection.name,
      String(collection.parent_id ?? ""),
      String(collection.location ?? ""),
      String(cardCounts.get(String(collection.id)) ?? 0),
      String(dashboardCounts.get(String(collection.id)) ?? 0),
      collection.is_personal ? "yes" : "",
    ]);

  lines.push(renderTable(["ID", "Name", "Parent", "Location", "Cards", "Dashboards", "Personal"], rows));
  lines.push("");

  return lines.join("\n");
}

function renderCards(cards: CardDoc[]): string {
  const active = cards.filter((c) => !c.isArchived);
  const archived = cards.filter((c) => c.isArchived);
  const byType: Record<string, CardDoc[]> = {};
  for (const card of cards) {
    const t = card.type;
    (byType[t] ??= []).push(card);
  }

  const lines: string[] = [
    "# Metabase Cards and Models",
    "",
    `Total: ${cards.length} cards (${active.length} active, ${archived.length} archived).`,
    "",
    "For field-level detail, see individual card files in [cards/](cards/_README.md).",
    "For programmatic access, use [_index.json](_index.json).",
    "",
    "## By Type",
    "",
    renderTable(
      ["Type", "Count"],
      Object.entries(byType)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([type, list]) => [type, String(list.length)]),
    ),
    "",
    "## All Cards",
    "",
    renderCardTable(cards, { includeRisks: true, includeDependencies: true }),
  ];

  return lines.join("\n");
}

function renderDashboards(snapshot: MetabaseSnapshot): string {
  const collectionById = new Map<string, CollectionSummary>();
  snapshot.collections.forEach((collection) => collectionById.set(String(collection.id), collection));

  const rows = snapshot.dashboards
    .slice()
    .sort((a, b) => a.id - b.id)
    .map((dashboard) => {
      const cardIds = extractDashboardCardIds(dashboard);
      return [
        String(dashboard.id),
        dashboard.name,
        collectionById.get(String(dashboard.collection_id ?? ""))?.name ?? "",
        String(cardIds.length),
        cardIds.map((id) => `#${id}`).join(", "),
        dashboard.description ?? "",
      ];
    });

  return [
    "# Metabase Dashboards",
    "",
    renderTable(["ID", "Name", "Collection", "Cards", "Card IDs", "Description"], rows),
    "",
  ].join("\n");
}

function renderDependencies(snapshot: MetabaseSnapshot): string {
  const byId = buildCardByIdMap(snapshot.cardDocs);
  const reused = snapshot.cardDocs
    .filter((card) => card.downstreamCardIds.length > 0 || card.dashboardIds.length > 0)
    .sort(
      (a, b) =>
        b.downstreamCardIds.length +
        b.dashboardIds.length -
        (a.downstreamCardIds.length + a.dashboardIds.length),
    );

  const rows = reused.map((card) => [
    `#${card.id}`,
    card.name,
    card.upstreamCardIds.map((id) => formatCardRef(id, byId)).join(", "),
    card.downstreamCardIds.map((id) => formatCardRef(id, byId)).join(", "),
    card.dashboardNames.join(", "),
  ]);

  return [
    "# Metabase Dependencies",
    "",
    "Use this file before changing a source model or heavily reused card.",
    "",
    "```mermaid",
    "flowchart TD",
    '  upstreamCard["Upstream Cards"] --> sourceModel["Source Models"]',
    '  sourceModel --> analysisCards["Analysis Cards"]',
    '  analysisCards --> dashboards["Dashboards"]',
    "```",
    "",
    renderTable(["Card", "Name", "Upstream", "Downstream", "Dashboards"], rows),
    "",
  ].join("\n");
}

function renderGlossary(snapshot: MetabaseSnapshot): string {
  const ambiguousCards = snapshot.cardDocs.filter((card) =>
    card.risks.some((risk) => risk.includes("generic aggregation")),
  );

  return [
    "# Metabase Business Glossary",
    "",
    "This glossary captures recurring business terms and common interpretation traps.",
    "",
    renderTable(
      ["Term", "Business Meaning", "Warning"],
      BUSINESS_GLOSSARY.map((entry) => [entry.term, entry.meaning, entry.warning ?? ""]),
    ),
    "",
    "## Cards With Generic Aggregation Fields",
    "",
    "These cards contain fields like `sum`, `sum_2`, `avg`, or `max`. They need chart descriptions or visualization titles to avoid ambiguity.",
    "",
    renderCardTable(ambiguousCards.slice(0, 80), { includeRisks: true, includeDependencies: false }),
    ambiguousCards.length > 80 ? `\n_Only first 80 of ${ambiguousCards.length} cards shown._` : "",
    "",
  ].join("\n");
}

function renderIndexJson(snapshot: MetabaseSnapshot): Record<string, unknown> {
  const cards: Record<string, Record<string, unknown>> = {};
  for (const card of snapshot.cardDocs) {
    const desc = card.description || "";
    cards[String(card.id)] = {
      name: card.name,
      collectionId: card.collectionId,
      collectionName: card.collectionName,
      type: card.type,
      domains: card.domains,
      display: card.display,
      upstream: card.upstreamCardIds,
      downstream: card.downstreamCardIds,
      dashboards: card.dashboardNames,
      risks: card.risks,
      databaseId: card.databaseId,
      queryType: card.queryType,
      isNative: card.isNative,
      isArchived: card.isArchived,
      fieldCount: card.fields.length,
      dependencyDepth: card.dependencyDepth,
      updatedAt: card.updatedAt,
      description: desc.length > 300 ? desc.slice(0, 300) + "…" : desc,
      hasFullDescription: desc.length > 300,
    };
  }

  return {
    databaseIds: snapshot.databaseIds,
    summary: {
      collections: snapshot.collections.length,
      cards: snapshot.cardDocs.length,
      activeCards: snapshot.cardDocs.filter((c) => !c.isArchived).length,
      dashboards: snapshot.dashboards.length,
    },
    cards,
  };
}

function renderCatalog(snapshot: MetabaseSnapshot): string {
  // Compact one-line-per-card catalog (~15KB / ~4K tokens) — the PRIMARY discovery file.
  // Read it IN FULL once per session to know the whole card universe (id, name, domain,
  // collection, type), then drill into cards/{id}.md only for the card you need.
  // Replaces grepping the verbose _index.json (172KB) for browsing/find-by-name.
  const SEP = " | ";
  const lines: string[] = [
    `# Card Catalog — ${snapshot.cardDocs.length} cards`,
    "",
    "One line per card. Read IN FULL for discovery (find by name/domain/collection/id),",
    "then read `cards/{id}.md` for field-level detail. Columns, ` | `-separated:",
    "id | name | domains | collection | type | fields",
    "",
  ];

  const sorted = [...snapshot.cardDocs].sort((a, b) => a.id - b.id);
  for (const card of sorted) {
    const domains = card.domains.join(",") || "-";
    const collection = card.collectionName || "(none)";
    const cols = [
      String(card.id),
      card.name,
      domains,
      collection,
      card.type,
      String(card.fields.length),
    ];
    lines.push(cols.join(SEP));
  }

  return lines.join("\n");
}

function renderDepsJson(snapshot: MetabaseSnapshot): Record<string, unknown> {
  const deps: Record<string, Record<string, unknown>> = {};
  for (const card of snapshot.cardDocs) {
    deps[String(card.id)] = {
      up: card.upstreamCardIds,
      down: card.downstreamCardIds,
      // IDs for grep-ability (matches up/down), names kept alongside for
      // human-readable lookups.
      dash: card.dashboardIds,
      dashNames: card.dashboardNames,
    };
  }
  return {
    deps,
  };
}

function renderCardsReadme(snapshot: MetabaseSnapshot): string {
  const lines: string[] = [
    "# Individual Card Details",
    "",
    `${snapshot.cardDocs.length} cards documented. Each file contains full field metadata, description, upstream/downstream dependencies, and risk flags.`,
    "",
    "Use `_catalog.md` for discovery (one line per card); read individual files when you need field-level detail.",
    "",
    "## Quick Start",
    "",
    "```bash",
    "# Find a card by ID",
    "cat cards/747.md",
    "",
    "# Find cards referencing card 904",
    "grep -l '#904' cards/*.md",
    "```",
    "",
    "## Cards by Collection",
    "",
  ];

  const byCollection = new Map<string, CardDoc[]>();
  for (const card of snapshot.cardDocs) {
    const key = card.collectionName;
    const list = byCollection.get(key) ?? [];
    list.push(card);
    byCollection.set(key, list);
  }

  const sorted = Array.from(byCollection.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  for (const [collectionName, cards] of sorted) {
    lines.push(`### ${escapeMarkdown(collectionName)} (${cards.length} cards)`);
    lines.push("");
    for (const card of cards) {
      lines.push(`- [#${card.id} ${escapeMarkdown(card.name)}](${card.id}.md)`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function renderCardDetail(card: CardDoc, snapshot: MetabaseSnapshot): string {
  const fields = card.fields;
  const cardById = buildCardByIdMap(snapshot.cardDocs);
  const upstreamRefs = card.upstreamCardIds.map((id) => formatCardRef(id, cardById));
  const downstreamRefs = card.downstreamCardIds.map((id) => formatCardRef(id, cardById));

  const lines: string[] = [
    `# #${card.id} ${escapeMarkdown(card.name)}`,
    "",
    `| Property | Value |`,
    `| --- | --- |`,
    `| Collection | ${escapeMarkdown(card.collectionName)} (#${card.collectionId ?? "?"}) |`,
    `| Database | ${card.databaseId ?? "?"} |`,
    `| Type | ${card.type} |`,
    `| Display | ${card.display} |`,
    `| Query Type | ${card.queryType} |`,
    `| Domains | ${card.domains.join(", ")} |`,
    `| Archived | ${card.isArchived ? "yes" : "no"} |`,
    `| Dependency Depth | ${card.dependencyDepth} |`,
    `| Updated | ${card.updatedAt} |`,
    "",
    "## Description",
    "",
    card.description || "_missing_",
    "",
  ];

  if (fields.length > 0) {
    lines.push("## Fields");
    lines.push("");
    lines.push(
      renderTable(
        ["Field", "Display Name", "Type", "Semantic Type"],
        fields.map((f) => [f.name, f.displayName, f.type, f.semanticType]),
      ),
    );
  } else {
    lines.push("## Fields");
    lines.push("");
    lines.push("_No result metadata available._");
  }

  lines.push("");

  if (upstreamRefs.length > 0) {
    lines.push("## Upstream Cards");
    lines.push("");
    for (const ref of upstreamRefs) {
      lines.push(`- ${ref}`);
    }
    lines.push("");
  }

  if (downstreamRefs.length > 0) {
    lines.push("## Downstream Cards");
    lines.push("");
    for (const ref of downstreamRefs) {
      lines.push(`- ${ref}`);
    }
    lines.push("");
  }

  if (card.dashboardNames.length > 0) {
    lines.push("## Dashboards");
    lines.push("");
    for (const name of card.dashboardNames) {
      lines.push(`- ${escapeMarkdown(name)}`);
    }
    lines.push("");
  }

  if (card.risks.length > 0) {
    lines.push("## Risks");
    lines.push("");
    for (const risk of card.risks) {
      lines.push(`- ${risk}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function renderDomain(snapshot: MetabaseSnapshot, domain: string): string {
  const cards = snapshot.cardDocs.filter((card) => card.domains.includes(domain));
  const sourceModels = cards.filter((card) => card.type.includes("model"));
  const dashboardComponents = cards.filter((card) => card.dashboardIds.length > 0);
  const cleanup = cards.filter((card) => card.risks.length > 0).slice(0, 40);

  return [
    `# ${capitalize(domain)} Domain`,
    "",
    `Cards classified into this domain: ${cards.length}`,
    "",
    "## Likely Source Models",
    "",
    renderCardTable(sourceModels, { includeRisks: true, includeDependencies: true }),
    "",
    "## Dashboard Components",
    "",
    renderCardTable(dashboardComponents, { includeRisks: false, includeDependencies: true }),
    "",
    "## Cleanup / Review Candidates",
    "",
    renderCardTable(cleanup, { includeRisks: true, includeDependencies: true }),
    "",
    "## All Cards",
    "",
    renderCardTable(cards, { includeRisks: true, includeDependencies: true }),
    "",
  ].join("\n");
}

function renderCardTable(
  cards: CardDoc[],
  options: { includeRisks: boolean; includeDependencies: boolean },
): string {
  if (cards.length === 0) return "_No cards found._";
  const headers = [
    "ID",
    "Name",
    "DB",
    "Collection",
    "Type",
    "Domains",
    "Display",
    ...(options.includeDependencies ? ["Upstream", "Downstream", "Dashboards"] : []),
    ...(options.includeRisks ? ["Risks"] : []),
  ];

  const rows = cards.map((card) => [
    `#${card.id}`,
    card.name,
    String(card.databaseId ?? ""),
    card.collectionName,
    card.type,
    card.domains.join(", "),
    card.display,
    ...(options.includeDependencies
      ? [
          card.upstreamCardIds.map((id) => `#${id}`).join(", "),
          card.downstreamCardIds.map((id) => `#${id}`).join(", "),
          card.dashboardNames.join(", "),
        ]
      : []),
    ...(options.includeRisks ? [card.risks.join("; ")] : []),
  ]);

  return renderTable(headers, rows);
}

function renderTable(headers: string[], rows: string[][]): string {
  const header = `| ${headers.map(escapeTableCell).join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeTableCell).join(" | ")} |`);
  return [header, divider, ...body].join("\n");
}

function formatCardRef(id: number, byId: Map<number, CardDoc>): string {
  const card = byId.get(id);
  return card ? `#${id} ${card.name}` : `#${id}`;
}

function buildCardByIdMap(cards: CardDoc[]): Map<number, CardDoc> {
  const byId = new Map<number, CardDoc>();
  cards.forEach((card) => byId.set(card.id, card));
  return byId;
}

function countDomains(cards: CardDoc[]): Record<string, number> {
  const counts: Record<string, number> = {};
  cards.forEach((card) => {
    card.domains.forEach((domain) => {
      counts[domain] = (counts[domain] ?? 0) + 1;
    });
  });
  return counts;
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function escapeTableCell(value: string): string {
  return (value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, "<br>")
    .replace(/\r/g, "")
    .slice(0, 500);
}

function escapeMarkdown(value: string): string {
  // Escape the Markdown special characters that most often break heading/inline
  // rendering: #, *, _, `, [, ], \. Pipes and newlines are handled by
  // escapeTableCell for table cells; this is for free-text heading/line use.
  return (value ?? "").replace(/([#*_`\[\]\\])/g, "\\$1");
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function uniqueNumbers(values: number[]): number[] {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

async function writeReportFile(outputPath: string, payload: string): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${payload.trimEnd()}\n`, "utf8");
}

async function writeJsonFile(outputPath: string, data: unknown): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("-")) throw new Error(`${name} requires a value`);
  return value;
}

function printSummary(snapshot: MetabaseSnapshot, outputDir: string) {
  console.log("Metabase knowledge docs generated (metadata only)");
  console.log(`Output: ${outputDir}`);
  console.log(`Collections: ${snapshot.collections.length}`);
  console.log(`Cards: ${snapshot.cardDocs.length}`);
  console.log(`Dashboards: ${snapshot.dashboards.length}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
