<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useWeightStore } from '@/stores/weight'
import { useProfileStore } from '@/stores/profile'
import { catBreeds } from '@/data/cat-breeds'
import type { WeightRecord } from '@/data/types'
import { today, daysBetween } from '@/utils/date'

const weightStore = useWeightStore()
const profileStore = useProfileStore()

const currentDate = ref(today())
const showForm = ref(false)
const editingId = ref('')

const form = ref({
  catName: '',
  weight: '',
  date: today(),
  note: ''
})

/** 当前选中的猫（空串 = 未指定/全部） */
const selectedCat = ref('')

onShow(() => {
  currentDate.value = today()
  // 默认选中第一只档案猫
  if (!selectedCat.value && profileStore.sortedProfiles.length) {
    selectedCat.value = profileStore.sortedProfiles[0].name
  }
})

/** 选猫 chips：档案猫 + 未指定 */
const catChips = computed(() => [
  ...profileStore.sortedProfiles.map((p) => ({ name: p.name, emoji: p.emoji })),
  { name: '', emoji: '🐾' }
])

function selectCat(name: string) {
  selectedCat.value = name
}

/** 当前猫的完整记录（日期正序） */
const catRecords = computed(() => weightStore.getRecordsByCat(selectedCat.value))

/** 最新一条与上一条 */
const latest = computed(() => catRecords.value[catRecords.value.length - 1] || null)
const previous = computed(() => catRecords.value[catRecords.value.length - 2] || null)

/** 与上次的差值（kg，保留 1 位） */
const delta = computed(() => {
  if (!latest.value || !previous.value) return null
  return Math.round((latest.value.weight - previous.value.weight) * 10) / 10
})

/** 趋势图：最近 10 条，柱高按 min-max 归一化到 40-200rpx */
const chartPoints = computed(() => {
  const data = catRecords.value.slice(-10)
  if (!data.length) return []
  const weights = data.map((r) => r.weight)
  const min = Math.min(...weights)
  const max = Math.max(...weights)
  const span = max - min
  return data.map((r) => ({
    weight: r.weight,
    label: r.date.slice(5),
    height: span === 0 ? 140 : Math.round(40 + ((r.weight - min) / span) * 160)
  }))
})

/** 解析品种参考体重区间，如 "4-8kg" → { min: 4, max: 8 } */
function parseBreedRange(breedId?: number): { min: number; max: number; breedName: string } | null {
  if (breedId === undefined) return null
  const breed = catBreeds.find((b) => b.id === breedId)
  if (!breed) return null
  const m = breed.weight.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/)
  if (!m) return null
  return { min: Number(m[1]), max: Number(m[2]), breedName: breed.name }
}

/** 当前猫是否处于幼猫生长期（<12 个月） */
const isKitten = computed(() => {
  const profile = selectedCat.value ? profileStore.getByName(selectedCat.value) : undefined
  if (!profile?.birthday) return false
  const days = daysBetween(profile.birthday, currentDate.value)
  return days >= 0 && days < 365
})

/** 体重评估 */
const assessment = computed(() => {
  const w = latest.value?.weight
  if (w === undefined) return null
  const profile = selectedCat.value ? profileStore.getByName(selectedCat.value) : undefined
  const range = parseBreedRange(profile?.breedId)

  if (isKitten.value) {
    return { status: 'kitten', text: '🍼 幼猫生长期，体重持续增长是正常现象，建议每月记录一次' }
  }
  if (range) {
    if (w < range.min) {
      return { status: 'low', text: `偏轻：低于${range.breedName}参考区间 ${range.min}-${range.max}kg，注意营养摄入，持续下降请就医` }
    }
    if (w > range.max) {
      return { status: 'high', text: `偏重：高于${range.breedName}参考区间 ${range.min}-${range.max}kg，注意控制饮食和增加运动` }
    }
    return { status: 'ok', text: `理想：处于${range.breedName}参考体重区间 ${range.min}-${range.max}kg 内，保持得不错 🎉` }
  }
  // 无品种信息时的通用参考（成年家猫）
  if (w < 2.5) {
    return { status: 'low', text: '偏轻：一般成年猫约 3-6kg，偏瘦请检查饮食与驱虫，必要时就医' }
  }
  if (w > 7) {
    return { status: 'high', text: '偏重：超出一般成年猫 3-6kg 参考，建议控制饮食并咨询兽医（大型猫除外）' }
  }
  return { status: 'ok', text: '在一般成年家猫体重参考范围（3-6kg）内，继续保持 🎉' }
})

/** 列表展示（倒序），附带与上一条的差值 */
const displayRecords = computed(() => {
  const asc = catRecords.value
  return [...asc].reverse().map((r) => {
    const idx = asc.indexOf(r)
    const prev = idx > 0 ? asc[idx - 1] : null
    return {
      record: r,
      delta: prev ? Math.round((r.weight - prev.weight) * 10) / 10 : null
    }
  })
})

function openAdd() {
  editingId.value = ''
  form.value = {
    catName: selectedCat.value,
    weight: '',
    date: currentDate.value,
    note: ''
  }
  showForm.value = true
}

function openEdit(record: WeightRecord) {
  editingId.value = record.id
  form.value = {
    catName: record.catName || '',
    weight: String(record.weight),
    date: record.date,
    note: record.note || ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function pickDate(value: string) {
  form.value.date = value
}

function submitForm() {
  const w = Number(form.value.weight)
  if (!form.value.weight.trim() || !Number.isFinite(w) || w <= 0) {
    uni.showToast({ title: '请填写正确的体重', icon: 'none' })
    return
  }
  if (w > 25) {
    uni.showToast({ title: '体重数值有点离谱，请确认单位是 kg', icon: 'none' })
    return
  }
  const data = {
    weight: Math.round(w * 100) / 100,
    date: form.value.date,
    catName: form.value.catName.trim() || undefined,
    note: form.value.note.trim() || undefined
  }
  if (editingId.value) {
    weightStore.updateRecord(editingId.value, data)
    uni.showToast({ title: '已更新', icon: 'success' })
  } else {
    weightStore.addRecord(data)
    uni.showToast({ title: '已记录', icon: 'success' })
  }
  // 记录后跟随选中当前猫
  selectedCat.value = data.catName || ''
  closeForm()
}

function removeRecord(record: WeightRecord) {
  uni.showModal({
    title: '删除记录',
    content: `确定删除 ${record.date} 的体重记录吗？`,
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (res.confirm) {
        weightStore.removeRecord(record.id)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}

function deltaText(d: number | null): string {
  if (d === null || d === 0) return ''
  return d > 0 ? `▲ +${d}` : `▼ ${d}`
}
</script>

<template>
  <view class="wt">
    <!-- 选猫 -->
    <view class="wt__cats">
      <view
        v-for="chip in catChips"
        :key="chip.name || 'none'"
        class="wt__cat-chip"
        :class="{ 'wt__cat-chip--active': selectedCat === chip.name }"
        @click="selectCat(chip.name)"
      >
        {{ chip.emoji }} {{ chip.name || '未指定' }}
      </view>
    </view>

    <!-- 当前体重 -->
    <view class="wt__hero">
      <template v-if="latest">
        <text class="wt__hero-label">
          {{ latest.date }}{{ latest.catName ? ` · ${latest.catName}` : '' }}
        </text>
        <view class="wt__hero-value">
          <text>{{ latest.weight }}</text>
          <text class="wt__hero-unit">kg</text>
          <text
            v-if="delta !== null && delta !== 0"
            class="wt__hero-delta"
            :class="delta > 0 ? 'wt__hero-delta--up' : 'wt__hero-delta--down'"
          >{{ deltaText(delta) }} kg</text>
        </view>
        <view v-if="assessment" class="wt__assessment" :class="`wt__assessment--${assessment.status}`">
          <text class="wt__assessment-text">{{ assessment.text }}</text>
        </view>
      </template>
      <view v-else class="wt__hero-empty">
        <text class="wt__hero-empty-icon">⚖️</text>
        <text class="wt__hero-empty-text">还没有体重记录，点击下方按钮开始记录</text>
      </view>
    </view>

    <!-- 趋势图 -->
    <view v-if="chartPoints.length > 1" class="wt__section">
      <text class="wt__section-title">📈 体重趋势（最近 {{ chartPoints.length }} 次）</text>
      <view class="wt__card">
        <view class="chart">
          <view v-for="(pt, i) in chartPoints" :key="i" class="chart__col">
            <text class="chart__value">{{ pt.weight }}</text>
            <view class="chart__bar" :style="{ height: `${pt.height}rpx` }" />
            <text class="chart__label">{{ pt.label }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 记录列表 -->
    <view class="wt__section">
      <text class="wt__section-title">📋 历史记录</text>
      <view v-if="displayRecords.length" class="wt__card">
        <view
          v-for="{ record, delta: d } in displayRecords"
          :key="record.id"
          class="wt-row"
          @click="openEdit(record)"
          @longpress="removeRecord(record)"
        >
          <view class="wt-row__left">
            <text class="wt-row__date">{{ record.date }}</text>
            <text v-if="record.note" class="wt-row__note">{{ record.note }}</text>
          </view>
          <view class="wt-row__right">
            <text class="wt-row__weight">{{ record.weight }} kg</text>
            <text
              v-if="deltaText(d)"
              class="wt-row__delta"
              :class="(d || 0) > 0 ? 'wt-row__delta--up' : 'wt-row__delta--down'"
            >{{ deltaText(d) }}</text>
          </view>
        </view>
        <view class="wt__hint">
          <text class="wt__hint-text">点击记录编辑 · 长按删除</text>
        </view>
      </view>
      <view v-else class="wt__card">
        <Empty icon="⚖️" text="这只猫还没有体重记录" />
      </view>
    </view>

    <!-- 添加按钮 -->
    <view class="wt__footer">
      <view class="btn-primary wt__add-btn" @click="openAdd">＋ 记录体重</view>
    </view>

    <!-- 表单弹层 -->
    <view v-if="showForm" class="mask" @click="closeForm">
      <view class="form" @click.stop>
        <view class="form__header">
          <text class="form__title">{{ editingId ? '编辑记录' : '记录体重' }}</text>
          <text class="form__close" @click="closeForm">✕</text>
        </view>

        <view class="form__body">
          <view class="form__field">
            <text class="form__label">猫咪名字</text>
            <CatNamePicker v-model="form.catName" />
          </view>

          <view class="form__field">
            <text class="form__label">体重（kg）*</text>
            <input
              v-model="form.weight"
              class="form__input"
              type="digit"
              placeholder="如：4.2"
              placeholder-class="form__placeholder"
            />
          </view>

          <view class="form__field">
            <text class="form__label">日期</text>
            <picker mode="date" :value="form.date" :end="currentDate" @change="pickDate($event.detail.value)">
              <view class="form__picker">{{ form.date }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">备注</text>
            <input
              v-model="form.note"
              class="form__input"
              placeholder="选填，如：换粮后 / 驱虫当天"
              placeholder-class="form__placeholder"
            />
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
.wt {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));

  &__cats {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-lg 0;
  }

  &__cat-chip {
    font-size: $font-sm;
    color: $text-secondary;
    background: $bg-card;
    border: 2rpx solid transparent;
    border-radius: 28rpx;
    padding: 8rpx 24rpx;
    box-shadow: $shadow-card;

    &--active {
      color: $primary-dark;
      border-color: $primary;
      background: rgba(255, 159, 107, 0.12);
      font-weight: $font-weight-medium;
    }
  }

  &__hero {
    margin: $spacing-md $spacing-lg 0;
    background: linear-gradient(160deg, $primary-light, $accent-cream);
    border-radius: $radius-lg;
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__hero-label {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__hero-value {
    display: flex;
    align-items: baseline;
    gap: 8rpx;
    font-size: 80rpx;
    font-weight: $font-weight-bold;
    color: $primary-dark;
    line-height: 1.3;
  }

  &__hero-unit {
    font-size: $font-md;
    font-weight: $font-weight-normal;
    color: $text-secondary;
  }

  &__hero-delta {
    font-size: $font-sm;
    font-weight: $font-weight-medium;

    &--up {
      color: #d9604a;
    }

    &--down {
      color: #4a9d7e;
    }
  }

  &__assessment {
    margin-top: $spacing-sm;
    border-radius: $radius-md;
    padding: $spacing-sm $spacing-md;
    background: rgba(255, 255, 255, 0.7);

    &--ok {
      border-left: 6rpx solid $accent-mint;
    }

    &--low,
    &--high {
      border-left: 6rpx solid #e5a36b;
    }

    &--kitten {
      border-left: 6rpx solid $accent-purple;
    }
  }

  &__assessment-text {
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.6;
  }

  &__hero-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md 0;
  }

  &__hero-empty-icon {
    font-size: 72rpx;
  }

  &__hero-empty-text {
    font-size: $font-sm;
    color: $text-secondary;
  }

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
    padding: $spacing-md $spacing-lg;
  }

  &__hint {
    display: flex;
    justify-content: center;
    padding-top: $spacing-sm;
    border-top: 1rpx solid $divider;
    margin-top: $spacing-xs;
  }

  &__hint-text {
    font-size: 22rpx;
    color: $text-muted;
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

.chart {
  display: flex;
  align-items: flex-end;
  gap: $spacing-sm;
  height: 280rpx;
  padding-top: $spacing-sm;

  &__col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
  }

  &__value {
    font-size: 20rpx;
    color: $text-secondary;
    margin-bottom: 4rpx;
  }

  &__bar {
    width: 100%;
    max-width: 56rpx;
    background: linear-gradient(180deg, $primary, $primary-light);
    border-radius: 8rpx 8rpx 0 0;
  }

  &__label {
    font-size: 20rpx;
    color: $text-muted;
    margin-top: 6rpx;
    white-space: nowrap;
  }
}

.wt-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md 0;

  & + & {
    border-top: 1rpx solid $divider;
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
    min-width: 0;
  }

  &__date {
    font-size: $font-subtitle;
    color: $text-primary;
  }

  &__note {
    font-size: $font-sm;
    color: $text-muted;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__right {
    display: flex;
    align-items: baseline;
    gap: $spacing-sm;
    flex-shrink: 0;
  }

  &__weight {
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__delta {
    font-size: $font-sm;

    &--up {
      color: #d9604a;
    }

    &--down {
      color: #4a9d7e;
    }
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

  &__body {
    margin-bottom: $spacing-lg;
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

  &__footer {
    display: flex;
    gap: $spacing-md;
  }

  &__btn {
    flex: 1;
  }
}
</style>
