<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { BACKUP_MODULES, applyBackup, backupFileName, byteLength, collectBackup, formatBytes, parseBackup, serializeBackup } from '@/utils/backup'
import type { BackupParsed } from '@/utils/backup'
import { useDiaryStore } from '@/stores/diary'
import { useFavoriteStore } from '@/stores/favorite'
import { useVaccineStore } from '@/stores/vaccine'
import { useFeedingStore } from '@/stores/feeding'
import { useProfileStore } from '@/stores/profile'
import { useWeightStore } from '@/stores/weight'
import { useFeedbackStore } from '@/stores/feedback'

const diaryStore = useDiaryStore()
const favoriteStore = useFavoriteStore()
const vaccineStore = useVaccineStore()
const feedingStore = useFeedingStore()
const profileStore = useProfileStore()
const weightStore = useWeightStore()
const feedbackStore = useFeedbackStore()

/** 存储 key → store 实例（用于读取条数与导入后 $hydrate） */
const storesByKey: Record<string, { $hydrate?: () => void } & Record<string, unknown>> = {
  cat_diary: diaryStore,
  cat_favorite: favoriteStore,
  cat_vaccine: vaccineStore,
  cat_feeding: feedingStore,
  cat_profile: profileStore,
  cat_weight: weightStore,
  cat_feedback: feedbackStore
}

const showPasteArea = ref(false)
const pasteText = ref('')

/** 各模块当前记录数（响应式，来自 live store） */
const overview = computed(() =>
  BACKUP_MODULES.map((m) => {
    const store = storesByKey[m.key]
    const list = store ? store[m.stateListKey] : undefined
    return {
      key: m.key,
      label: m.label,
      icon: m.icon,
      count: Array.isArray(list) ? list.length : 0
    }
  })
)

const totalCount = computed(() => overview.value.reduce((s, i) => s + i.count, 0))

/** 本地存储占用（KB → 友好展示），onShow 刷新 */
const storageSize = ref('0 B')

/** 当前备份 JSON 体积预估 */
const backupSize = ref('0 B')

onShow(() => {
  try {
    const info = uni.getStorageInfoSync()
    storageSize.value = formatBytes((info.currentSize || 0) * 1024)
  } catch {
    storageSize.value = '未知'
  }
  backupSize.value = formatBytes(byteLength(serializeBackup(collectBackup())))
})

/* ---------- 导出 ---------- */

function exportJsonText(): string {
  return serializeBackup(collectBackup())
}

/** 文件导出：写入用户目录 → 分享文件到聊天（推荐，无大小限制顾虑） */
function exportAsFile() {
  if (!totalCount.value) {
    uni.showToast({ title: '还没有任何数据哦', icon: 'none' })
    return
  }
  const json = exportJsonText()
  try {
    const filePath = `${wx.env.USER_DATA_PATH}/${backupFileName(Date.now())}`
    wx.getFileSystemManager().writeFile({
      filePath,
      data: json,
      encoding: 'utf8',
      success: () => {
        wx.shareFileMessage({
          filePath,
          fail: () => {
            uni.showToast({ title: '未完成分享，可改用复制文本', icon: 'none' })
          }
        })
      },
      fail: () => {
        uni.showToast({ title: '写入文件失败，请改用复制文本', icon: 'none' })
      }
    })
  } catch {
    uni.showToast({ title: '当前环境不支持文件导出，请用复制文本', icon: 'none' })
  }
}

/** 文本导出：复制到剪贴板（兜底通道） */
function exportAsText() {
  if (!totalCount.value) {
    uni.showToast({ title: '还没有任何数据哦', icon: 'none' })
    return
  }
  const json = exportJsonText()
  const size = byteLength(json)
  const doCopy = () => {
    uni.setClipboardData({
      data: json,
      success: () => uni.showToast({ title: '已复制，建议尽快粘贴到聊天中保存', icon: 'none' })
    })
  }
  if (size > 100 * 1024) {
    uni.showModal({
      title: '备份较大',
      content: `本次备份约 ${formatBytes(size)}，剪贴板可能截断，建议使用「导出为文件」。仍要复制文本吗？`,
      confirmText: '继续复制',
      confirmColor: '#FF9F6B',
      success: (res) => {
        if (res.confirm) doCopy()
      }
    })
  } else {
    doCopy()
  }
}

/* ---------- 导入 ---------- */

/** 文件导入：从聊天会话选择备份文件（配合文件导出使用） */
function importFromFile() {
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success: (res) => {
      const file = res.tempFiles?.[0]
      if (!file) return
      try {
        const content = wx.getFileSystemManager().readFileSync(file.path, 'utf8')
        handleImportText(String(content))
      } catch {
        uni.showToast({ title: '读取文件失败', icon: 'none' })
      }
    }
  })
}

function handleImportText(text: string) {
  const result = parseBackup(text)
  if (!result.ok) {
    uni.showToast({ title: result.error, icon: 'none' })
    return
  }
  confirmImport(result.parsed)
}

function confirmImport(parsed: BackupParsed) {
  const lines = [
    `导出时间：${parsed.exportedAtText}`,
    ...parsed.items.map((i) => `${i.icon} ${i.label} ${i.count} 条`)
  ]
  if (parsed.imageCount > 0) {
    lines.push(`⚠️ 含 ${parsed.imageCount} 张日记配图，图片本体不随备份迁移，恢复后可能无法显示`)
  }
  lines.push('')
  lines.push('恢复将按模块覆盖现有数据（备份中没有的模块不受影响），建议先备份当前数据。确定恢复吗？')
  uni.showModal({
    title: '确认恢复',
    content: lines.join('\n'),
    confirmText: '确定恢复',
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (!res.confirm) return
      const written = applyBackup(parsed.file)
      if (!written) {
        uni.showToast({ title: '恢复失败，请重试', icon: 'none' })
        return
      }
      // 重新水合所有 store，让导入的数据立即生效（无需重启）
      Object.values(storesByKey).forEach((store) => {
        try {
          store.$hydrate?.()
        } catch (error) {
          console.warn('[backup] hydrate 失败', error)
        }
      })
      pasteText.value = ''
      showPasteArea.value = false
      uni.showToast({ title: `已恢复 ${written} 个模块`, icon: 'success' })
    }
  })
}

function importFromPaste() {
  if (!pasteText.value.trim()) {
    uni.showToast({ title: '请先粘贴备份内容', icon: 'none' })
    return
  }
  handleImportText(pasteText.value.trim())
}
</script>

<template>
  <view class="bk">
    <!-- 当前数据总览 -->
    <view class="bk__section">
      <text class="bk__section-title">📦 当前数据</text>
      <view class="bk__card">
        <view class="bk-stats">
          <view v-for="item in overview" :key="item.key" class="bk-stats__item">
            <text class="bk-stats__num">{{ item.count }}</text>
            <text class="bk-stats__label">{{ item.icon }} {{ item.label }}</text>
          </view>
        </view>
        <view class="bk__meta">
          <text class="bk__meta-text">共 {{ totalCount }} 条记录 · 本地存储占用 {{ storageSize }} · 备份约 {{ backupSize }}</text>
        </view>
      </view>
    </view>

    <!-- 备份 -->
    <view class="bk__section">
      <text class="bk__section-title">💾 备份（导出）</text>
      <view class="bk__card">
        <text class="bk__desc">
          删除小程序、清理缓存或换手机前，请先备份。推荐导出为文件发送到「文件传输助手」长期保存。
        </text>
        <view class="bk__btn-row">
          <view class="btn-primary bk__btn" @click="exportAsFile">导出为文件（推荐）</view>
          <view class="btn-ghost bk__btn" @click="exportAsText">复制备份文本</view>
        </view>
      </view>
    </view>

    <!-- 恢复 -->
    <view class="bk__section">
      <text class="bk__section-title">📥 恢复（导入）</text>
      <view class="bk__card">
        <text class="bk__desc">
          从之前备份的文件或文本恢复数据。按模块覆盖恢复，备份中没有的模块保持现状。
        </text>
        <view class="bk__btn-row">
          <view class="btn-primary bk__btn" @click="importFromFile">从聊天选择备份文件</view>
        </view>
        <view class="bk__link" @click="showPasteArea = !showPasteArea">
          {{ showPasteArea ? '收起文本粘贴 ▴' : '或粘贴备份文本恢复 ▾' }}
        </view>
        <view v-if="showPasteArea" class="bk__paste">
          <textarea
            v-model="pasteText"
            class="bk__textarea"
            placeholder="长按粘贴之前复制的备份 JSON 文本"
            placeholder-class="bk__placeholder"
          />
          <view class="btn-ghost bk__btn bk__btn--parse" @click="importFromPaste">解析并预览</view>
        </view>
      </view>
    </view>

    <!-- 限制说明 -->
    <view class="bk__section">
      <text class="bk__section-title">⚠️ 须知</text>
      <view class="bk__card">
        <text class="bk__notice">1. 日记配图文件保存在本机，备份只包含文字数据；跨设备恢复后旧图片可能无法显示。</text>
        <text class="bk__notice">2. 备份 JSON 含你的全部记录，请只发送到自己的可信会话，不要转发给他人。</text>
        <text class="bk__notice">3. 建议至少每月备份一次；微信在存储空间不足时可能自动清理小程序数据。</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.bk {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__section {
    padding: 0 $spacing-lg;
    margin-top: $spacing-lg;
  }

  &__section-title {
    display: block;
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-md;
  }

  &__card {
    background: $bg-card;
    border-radius: $radius-lg;
    box-shadow: $shadow-card;
    padding: $spacing-lg;
  }

  &__desc {
    display: block;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: $spacing-md;
  }

  &__btn-row {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__btn {
    width: 100%;
  }

  &__btn--parse {
    margin-top: $spacing-sm;
  }

  &__meta {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1rpx solid $divider;
  }

  &__meta-text {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__link {
    margin-top: $spacing-md;
    text-align: center;
    font-size: $font-sm;
    color: $primary-dark;
  }

  &__paste {
    margin-top: $spacing-sm;
  }

  &__textarea {
    width: 100%;
    height: 200rpx;
    background: $accent-cream;
    border-radius: $radius-md;
    padding: $spacing-sm $spacing-md;
    font-size: $font-sm;
    color: $text-primary;
    box-sizing: border-box;
  }

  &__placeholder {
    color: $text-muted;
  }

  &__notice {
    display: block;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.8;

    & + & {
      margin-top: $spacing-xs;
    }
  }
}

.bk-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-sm;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rpx;
  }

  &__num {
    font-size: 40rpx;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__label {
    font-size: 20rpx;
    color: $text-muted;
  }
}
</style>
