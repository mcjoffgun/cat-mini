/**
 * 本地存储封装
 * 统一带命名空间前缀，避免键名冲突
 * 注：Pinia stores 的持久化走 pinia-plugin-persistedstate，这里主要用于零散数据
 */

const PREFIX = 'cat_app_'

/** 读取本地存储（找不到返回 null） */
export function getStorage<T>(key: string): T | null {
  const value = uni.getStorageSync(PREFIX + key)
  if (value === '' || value === undefined || value === null) {
    return null
  }
  return value as T
}

/** 写入本地存储 */
export function setStorage(key: string, value: unknown): void {
  uni.setStorageSync(PREFIX + key, value)
}

/** 移除本地存储 */
export function removeStorage(key: string): void {
  uni.removeStorageSync(PREFIX + key)
}

/** 清空所有带本应用前缀的存储 */
export function clearStorage(): void {
  const keys = uni.getStorageInfoSync().keys
  keys.forEach((key) => {
    if (key.startsWith(PREFIX)) {
      uni.removeStorageSync(key)
    }
  })
}
