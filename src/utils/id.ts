/**
 * ID 生成工具
 */

/** 生成唯一 ID：前缀 + 时间戳 + 随机串 */
export function genId(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
