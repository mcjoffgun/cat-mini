/**
 * 猫咪年龄换算工具
 *
 * 采用通用的猫龄 ↔ 人龄换算表（分段线性插值）：
 *  1个月=1岁  2个月=3岁  3个月=5岁  6个月=10岁
 *  1年=15岁  2年=24岁  此后每年+4岁
 */

/** 已知换算锚点：总月数 → 人类年龄 */
const AGE_ANCHORS: Array<[number, number]> = [
  [0, 0],
  [1, 1],
  [2, 3],
  [3, 5],
  [6, 10],
  [12, 15],
  [24, 24]
]

/** 2 岁以后每年对应人类年龄 */
const HUMAN_YEARS_PER_CAT_YEAR = 4

/**
 * 猫咪年龄 → 人类年龄
 * @param years 猫龄（年）
 * @param months 猫龄（月），0-11
 * @returns 对应的人类年龄（岁）
 */
export function catToHumanAge(years: number, months: number): number {
  const totalMonths = Math.floor(years) * 12 + Math.floor(months)
  if (totalMonths <= 0) return 0

  // 超过 24 个月（2 岁）：线性累加
  if (totalMonths >= 24) {
    const extraYears = (totalMonths - 24) / 12
    return Math.floor(24 + extraYears * HUMAN_YEARS_PER_CAT_YEAR)
  }

  // 24 个月内：在锚点间线性插值
  for (let i = 1; i < AGE_ANCHORS.length; i++) {
    const [prevMonth, prevAge] = AGE_ANCHORS[i - 1]
    const [nextMonth, nextAge] = AGE_ANCHORS[i]
    if (totalMonths <= nextMonth) {
      const ratio = (totalMonths - prevMonth) / (nextMonth - prevMonth)
      return Math.round(prevAge + (nextAge - prevAge) * ratio)
    }
  }
  return 24
}

/**
 * 根据年龄生成一段通俗描述
 */
export function getAgeStage(years: number, months: number): string {
  const totalMonths = years * 12 + months
  if (totalMonths <= 0) return '刚出生'
  if (totalMonths < 6) return '幼猫期（奶猫）'
  if (totalMonths < 12) return '幼猫期'
  if (totalMonths < 24) return '青年期'
  if (totalMonths < 120) return '壮年期'
  return '老年期'
}
