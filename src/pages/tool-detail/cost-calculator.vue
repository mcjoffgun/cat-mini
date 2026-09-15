<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import {
  COST_PRESETS,
  calcCost,
  formatMoney,
  fromFormStrings,
  toFormStrings
} from '@/utils/cost'
import type { CostField } from '@/utils/cost'

// 默认按「标准」预设填充
const DEFAULT_PRESET_INDEX = 1

const form = ref<Record<CostField, string>>(
  toFormStrings(COST_PRESETS[DEFAULT_PRESET_INDEX].values)
)

const result = computed(() => calcCost(fromFormStrings(form.value)))

/** 表单字段分组配置 */
const fieldGroups: Array<{
  title: string
  hint: string
  unit: string
  fields: Array<{ key: CostField; icon: string; label: string; placeholder: string }>
}> = [
  {
    title: '💰 一次性投入',
    hint: '接猫回家时的一次性花费',
    unit: '元',
    fields: [
      { key: 'catPrice', icon: '🐱', label: '购猫/领养费', placeholder: '领养填 0' },
      { key: 'supplies', icon: '🧺', label: '初始用品', placeholder: '猫砂盆/爬架/食碗/航空箱等' }
    ]
  },
  {
    title: '📅 每月开销',
    hint: '每个月固定要花的部分',
    unit: '元/月',
    fields: [
      { key: 'food', icon: '🍚', label: '猫粮', placeholder: '建议 100 - 600' },
      { key: 'litter', icon: '🏖️', label: '猫砂', placeholder: '建议 30 - 120' },
      { key: 'snacks', icon: '🍪', label: '零食罐头', placeholder: '选填' },
      { key: 'misc', icon: '🧶', label: '玩具杂项', placeholder: '选填' }
    ]
  },
  {
    title: '🗓️ 每年开销',
    hint: '填一年的金额，自动折算到每月',
    unit: '元/年',
    fields: [
      { key: 'medical', icon: '💉', label: '疫苗驱虫', placeholder: '建议 300 - 500' },
      { key: 'reserve', icon: '🏥', label: '医疗储备金', placeholder: '生病应急，建议预留' }
    ]
  }
]

function applyPreset(index: number) {
  const preset = COST_PRESETS[index]
  if (!preset) return
  form.value = toFormStrings(preset.values)
}

function resetForm() {
  applyPreset(DEFAULT_PRESET_INDEX)
  uni.showToast({ title: '已恢复默认', icon: 'none' })
}

onShareAppMessage(() => ({
  title: `我养猫每月约花 ¥${formatMoney(result.value.monthly)}，来算算你的`,
  path: '/pages/tool-detail/cost-calculator'
}))
</script>

<template>
  <view class="cost">
    <!-- 结果总览 -->
    <view class="cost__hero">
      <text class="cost__hero-label">我的养猫月均成本</text>
      <view class="cost__hero-value">
        <text class="cost__hero-symbol">¥</text>
        <text>{{ formatMoney(result.monthly) }}</text>
        <text class="cost__hero-unit">/月</text>
      </view>
      <view class="cost__hero-level">{{ result.levelName }}</view>
      <view class="cost__stats">
        <view class="cost__stat">
          <text class="cost__stat-value">¥{{ formatMoney(result.initial) }}</text>
          <text class="cost__stat-label">初期投入</text>
        </view>
        <view class="cost__stat">
          <text class="cost__stat-value">¥{{ formatMoney(result.yearlyFirst) }}</text>
          <text class="cost__stat-label">首年总成本</text>
        </view>
        <view class="cost__stat">
          <text class="cost__stat-value">¥{{ result.daily }}</text>
          <text class="cost__stat-label">日均</text>
        </view>
      </view>
    </view>

    <!-- 消费水平预设 -->
    <view class="cost__section">
      <view class="cost__section-header">
        <text class="cost__section-title">⚡ 快速填充</text>
        <text class="cost__section-action" @click="resetForm">恢复默认</text>
      </view>
      <view class="preset-row">
        <view
          v-for="(preset, index) in COST_PRESETS"
          :key="preset.name"
          class="preset-row__item"
          @click="applyPreset(index)"
        >
          <text class="preset-row__icon">{{ preset.icon }}</text>
          <text class="preset-row__name">{{ preset.name }}</text>
        </view>
      </view>
    </view>

    <!-- 表单分组 -->
    <view v-for="group in fieldGroups" :key="group.title" class="cost__section">
      <view class="cost__section-header">
        <text class="cost__section-title">{{ group.title }}</text>
        <text class="cost__section-hint">{{ group.hint }}</text>
      </view>
      <view class="cost__card">
        <view
          v-for="field in group.fields"
          :key="field.key"
          class="cost-field"
        >
          <view class="cost-field__label">
            <text class="cost-field__icon">{{ field.icon }}</text>
            <text class="cost-field__name">{{ field.label }}</text>
          </view>
          <view class="cost-field__input-wrap">
            <input
              v-model="form[field.key]"
              class="cost-field__input"
              type="digit"
              :placeholder="field.placeholder"
              placeholder-class="cost-field__placeholder"
            />
            <text class="cost-field__unit">{{ group.unit }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 成本构成 -->
    <view class="cost__section">
      <view class="cost__section-header">
        <text class="cost__section-title">📊 每月成本构成</text>
      </view>
      <view class="cost__card">
        <view v-if="result.breakdown.length">
          <view
            v-for="item in result.breakdown"
            :key="item.key"
            class="bar-row"
          >
            <view class="bar-row__head">
              <text class="bar-row__label">{{ item.label }}</text>
              <text class="bar-row__value">¥{{ formatMoney(Math.round(item.monthly)) }} · {{ item.percent }}%</text>
            </view>
            <view class="bar-row__track">
              <view class="bar-row__fill" :style="{ width: `${Math.max(item.percent, 2)}%` }" />
            </view>
          </view>
        </view>
        <view v-else class="cost__empty">
          <text class="cost__empty-text">填写上面的开销后，这里会显示成本构成</text>
        </view>
      </view>
    </view>

    <view class="cost__tip">
      <text class="cost__tip-text">💡 结果仅供参考：不同城市、猫咪年龄和健康状况下花费差异较大，医疗储备金建议至少预留 500 元/年应对突发状况。</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.cost {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__hero {
    background: linear-gradient(160deg, $primary-light, $accent-cream);
    padding: $spacing-xl $spacing-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__hero-label {
    font-size: $font-subtitle;
    color: $text-secondary;
  }

  &__hero-value {
    display: flex;
    align-items: baseline;
    gap: 8rpx;
    font-size: 88rpx;
    font-weight: $font-weight-bold;
    color: $primary-dark;
    line-height: 1.4;
  }

  &__hero-symbol {
    font-size: 44rpx;
  }

  &__hero-unit {
    font-size: $font-md;
    font-weight: $font-weight-normal;
    color: $text-secondary;
  }

  &__hero-level {
    display: inline-block;
    margin-top: $spacing-sm;
    font-size: $font-sm;
    color: #ffffff;
    background: $primary;
    border-radius: $radius-sm;
    padding: 6rpx 24rpx;
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: $spacing-lg;
    background: rgba(255, 255, 255, 0.6);
    border-radius: $radius-md;
    padding: $spacing-md 0;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rpx;
  }

  &__stat-value {
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__stat-label {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__section {
    padding: 0 $spacing-lg;
    margin-top: $spacing-lg;
  }

  &__section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: $spacing-md;
  }

  &__section-title {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__section-hint {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__section-action {
    font-size: $font-sm;
    color: $primary-dark;
  }

  &__card {
    background: $bg-card;
    border-radius: $radius-lg;
    box-shadow: $shadow-card;
    padding: $spacing-md $spacing-lg;
  }

  &__empty {
    padding: $spacing-lg 0;
    display: flex;
    justify-content: center;
  }

  &__empty-text {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__tip {
    margin: $spacing-lg;
  }

  &__tip-text {
    font-size: $font-sm;
    color: $text-muted;
    line-height: 1.7;
  }
}

.preset-row {
  display: flex;
  gap: $spacing-md;

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rpx;
    background: $bg-card;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
    padding: $spacing-md 0;

    &:active {
      background: $accent-cream;
    }
  }

  &__icon {
    font-size: 44rpx;
  }

  &__name {
    font-size: $font-sm;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }
}

.cost-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  padding: $spacing-md 0;

  & + & {
    border-top: 1rpx solid $divider;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    flex-shrink: 0;
  }

  &__icon {
    font-size: 36rpx;
  }

  &__name {
    font-size: $font-md;
    color: $text-primary;
  }

  &__input-wrap {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    flex: 1;
    min-width: 0;
    justify-content: flex-end;
  }

  &__input {
    flex: 1;
    max-width: 220rpx;
    height: 64rpx;
    background: $accent-cream;
    border-radius: $radius-sm;
    padding: 0 $spacing-sm;
    font-size: $font-md;
    color: $text-primary;
    text-align: right;
  }

  &__placeholder {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__unit {
    font-size: $font-sm;
    color: $text-muted;
    flex-shrink: 0;
  }
}

.bar-row {
  padding: $spacing-sm 0;

  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: $spacing-xs;
  }

  &__label {
    font-size: $font-sm;
    color: $text-primary;
  }

  &__value {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__track {
    height: 16rpx;
    background: $accent-cream;
    border-radius: 8rpx;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, $primary-light, $primary);
    border-radius: 8rpx;
  }
}
</style>
