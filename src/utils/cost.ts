/**
 * 养猫成本计算：纯函数与默认配置
 * 供 pages/tool-detail/cost-calculator.vue 使用
 */

export interface CostInput {
  /** 购猫/领养费（一次性，元） */
  catPrice: number
  /** 初始用品（一次性，元）：猫砂盆 / 猫爬架 / 食碗 / 航空箱等 */
  supplies: number
  /** 猫粮（每月，元） */
  food: number
  /** 猫砂（每月，元） */
  litter: number
  /** 零食罐头（每月，元） */
  snacks: number
  /** 玩具杂项（每月，元） */
  misc: number
  /** 疫苗驱虫（每年，元） */
  medical: number
  /** 医疗储备金（每年，元） */
  reserve: number
}

export type CostField = keyof CostInput

export interface CostPreset {
  name: string
  icon: string
  values: CostInput
}

/** 消费水平预设，一键填充表单 */
export const COST_PRESETS: CostPreset[] = [
  {
    name: '节俭',
    icon: '🌱',
    values: { catPrice: 0, supplies: 400, food: 100, litter: 30, snacks: 0, misc: 10, medical: 300, reserve: 300 }
  },
  {
    name: '标准',
    icon: '🏠',
    values: { catPrice: 800, supplies: 800, food: 250, litter: 60, snacks: 50, misc: 30, medical: 400, reserve: 600 }
  },
  {
    name: '富养',
    icon: '👑',
    values: { catPrice: 3000, supplies: 2000, food: 600, litter: 120, snacks: 200, misc: 100, medical: 500, reserve: 1500 }
  }
]

export interface CostBreakdownItem {
  key: CostField
  label: string
  /** 折算到每月的金额（元） */
  monthly: number
  /** 占月均成本百分比（0-100，四舍五入） */
  percent: number
}

export interface CostResult {
  /** 初期投入（一次性合计，元） */
  initial: number
  /** 月均成本（每月项 + 每年项 / 12，元） */
  monthly: number
  /** 首年总成本（初期投入 + 月均 × 12，元） */
  yearlyFirst: number
  /** 日均成本（月均 × 12 / 365，元） */
  daily: number
  /** 月均成本构成（按金额降序，仅含金额 > 0 的项） */
  breakdown: CostBreakdownItem[]
  /** 消费水平评价 */
  levelName: string
}

/** 各字段的展示名（用于成本构成） */
const FIELD_LABELS: Record<CostField, string> = {
  catPrice: '购猫/领养费',
  supplies: '初始用品',
  food: '猫粮',
  litter: '猫砂',
  snacks: '零食罐头',
  misc: '玩具杂项',
  medical: '疫苗驱虫',
  reserve: '医疗储备金'
}

/** 每年摊到每月的字段 */
const YEARLY_FIELDS: CostField[] = ['medical', 'reserve']

function round(n: number): number {
  return Math.round(n)
}

export function calcCost(input: CostInput): CostResult {
  const initial = input.catPrice + input.supplies
  const monthlyFixed = input.food + input.litter + input.snacks + input.misc
  const monthlyFromYearly = YEARLY_FIELDS.reduce((sum, key) => sum + input[key] / 12, 0)
  const monthly = monthlyFixed + monthlyFromYearly
  const yearlyFirst = initial + monthly * 12
  const daily = (monthly * 12) / 365

  const items: CostBreakdownItem[] = (Object.keys(FIELD_LABELS) as CostField[])
    .map((key) => ({
      key,
      label: FIELD_LABELS[key],
      monthly: YEARLY_FIELDS.includes(key) ? input[key] / 12 : key === 'food' || key === 'litter' || key === 'snacks' || key === 'misc' ? input[key] : 0,
      percent: 0
    }))
    .filter((item) => item.monthly > 0)
    .map((item) => ({
      ...item,
      percent: monthly > 0 ? round((item.monthly / monthly) * 100) : 0
    }))
    .sort((a, b) => b.monthly - a.monthly)

  return {
    initial: round(initial),
    monthly: round(monthly),
    yearlyFirst: round(yearlyFirst),
    daily: round(daily * 10) / 10,
    breakdown: items,
    levelName: getLevelName(monthly)
  }
}

/** 按月均成本给出消费水平评价 */
export function getLevelName(monthly: number): string {
  if (monthly <= 0) return '还没填数字哦'
  if (monthly < 250) return '节俭型铲屎官'
  if (monthly < 600) return '标准型铲屎官'
  if (monthly < 1200) return '品质型铲屎官'
  return '壕气型铲屎官'
}

/** 输入框内容安全转数字：过滤非法字符、负数归零、空值取 0 */
export function parseAmount(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, '')
  const num = Number.parseFloat(cleaned)
  if (!Number.isFinite(num) || num < 0) return 0
  return num
}

/** 把 CostInput 转成表单字符串（用于预设填充） */
export function toFormStrings(values: CostInput): Record<CostField, string> {
  const form = {} as Record<CostField, string>
  for (const key of Object.keys(values) as CostField[]) {
    form[key] = String(values[key])
  }
  return form
}

/** 把表单字符串转成 CostInput */
export function fromFormStrings(form: Record<CostField, string>): CostInput {
  return {
    catPrice: parseAmount(form.catPrice),
    supplies: parseAmount(form.supplies),
    food: parseAmount(form.food),
    litter: parseAmount(form.litter),
    snacks: parseAmount(form.snacks),
    misc: parseAmount(form.misc),
    medical: parseAmount(form.medical),
    reserve: parseAmount(form.reserve)
  }
}

/** 金额千分位格式化，如 12345 -> "12,345" */
export function formatMoney(value: number): string {
  const [intPart, decPart] = String(value).split('.')
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${withSep}.${decPart}` : withSep
}
