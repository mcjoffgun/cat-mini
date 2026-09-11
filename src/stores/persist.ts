/**
 * Pinia 持久化统一封装
 *
 * 解决两件事：
 * 1. 容错：存储读写、JSON 解析失败时降级为默认值，绝不影响应用启动与正常使用
 *    （小程序单 key 有 1MB 上限，写入可能因超限抛错）。
 * 2. 版本兼容：数据以 { version, state } 信封存储；历史版本是没有信封的裸 state，
 *    读取时自动识别为 v0 并按 migrations 顺序迁移，迁移后下次写入自动升级。
 */
import type { StateTree } from 'pinia'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

/** 持久化数据信封，携带结构版本号 */
interface PersistEnvelope {
  version: number
  state: StateTree
}

/** 单步迁移：把 state 从版本 v 升级到 v+1 */
export type StateMigration = (state: StateTree) => StateTree

export interface PersistConfig {
  /** 存储 key */
  key: string
  /** 当前数据结构版本（从 1 起；调整结构时 +1 并在 migrations 补一条对应迁移） */
  version: number
  /** migrations[v] 表示把数据从 v 迁移到 v+1 */
  migrations?: Record<number, StateMigration>
}

/**
 * 小程序环境下的安全 storage。
 * 读取异常 / 无值返回空串（插件据此跳过 hydrate）；写入异常只告警不抛出。
 */
export const uniStorage = {
  getItem(key: string): string {
    try {
      const value = uni.getStorageSync(key)
      return value === undefined || value === null ? '' : String(value)
    } catch (error) {
      console.warn('[persist] 读取本地存储失败', key, error)
      return ''
    }
  },
  setItem(key: string, value: string): void {
    try {
      uni.setStorageSync(key, value)
    } catch (error) {
      // 常见原因：超出单 key 1MB 上限。记录但不打断业务流程。
      console.warn('[persist] 写入本地存储失败', key, error)
    }
  }
}

function isEnvelope(data: unknown): data is PersistEnvelope {
  return (
    typeof data === 'object' &&
    data !== null &&
    'version' in data &&
    'state' in data
  )
}

/**
 * 生成某个 store 的 persist 配置。
 * deserialize 必须返回「裸 state」（会被直接 $patch 进 store），不能返回信封。
 */
export function createPersist(config: PersistConfig): PersistedStateOptions {
  const { key, version, migrations = {} } = config

  return {
    key,
    serializer: {
      // 写入：统一包一层当前版本信封
      serialize(state) {
        try {
          return JSON.stringify({ version, state })
        } catch (error) {
          console.warn('[persist] 序列化失败，跳过本次写入', key, error)
          return ''
        }
      },
      // 读取：解析 → 识别信封 / 旧裸数据 → 顺序迁移 → 返回裸 state
      deserialize(raw) {
        let data: unknown
        try {
          data = JSON.parse(raw)
        } catch (error) {
          console.warn('[persist] 数据已损坏，重置为默认值', key, error)
          return {}
        }

        let fromVersion = 0
        let state: StateTree

        if (isEnvelope(data)) {
          fromVersion = Number.isFinite(data.version) ? Number(data.version) : 0
          state = data.state
        } else if (typeof data === 'object' && data !== null) {
          // 历史版本：无信封，整个对象本身就是 state（按 v0 处理）
          state = data as StateTree
        } else {
          return {}
        }

        let current = fromVersion
        while (current < version && typeof migrations[current] === 'function') {
          try {
            state = migrations[current](state)
          } catch (error) {
            console.warn(`[persist] 从 v${current} 迁移失败，重置为默认值`, key, error)
            return {}
          }
          current += 1
        }

        return typeof state === 'object' && state !== null ? state : {}
      }
    }
  }
}
