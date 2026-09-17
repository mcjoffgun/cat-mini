/**
 * 数据备份（导出 / 导入）
 *
 * 设计：
 * - 直接读写各 store 在本地存储中的 persist 信封（{ version, state } JSON 文本），
 *   不逐 store 实现序列化；旧版本裸数据也原样保留在信封语义内。
 * - 导入写回存储后由各 store 的 $hydrate() 重新水合，
 *   会走 createPersist 的 deserialize 通道 —— 旧备份自动享受版本迁移。
 * - 日记配图为本机文件，备份仅含路径：跨设备/清缓存后图片失效，导出时明示。
 */
import { formatDate } from './date'

export interface BackupModuleMeta {
  /** 存储 key（与 createPersist 的 key 一致） */
  key: string
  label: string
  icon: string
  /** state 中记录数组字段名 */
  stateListKey: string
}

/** 参与备份的模块清单 */
export const BACKUP_MODULES: BackupModuleMeta[] = [
  { key: 'cat_diary', label: '养猫日记', icon: '📝', stateListKey: 'entries' },
  { key: 'cat_favorite', label: '品种收藏', icon: '⭐', stateListKey: 'favoriteIds' },
  { key: 'cat_vaccine', label: '疫苗提醒', icon: '💉', stateListKey: 'records' },
  { key: 'cat_feeding', label: '喂食记录', icon: '🍚', stateListKey: 'records' },
  { key: 'cat_profile', label: '猫咪档案', icon: '🐈', stateListKey: 'profiles' },
  { key: 'cat_weight', label: '体重记录', icon: '⚖️', stateListKey: 'records' },
  { key: 'cat_feedback', label: '意见反馈', icon: '💬', stateListKey: 'items' }
]

export interface BackupFile {
  /** 应用标识，导入时校验 */
  app: 'cat-miniapp'
  /** 备份文件格式版本 */
  backupVersion: number
  /** 导出时间戳 */
  exportedAt: number
  /** key → persist 信封（或历史裸 state），原样保存 */
  data: Record<string, unknown>
}

const APP_TAG = 'cat-miniapp'
const BACKUP_VERSION = 1

/** 安全读取存储（异常视为无数据） */
function safeGet(key: string): string {
  try {
    const value = uni.getStorageSync(key)
    return value === undefined || value === null ? '' : String(value)
  } catch {
    return ''
  }
}

/** 从信封 / 历史裸数据中取出 state */
function extractState(payload: unknown): Record<string, unknown> | null {
  if (typeof payload !== 'object' || payload === null) return null
  const p = payload as Record<string, unknown>
  if (typeof p.version === 'number' && typeof p.state === 'object' && p.state !== null) {
    return p.state as Record<string, unknown>
  }
  return p
}

/** 统计某模块的记录条数（解析失败返回 0） */
export function countModule(payload: unknown, stateListKey: string): number {
  const state = extractState(payload)
  if (!state) return 0
  const list = state[stateListKey]
  return Array.isArray(list) ? list.length : 0
}

/** 统计日记中的配图数量（备份不含图片本体，用于提示） */
function countDiaryImages(payload: unknown): number {
  const state = extractState(payload)
  const entries = state?.entries
  if (!Array.isArray(entries)) return 0
  return entries.reduce(
    (sum: number, e: { images?: unknown }) =>
      sum + (Array.isArray(e?.images) ? e.images.length : 0),
    0
  )
}

/** 收集当前全部业务数据，生成备份对象（跳过读取失败的模块） */
export function collectBackup(): BackupFile {
  const data: Record<string, unknown> = {}
  for (const module of BACKUP_MODULES) {
    const raw = safeGet(module.key)
    if (!raw) continue
    try {
      data[module.key] = JSON.parse(raw)
    } catch {
      console.warn('[backup] 模块数据损坏，跳过', module.key)
    }
  }
  return { app: APP_TAG, backupVersion: BACKUP_VERSION, exportedAt: Date.now(), data }
}

/** 备份对象 → JSON 文本（导出用） */
export function serializeBackup(file: BackupFile): string {
  return JSON.stringify(file)
}

/** 生成备份文件名，如 喵星人图鉴备份-2026-09-16.json */
export function backupFileName(exportedAt: number): string {
  return `喵星人图鉴备份-${formatDate(new Date(exportedAt))}.json`
}

/** UTF-8 字节长度（小程序无 TextEncoder 时的近似算法） */
export function byteLength(text: string): number {
  let bytes = 0
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i)
    if (code < 0x80) bytes += 1
    else if (code < 0x800) bytes += 2
    // 代理对（emoji）占 2 个 code unit、4 字节
    else if (code >= 0xd800 && code <= 0xdbff) {
      bytes += 4
      i += 1
    } else bytes += 3
  }
  return bytes
}

/** 字节数友好展示 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10} MB`
}

export interface BackupSummaryItem {
  key: string
  label: string
  icon: string
  count: number
}

export interface BackupParsed {
  file: BackupFile
  /** 备份内包含的模块及条数 */
  items: BackupSummaryItem[]
  /** 日记配图数量（迁移后失效的提示用） */
  imageCount: number
  /** 备份导出时间描述 */
  exportedAtText: string
}

export type ParseResult = { ok: true; parsed: BackupParsed } | { ok: false; error: string }

/** 解析并校验备份文本 */
export function parseBackup(text: string): ParseResult {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return { ok: false, error: '内容不是有效的 JSON，请确认完整粘贴了备份内容' }
  }
  if (typeof data !== 'object' || data === null) {
    return { ok: false, error: '备份内容格式不正确' }
  }
  const file = data as Partial<BackupFile>
  if (file.app !== APP_TAG) {
    return { ok: false, error: '这不是「喵星人图鉴」的备份文件' }
  }
  if (typeof file.backupVersion !== 'number' || file.backupVersion > BACKUP_VERSION) {
    return { ok: false, error: '备份版本高于当前小程序支持的版本，请升级小程序后重试' }
  }
  if (typeof file.data !== 'object' || file.data === null) {
    return { ok: false, error: '备份内容为空' }
  }

  const items: BackupSummaryItem[] = BACKUP_MODULES
    .filter((m) => file.data && file.data[m.key] !== undefined)
    .map((m) => ({
      key: m.key,
      label: m.label,
      icon: m.icon,
      count: countModule(file.data[m.key], m.stateListKey)
    }))
  if (!items.length) {
    return { ok: false, error: '备份里没有可恢复的模块数据' }
  }

  return {
    ok: true,
    parsed: {
      file: file as BackupFile,
      items,
      imageCount: countDiaryImages(file.data.cat_diary),
      exportedAtText: file.exportedAt ? formatDate(new Date(file.exportedAt)) : '未知时间'
    }
  }
}

/**
 * 把备份写回本地存储（按模块覆盖，备份中没有的模块保持不动）。
 * 写完后需要调用各 store 的 $hydrate() 让内存状态生效。
 * @returns 成功写入的模块数
 */
export function applyBackup(file: BackupFile): number {
  let written = 0
  for (const module of BACKUP_MODULES) {
    const payload = file.data[module.key]
    if (payload === undefined) continue
    try {
      uni.setStorageSync(module.key, JSON.stringify(payload))
      written += 1
    } catch (error) {
      console.warn('[backup] 写入失败', module.key, error)
    }
  }
  return written
}
