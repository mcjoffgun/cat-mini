<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import Empty from '@/components/empty/Empty.vue'
import { useVaccineStore } from '@/stores/vaccine'
import type { VaccineRecord } from '@/data/types'
import { VACCINE_TYPE_LABELS } from '@/data/types'
import { daysBetween, today, formatDate } from '@/utils/date'

const vaccineStore = useVaccineStore()

const currentDate = ref(today())
const showForm = ref(false)
const editingId = ref('')

// 表单
const form = ref({
  name: '',
  type: 'vaccine' as 'vaccine' | 'deworm',
  lastDate: today(),
  nextDate: today(),
  note: '',
  catName: ''
})

const typeOptions = [
  { value: 'vaccine', label: '疫苗' },
  { value: 'deworm', label: '驱虫' }
]

// 按"最近到期"排序
const sortedRecords = computed(() =>
  [...vaccineStore.records].sort((a, b) => a.nextDate.localeCompare(b.nextDate))
)

onShow(() => {
  currentDate.value = today()
})

/** 计算倒计时状态 */
function countdownInfo(record: VaccineRecord): { text: string; cls: string } {
  const diff = daysBetween(record.nextDate, currentDate.value)
  if (diff < 0) {
    return { text: `已过期 ${-diff} 天`, cls: 'overdue' }
  }
  if (diff === 0) {
    return { text: '今天到期', cls: 'due' }
  }
  if (diff <= 7) {
    return { text: `还有 ${diff} 天`, cls: 'soon' }
  }
  return { text: `还有 ${diff} 天`, cls: 'normal' }
}

function openAdd() {
  editingId.value = ''
  form.value = {
    name: '',
    type: 'vaccine',
    lastDate: today(),
    nextDate: today(),
    note: '',
    catName: ''
  }
  showForm.value = true
}

function openEdit(record: VaccineRecord) {
  editingId.value = record.id
  form.value = {
    name: record.name,
    type: record.type,
    lastDate: record.lastDate,
    nextDate: record.nextDate,
    note: record.note || '',
    catName: record.catName || ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function submitForm() {
  if (!form.value.name.trim()) {
    uni.showToast({ title: '请填写名称', icon: 'none' })
    return
  }
  if (form.value.nextDate < form.value.lastDate) {
    uni.showToast({ title: '下次日期不能早于上次日期', icon: 'none' })
    return
  }

  const data = {
    name: form.value.name.trim(),
    type: form.value.type,
    lastDate: form.value.lastDate,
    nextDate: form.value.nextDate,
    note: form.value.note.trim() || undefined,
    catName: form.value.catName.trim() || undefined
  }

  if (editingId.value) {
    vaccineStore.updateRecord(editingId.value, data)
    uni.showToast({ title: '已更新', icon: 'success' })
  } else {
    vaccineStore.addRecord(data)
    uni.showToast({ title: '已添加', icon: 'success' })
  }
  closeForm()
}

function removeRecord(id: string) {
  uni.showModal({
    title: '删除提醒',
    content: '确定要删除这条记录吗？',
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (res.confirm) {
        vaccineStore.removeRecord(id)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}

function pickDate(field: 'lastDate' | 'nextDate', value: string) {
  form.value[field] = value
}

onLoad(() => {
  // 预留：后续可加通知订阅
})
</script>

<template>
  <view class="vaccine">
    <!-- 顶部提示 -->
    <view class="vaccine__header">
      <view class="vaccine__tip">
        <text class="vaccine__tip-icon">💉</text>
        <text class="vaccine__tip-text">按时接种疫苗、定期驱虫，是猫咪健康的重要保障</text>
      </view>
    </view>

    <!-- 列表 -->
    <view class="vaccine__list">
      <view v-if="sortedRecords.length">
        <view
          v-for="record in sortedRecords"
          :key="record.id"
          class="vaccine-item"
          @click="openEdit(record)"
          @longpress="removeRecord(record.id)"
        >
          <view class="vaccine-item__left">
            <view class="vaccine-item__badge" :class="`vaccine-item__badge--${record.type}`">
              {{ record.type === 'vaccine' ? '💉' : '🪱' }}
            </view>
            <view class="vaccine-item__info">
              <view class="vaccine-item__title-row">
                <text class="vaccine-item__name">{{ record.name }}</text>
                <text class="vaccine-item__type">{{ VACCINE_TYPE_LABELS[record.type] }}</text>
              </view>
              <text class="vaccine-item__date">上次：{{ record.lastDate }} · 下次：{{ record.nextDate }}</text>
              <text v-if="record.catName" class="vaccine-item__cat">🐱 {{ record.catName }}</text>
            </view>
          </view>
          <view class="vaccine-item__countdown" :class="`vaccine-item__countdown--${countdownInfo(record).cls}`">
            {{ countdownInfo(record).text }}
          </view>
        </view>
      </view>
      <Empty v-else icon="💉" text="还没有提醒记录，点击下方按钮添加" />
    </view>

    <!-- 添加按钮 -->
    <view class="vaccine__footer">
      <view class="btn-primary vaccine__add-btn" @click="openAdd">
        ＋ 添加疫苗 / 驱虫提醒
      </view>
    </view>

    <!-- 表单弹层 -->
    <view v-if="showForm" class="mask" @click="closeForm">
      <view class="form" @click.stop>
        <view class="form__header">
          <text class="form__title">{{ editingId ? '编辑提醒' : '添加提醒' }}</text>
          <text class="form__close" @click="closeForm">✕</text>
        </view>

        <view class="form__body">
          <view class="form__field">
            <text class="form__label">名称</text>
            <input
              v-model="form.name"
              class="form__input"
              placeholder="如：猫三联第二针 / 体内驱虫"
              placeholder-class="form__placeholder"
            />
          </view>

          <view class="form__field">
            <text class="form__label">类型</text>
            <view class="form__seg">
              <view
                v-for="opt in typeOptions"
                :key="opt.value"
                class="form__seg-item"
                :class="{ 'form__seg-item--active': form.type === opt.value }"
                @click="form.type = opt.value as 'vaccine' | 'deworm'"
              >
                {{ opt.label }}
              </view>
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">上次日期</text>
            <picker mode="date" :value="form.lastDate" @change="pickDate('lastDate', $event.detail.value)">
              <view class="form__picker">{{ form.lastDate }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">下次日期</text>
            <picker mode="date" :value="form.nextDate" @change="pickDate('nextDate', $event.detail.value)">
              <view class="form__picker">{{ form.nextDate }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">猫咪名字</text>
            <input
              v-model="form.catName"
              class="form__input"
              placeholder="选填，如：咪咪"
              placeholder-class="form__placeholder"
            />
          </view>

          <view class="form__field">
            <text class="form__label">备注</text>
            <input
              v-model="form.note"
              class="form__input"
              placeholder="选填"
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
.vaccine {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__header {
    padding: $spacing-md $spacing-lg;
  }

  &__tip {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    background: rgba(201, 184, 232, 0.15);
    border-radius: $radius-md;
    padding: $spacing-sm $spacing-md;
  }

  &__tip-icon {
    font-size: 36rpx;
  }

  &__tip-text {
    flex: 1;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.6;
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

.vaccine-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md;
  margin-bottom: $spacing-md;

  &__left {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    flex: 1;
    min-width: 0;
  }

  &__badge {
    width: 84rpx;
    height: 84rpx;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    flex-shrink: 0;

    &--vaccine {
      background: rgba(143, 215, 199, 0.25);
    }

    &--deworm {
      background: rgba(201, 184, 232, 0.25);
    }
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

  &__name {
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__type {
    flex-shrink: 0;
    font-size: 20rpx;
    color: $text-secondary;
    background: $accent-cream;
    border-radius: $radius-sm;
    padding: 2rpx 12rpx;
  }

  &__date {
    display: block;
    margin-top: 6rpx;
    font-size: $font-sm;
    color: $text-muted;
  }

  &__cat {
    display: block;
    margin-top: 4rpx;
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__countdown {
    flex-shrink: 0;
    font-size: $font-sm;
    font-weight: $font-weight-medium;
    margin-left: $spacing-sm;

    &--normal {
      color: $text-secondary;
    }

    &--soon {
      color: $primary-dark;
    }

    &--due {
      color: $accent-purple;
    }

    &--overdue {
      color: #d9604a;
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
    font-size: $font-subtitle;

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
