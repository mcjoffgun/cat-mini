/**
 * 日期处理工具
 */

/** 将 Date 格式化为 YYYY-MM-DD */
export function formatDate(date: Date | number, sep = '-'): string {
  const d = typeof date === 'number' ? new Date(date) : date
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${year}${sep}${month}${sep}${day}`
}

/** 获取今天日期字符串 YYYY-MM-DD */
export function today(): string {
  return formatDate(new Date())
}

/** 获取当前时间戳 */
export function now(): number {
  return Date.now()
}

/** 在日期字符串上加 N 天，返回 YYYY-MM-DD */
export function addDays(dateStr: string, days: number): string {
  const d = parseDate(dateStr)
  d.setDate(d.getDate() + days)
  return formatDate(d)
}

/** 解析 YYYY-MM-DD 为 Date（避免 iOS 上 new Date('YYYY-MM-DD') 解析失败的问题） */
export function parseDate(dateStr: string): Date {
  const parts = dateStr.split('-').map((n) => Number(n))
  return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1)
}

/** 两个日期字符串相差的天数（dateStrA - dateStrB，可为负数） */
export function daysBetween(dateStrA: string, dateStrB: string): number {
  const a = parseDate(dateStrA).getTime()
  const b = parseDate(dateStrB).getTime()
  return Math.round((a - b) / (1000 * 60 * 60 * 24))
}

/** 距离今天还有几天（负数表示已过去） */
export function daysUntil(dateStr: string): number {
  return daysBetween(dateStr, today())
}
