/**
 * 图片选择与本地持久化
 *
 * 小程序里 uni.chooseMedia 拿到的是临时文件路径，应用重启或被系统清理后会失效，
 * 不能直接存进 Pinia。需要先用 uni.saveFile 转存到本地持久文件目录，
 * 再把转存后的路径（savedFilePath）存入数据。
 */

/** 单条日记最多配图数量 */
export const MAX_DIARY_IMAGES = 3

/** 选择图片（相册 / 相机），返回临时路径数组；用户取消时返回空数组 */
export function chooseImages(count: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    uni.chooseMedia({
      count,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        resolve((res.tempFiles || []).map((f) => f.tempFilePath))
      },
      fail: (err) => {
        // 用户主动取消不视为错误
        if (err?.errMsg?.includes('cancel')) {
          resolve([])
          return
        }
        reject(err)
      }
    })
  })
}

/** 把单个临时文件转存为持久化本地文件，返回保存后的路径 */
export function saveImage(tempFilePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    uni.saveFile({
      tempFilePath,
      success: (res) => resolve(res.savedFilePath),
      fail: reject
    })
  })
}

/** 批量转存临时图片（按顺序），返回持久路径数组 */
export async function saveImages(tempFilePaths: string[]): Promise<string[]> {
  const saved: string[] = []
  for (const temp of tempFilePaths) {
    saved.push(await saveImage(temp))
  }
  return saved
}

/**
 * 删除已持久化的本地图片。删除日记或移除配图时调用，避免本地文件堆积。
 * 失败静默处理（文件可能已被系统清理），不影响业务流程。
 */
export function removeSavedImage(filePath: string): void {
  if (!filePath) return
  uni.removeSavedFile({ filePath, fail: () => {} })
}

/** 批量删除持久化图片 */
export function removeSavedImages(filePaths?: string[]): void {
  filePaths?.forEach(removeSavedImage)
}
