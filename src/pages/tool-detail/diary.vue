<script setup lang="ts">
import { ref } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { useDiaryStore } from '@/stores/diary'
import type { DiaryEntry } from '@/data/types'
import { today } from '@/utils/date'
import {
  MAX_DIARY_IMAGES,
  chooseImages,
  saveImages,
  removeSavedImages
} from '@/utils/image'

const diaryStore = useDiaryStore()

// 日记为本地个人数据，分享的是工具本身而非具体内容
onShareAppMessage(() => ({
  title: '我在用「喵星人图鉴」记录养猫日常，推荐给你',
  path: '/pages/tool-detail/diary'
}))

onShareTimeline(() => ({ title: '用「喵星人图鉴」记录猫主子的每一天 🐱' }))

const showForm = ref(false)
const saving = ref(false)
const editingId = ref('')
const form = ref({
  date: today(),
  title: '',
  content: '',
  mood: 'happy' as 'happy' | 'normal' | 'sick',
  catName: ''
})
// 表单中的配图（展示用，混合临时路径与已持久化路径）
const formImages = ref<string[]>([])
// formImages 中尚未转存的临时路径子集；提交时才 saveFile，取消不留垃圾文件
const formTempImages = ref<string[]>([])
// 编辑前已持久化的图片，用于提交时清理被移除的图片文件
const editingImages = ref<string[]>([])

const moodOptions = [
  { value: 'happy', label: '😊 开心' },
  { value: 'normal', label: '😌 日常' },
  { value: 'sick', label: '😷 生病' }
]

function moodIcon(entry: DiaryEntry): string {
  return entry.mood === 'happy' ? '😊' : entry.mood === 'sick' ? '😷' : '😌'
}

function openAdd() {
  editingId.value = ''
  form.value = { date: today(), title: '', content: '', mood: 'happy', catName: '' }
  formImages.value = []
  formTempImages.value = []
  editingImages.value = []
  showForm.value = true
}

function openEdit(entry: DiaryEntry) {
  editingId.value = entry.id
  form.value = {
    date: entry.date,
    title: entry.title || '',
    content: entry.content,
    mood: entry.mood || 'normal',
    catName: entry.catName || ''
  }
  formImages.value = [...(entry.images || [])]
  formTempImages.value = []
  editingImages.value = [...(entry.images || [])]
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

/** 选择配图：追加到表单（此时仍是临时路径，提交时才持久化） */
async function pickImages() {
  const remain = MAX_DIARY_IMAGES - formImages.value.length
  if (remain <= 0) {
    uni.showToast({ title: `最多 ${MAX_DIARY_IMAGES} 张图片`, icon: 'none' })
    return
  }
  try {
    const temps = await chooseImages(remain)
    if (temps.length) {
      formImages.value.push(...temps)
      formTempImages.value.push(...temps)
    }
  } catch {
    uni.showToast({ title: '选择图片失败', icon: 'none' })
  }
}

/** 移除表单中的某张配图（临时路径直接丢弃，已持久化的在提交成功后清理） */
function removeFormImage(index: number) {
  const [removed] = formImages.value.splice(index, 1)
  const tempIdx = formTempImages.value.indexOf(removed)
  if (tempIdx > -1) formTempImages.value.splice(tempIdx, 1)
}

/** 预览时间线里的配图 */
function previewImages(images: string[], current: string) {
  uni.previewImage({ urls: images, current })
}

async function submitForm() {
  if (!form.value.content.trim()) {
    uni.showToast({ title: '写点内容吧', icon: 'none' })
    return
  }
  if (saving.value) return
  saving.value = true
  uni.showLoading({ title: '保存中', mask: true })

  try {
    // 临时路径 → 持久化路径（与展示列表一一对应替换）
    let finalImages = formImages.value
    if (formTempImages.value.length) {
      const saved = await saveImages(formTempImages.value)
      const tempToSaved = new Map(
        formTempImages.value.map((temp, i) => [temp, saved[i]])
      )
      finalImages = formImages.value.map((p) => tempToSaved.get(p) ?? p)
    }

    const data = {
      date: form.value.date,
      title: form.value.title.trim() || undefined,
      content: form.value.content.trim(),
      mood: form.value.mood,
      images: finalImages.length ? finalImages : undefined,
      catName: form.value.catName.trim() || undefined
    }

    if (editingId.value) {
      diaryStore.updateEntry(editingId.value, data)
      // 清理编辑中被移除的旧图片文件
      const removed = editingImages.value.filter((p) => !finalImages.includes(p))
      removeSavedImages(removed)
      uni.showToast({ title: '已更新', icon: 'success' })
    } else {
      diaryStore.addEntry(data)
      uni.showToast({ title: '已记录', icon: 'success' })
    }
    closeForm()
  } catch {
    uni.showToast({ title: '图片保存失败，请重试', icon: 'none' })
  } finally {
    saving.value = false
    uni.hideLoading()
  }
}

function removeEntry(entry: DiaryEntry) {
  uni.showModal({
    title: '删除日记',
    content: '确定要删除这条记录吗？配图也会一并删除。',
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (res.confirm) {
        diaryStore.removeEntry(entry.id)
        removeSavedImages(entry.images)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}

function pickDate(value: string) {
  form.value.date = value
}
</script>

<template>
  <view class="diary">
    <view class="diary__header">
      <view class="diary__tip">
        <text class="diary__tip-text">📖 记录猫主子每一天的小故事，多年后回头翻看全是美好回忆</text>
      </view>
    </view>

    <!-- 时间线 -->
    <view class="diary__list">
      <view v-if="diaryStore.sortedEntries.length" class="timeline">
        <view v-for="entry in diaryStore.sortedEntries" :key="entry.id" class="timeline__item">
          <view class="timeline__line">
            <view class="timeline__dot" />
          </view>
          <view class="timeline__card" @click="openEdit(entry)" @longpress="removeEntry(entry)">
            <view class="timeline__card-header">
              <text class="timeline__mood">{{ moodIcon(entry) }}</text>
              <view class="timeline__card-info">
                <text v-if="entry.title" class="timeline__title">{{ entry.title }}</text>
                <text v-else class="timeline__title">无标题</text>
                <text class="timeline__date">
                  {{ entry.date }}<text v-if="entry.catName"> · 🐱 {{ entry.catName }}</text>
                </text>
              </view>
            </view>
            <text class="timeline__content">{{ entry.content }}</text>
            <view v-if="entry.images && entry.images.length" class="timeline__images">
              <image
                v-for="(img, i) in entry.images"
                :key="i"
                class="timeline__image"
                :src="img"
                mode="aspectFill"
                @click.stop="previewImages(entry.images!, img)"
              />
            </view>
          </view>
        </view>
      </view>
      <Empty v-else icon="📖" text="还没有日记，记录第一篇吧" />
    </view>

    <!-- 添加按钮 -->
    <view class="diary__footer">
      <view class="btn-primary diary__add-btn" @click="openAdd">✏️ 写日记</view>
    </view>

    <!-- 表单弹层 -->
    <view v-if="showForm" class="mask" @click="closeForm">
      <view class="form" @click.stop>
        <view class="form__header">
          <text class="form__title">{{ editingId ? '编辑日记' : '写日记' }}</text>
          <text class="form__close" @click="closeForm">✕</text>
        </view>

        <view class="form__body">
          <view class="form__field">
            <text class="form__label">日期</text>
            <picker mode="date" :value="form.date" @change="pickDate($event.detail.value)">
              <view class="form__picker">{{ form.date }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">标题（选填）</text>
            <input
              v-model="form.title"
              class="form__input"
              placeholder="如：第一次剪指甲"
              placeholder-class="form__placeholder"
            />
          </view>

          <view class="form__field">
            <text class="form__label">猫咪名字（选填）</text>
            <CatNamePicker v-model="form.catName" />
          </view>

          <view class="form__field">
            <text class="form__label">内容</text>
            <textarea
              v-model="form.content"
              class="form__textarea"
              placeholder="记录今天和猫主子的故事…"
              placeholder-class="form__placeholder"
              :maxlength="500"
            />
          </view>

          <view class="form__field">
            <text class="form__label">
              配图（选填，最多 {{ MAX_DIARY_IMAGES }} 张）
            </text>
            <view class="img-picker">
              <view v-for="(img, i) in formImages" :key="i" class="img-picker__item">
                <image class="img-picker__image" :src="img" mode="aspectFill" />
                <view class="img-picker__del" @click="removeFormImage(i)">✕</view>
              </view>
              <view
                v-if="formImages.length < MAX_DIARY_IMAGES"
                class="img-picker__add"
                @click="pickImages"
              >
                <text class="img-picker__add-icon">+</text>
                <text class="img-picker__add-text">添加图片</text>
              </view>
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">心情</text>
            <view class="form__seg">
              <view
                v-for="opt in moodOptions"
                :key="opt.value"
                class="form__seg-item"
                :class="{ 'form__seg-item--active': form.mood === opt.value }"
                @click="form.mood = opt.value as 'happy' | 'normal' | 'sick'"
              >
                {{ opt.label }}
              </view>
            </view>
          </view>
        </view>

        <view class="form__footer">
          <view class="btn-ghost form__btn" @click="closeForm">取消</view>
          <view class="btn-primary form__btn" @click="submitForm">保存</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.diary {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__header {
    padding: $spacing-md $spacing-lg;
  }

  &__tip {
    background: linear-gradient(135deg, $accent-cream, #fff);
    border-radius: $radius-lg;
    padding: $spacing-md $spacing-lg;
  }

  &__tip-text {
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
  }

  &__list {
    padding: $spacing-sm $spacing-lg;
  }

  &__footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: $spacing-sm $spacing-lg calc(#{$spacing-sm} + env(safe-area-inset-bottom));
    background: linear-gradient(transparent, $bg-color 30%);
  }

  &__add-btn {
    width: 100%;
  }
}

.timeline {
  &__item {
    display: flex;
    gap: $spacing-md;
  }

  &__line {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 12rpx;
  }

  &__dot {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background: $primary;
    box-shadow: 0 0 0 6rpx rgba(255, 159, 107, 0.15);
    flex-shrink: 0;
  }

  &__item:not(:last-child) &__line::after {
    content: '';
    flex: 1;
    width: 2rpx;
    background: $divider;
    margin-top: 8rpx;
  }

  &__card {
    flex: 1;
    background: $bg-card;
    border-radius: $radius-lg;
    box-shadow: $shadow-card;
    padding: $spacing-md;
    margin-bottom: $spacing-md;
  }

  &__card-header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-sm;
  }

  &__mood {
    font-size: 40rpx;
  }

  &__card-info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__date {
    display: block;
    margin-top: 4rpx;
    font-size: $font-sm;
    color: $text-muted;
  }

  &__content {
    display: block;
    font-size: $font-subtitle;
    color: $text-secondary;
    line-height: 1.7;
  }

  &__images {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-top: $spacing-sm;
  }

  &__image {
    width: 160rpx;
    height: 160rpx;
    border-radius: $radius-sm;
    background: $divider;
  }
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(74, 63, 53, 0.4);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.form {
  width: 100%;
  background: $bg-color;
  border-radius: $radius-xl $radius-xl 0 0;
  padding: $spacing-lg;
  padding-bottom: calc(#{$spacing-lg} + env(safe-area-inset-bottom));
  max-height: 85vh;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-lg;
  }

  &__title {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__close {
    font-size: 36rpx;
    color: $text-muted;
    padding: $spacing-xs;
  }

  &__field {
    margin-bottom: $spacing-md;
  }

  &__label {
    display: block;
    font-size: $font-sm;
    color: $text-secondary;
    margin-bottom: $spacing-xs;
  }

  &__input {
    height: 80rpx;
    background: $bg-card;
    border-radius: $radius-md;
    padding: 0 $spacing-md;
    font-size: $font-subtitle;
    color: $text-primary;
  }

  &__textarea {
    width: 100%;
    height: 200rpx;
    background: $bg-card;
    border-radius: $radius-md;
    padding: $spacing-md;
    font-size: $font-subtitle;
    color: $text-primary;
    box-sizing: border-box;
  }

  &__placeholder {
    color: $text-muted;
  }

  &__picker {
    display: flex;
    align-items: center;
    height: 80rpx;
    background: $bg-card;
    border-radius: $radius-md;
    padding: 0 $spacing-md;
    font-size: $font-subtitle;
    color: $text-primary;
  }

  &__seg {
    display: flex;
    gap: $spacing-sm;
  }

  &__seg-item {
    flex: 1;
    height: 76rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $radius-md;
    background: $bg-card;
    color: $text-secondary;
    font-size: $font-sm;

    &--active {
      background: linear-gradient(135deg, $primary-light, $primary);
      color: #ffffff;
      font-weight: $font-weight-medium;
    }
  }

  &__footer {
    display: flex;
    gap: $spacing-md;
  }

  &__btn {
    flex: 1;
  }
}

.img-picker {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;

  &__item {
    position: relative;
    width: 160rpx;
    height: 160rpx;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: $radius-sm;
    background: $divider;
  }

  &__del {
    position: absolute;
    top: -12rpx;
    right: -12rpx;
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    background: rgba(74, 63, 53, 0.6);
    color: #ffffff;
    font-size: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__add {
    width: 160rpx;
    height: 160rpx;
    border-radius: $radius-sm;
    border: 2rpx dashed $divider;
    background: $bg-card;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6rpx;
  }

  &__add-icon {
    font-size: 48rpx;
    color: $text-muted;
    line-height: 1;
  }

  &__add-text {
    font-size: 22rpx;
    color: $text-muted;
  }
}
</style>
