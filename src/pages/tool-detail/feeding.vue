<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useFeedingStore } from '@/stores/feeding'
import { FOOD_TYPE_LABELS } from '@/data/types'
import type { FeedingRecord } from '@/data/types'
import { today } from '@/utils/date'

const feedingStore = useFeedingStore()

const currentDate = ref(today())
const selectedDate = ref(currentDate.value)
const showForm = ref(false)
const editingId = ref('')

const form = ref({
  date: today(),
  time: '08:00',
  amount: '',
  foodType: 'catfood' as 'catfood' | 'can' | 'snack' | 'other',
  catName: ''
})

const foodTypeOptions = [
  { value: 'catfood', label: '猫粮' },
  { value: 'can', label: '罐头' },
  { value: 'snack', label: '零食' },
  { value: 'other', label: '其他' }
]

/** 选中日期的记录 */
const recordsOfDate = computed(() =>
  feedingStore
    .getRecordsByDate(selectedDate.value)
    .sort((a, b) => b.time.localeCompare(a.time))
)

/** 今日记录数 */
const todayCount = computed(() => feedingStore.getRecordsByDate(currentDate.value).length)

onShow(() => {
  const nextDate = today()
  if (selectedDate.value === currentDate.value) {
    selectedDate.value = nextDate
  }
  currentDate.value = nextDate
})

function foodIcon(type?: FeedingRecord['foodType']): string {
  return type === 'can' ? '🥫' : type === 'snack' ? '🍪' : type === 'other' ? '🍽️' : '🍚'
}

function openAdd() {
  editingId.value = ''
  form.value = {
    date: selectedDate.value,
    time: currentTime(),
    amount: '',
    foodType: 'catfood',
    catName: ''
  }
  showForm.value = true
}

function openEdit(record: FeedingRecord) {
  editingId.value = record.id
  form.value = {
    date: record.date,
    time: record.time,
    amount: record.amount,
    foodType: record.foodType || 'catfood',
    catName: record.catName || ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function submitForm() {
  if (!form.value.amount.trim()) {
    uni.showToast({ title: '请填写喂食量', icon: 'none' })
    return
  }
  const data = {
    date: form.value.date,
    time: form.value.time,
    amount: form.value.amount.trim(),
    foodType: form.value.foodType,
    catName: form.value.catName.trim() || undefined
  }
  if (editingId.value) {
    feedingStore.updateRecord(editingId.value, data)
    uni.showToast({ title: '已更新', icon: 'success' })
  } else {
    feedingStore.addRecord(data)
    uni.showToast({ title: '已记录', icon: 'success' })
  }
  closeForm()
}

function removeRecord(record: FeedingRecord) {
  uni.showModal({
    title: '删除记录',
    content: '确定要删除这条喂食记录吗？',
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (res.confirm) {
        feedingStore.removeRecord(record.id)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}

function pickDate(value: string) {
  selectedDate.value = value
}

function pickFormDate(value: string) {
  form.value.date = value
}

function pickTime(value: string) {
  form.value.time = value
}

function currentTime(): string {
  const d = new Date()
  return `${`${d.getHours()}`.padStart(2, '0')}:${`${d.getMinutes()}`.padStart(2, '0')}`
}
</script>

<template>
  <view class="feeding">
    <view class="feeding__header">
      <view class="feeding__summary">
        <view class="feeding__summary-icon">🍚</view>
        <view class="feeding__summary-info">
          <text class="feeding__summary-num">{{ todayCount }}</text>
          <text class="feeding__summary-label">今日已喂食次数</text>
        </view>
      </view>
    </view>

    <!-- 日期选择 -->
    <view class="feeding__date-bar">
      <picker mode="date" :value="selectedDate" @change="pickDate($event.detail.value)">
        <view class="feeding__date-picker">
          <text class="feeding__date-text">{{ selectedDate }}</text>
          <text class="feeding__date-arrow">▾</text>
        </view>
      </picker>
    </view>

    <!-- 记录列表 -->
    <view class="feeding__list">
      <view v-if="recordsOfDate.length">
        <view
          v-for="record in recordsOfDate"
          :key="record.id"
          class="feed-item"
          @click="openEdit(record)"
          @longpress="removeRecord(record)"
        >
          <view class="feed-item__icon">{{ foodIcon(record.foodType) }}</view>
          <view class="feed-item__info">
            <view class="feed-item__title-row">
              <text class="feed-item__time">{{ record.time }}</text>
              <text class="feed-item__type">{{ FOOD_TYPE_LABELS[record.foodType || 'catfood'] }}</text>
            </view>
            <text class="feed-item__amount">{{ record.amount }}</text>
            <text v-if="record.catName" class="feed-item__cat">🐱 {{ record.catName }}</text>
          </view>
          <text class="feed-item__arrow">›</text>
        </view>
      </view>
      <Empty v-else icon="🍚" :text="`${selectedDate} 还没有喂食记录`" />
    </view>

    <!-- 添加按钮 -->
    <view class="feeding__footer">
      <view class="btn-primary feeding__add-btn" @click="openAdd">＋ 记录喂食</view>
    </view>

    <!-- 表单弹层 -->
    <view v-if="showForm" class="mask" @click="closeForm">
      <view class="form" @click.stop>
        <view class="form__header">
          <text class="form__title">{{ editingId ? '编辑记录' : '记录喂食' }}</text>
          <text class="form__close" @click="closeForm">✕</text>
        </view>

        <view class="form__body">
          <view class="form__field">
            <text class="form__label">日期</text>
            <picker mode="date" :value="form.date" @change="pickFormDate($event.detail.value)">
              <view class="form__picker">{{ form.date }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">时间</text>
            <picker mode="time" :value="form.time" @change="pickTime($event.detail.value)">
              <view class="form__picker">{{ form.time }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">喂食量</text>
            <input
              v-model="form.amount"
              class="form__input"
              placeholder="如：50g / 1/3罐"
              placeholder-class="form__placeholder"
            />
          </view>

          <view class="form__field">
            <text class="form__label">食物类型</text>
            <view class="form__seg">
              <view
                v-for="opt in foodTypeOptions"
                :key="opt.value"
                class="form__seg-item"
                :class="{ 'form__seg-item--active': form.foodType === opt.value }"
                @click="form.foodType = opt.value as 'catfood' | 'can' | 'snack' | 'other'"
              >
                {{ opt.label }}
              </view>
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">猫咪名字</text>
            <CatNamePicker v-model="form.catName" />
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
.feeding {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__header {
    padding: $spacing-md $spacing-lg;
  }

  &__summary {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    background: linear-gradient(135deg, $primary-light, $accent-cream);
    border-radius: $radius-lg;
    padding: $spacing-lg;
  }

  &__summary-icon {
    font-size: 56rpx;
  }

  &__summary-num {
    font-size: 64rpx;
    font-weight: $font-weight-bold;
    color: $primary-dark;
    line-height: 1;
  }

  &__summary-label {
    display: block;
    margin-top: 6rpx;
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__date-bar {
    padding: 0 $spacing-lg;
    margin-bottom: $spacing-md;
  }

  &__date-picker {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    background: $bg-card;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
    padding: $spacing-sm $spacing-md;
  }

  &__date-text {
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__date-arrow {
    font-size: 24rpx;
    color: $text-muted;
  }

  &__list {
    padding: 0 $spacing-lg;
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

.feed-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md;
  margin-bottom: $spacing-md;

  &__icon {
    width: 84rpx;
    height: 84rpx;
    border-radius: $radius-md;
    background: $accent-cream;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__time {
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__type {
    font-size: 20rpx;
    color: $text-secondary;
    background: $accent-cream;
    border-radius: $radius-sm;
    padding: 2rpx 12rpx;
  }

  &__amount {
    display: block;
    margin-top: 6rpx;
    font-size: $font-md;
    color: $primary-dark;
    font-weight: $font-weight-medium;
  }

  &__cat {
    display: block;
    margin-top: 4rpx;
    font-size: $font-sm;
    color: $text-muted;
  }

  &__arrow {
    font-size: 40rpx;
    color: $text-muted;
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
</style>
