<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import {
  dangerousFoods,
  safeFoods,
  emergencySteps,
  emergencySigns
} from '@/data/dangerous-foods'
import { FOOD_RISK_LABELS } from '@/data/types'
import type { FoodRiskLevel } from '@/data/types'

/** 筛选：all + 三个风险等级 */
const filterOptions = computed(() => [
  { value: 'all' as const, label: '全部', count: dangerousFoods.length },
  ...(Object.keys(FOOD_RISK_LABELS) as FoodRiskLevel[]).map((level) => ({
    value: level,
    label: FOOD_RISK_LABELS[level],
    count: dangerousFoods.filter((f) => f.level === level).length
  }))
])

const activeFilter = ref<'all' | FoodRiskLevel>('all')

const filteredFoods = computed(() =>
  activeFilter.value === 'all'
    ? dangerousFoods
    : dangerousFoods.filter((f) => f.level === activeFilter.value)
)

/** 手风琴：当前展开的条目 id */
const expandedId = ref(0)

function setFilter(value: 'all' | FoodRiskLevel) {
  activeFilter.value = value
  expandedId.value = 0
}

function toggleExpand(id: number) {
  expandedId.value = expandedId.value === id ? 0 : id
}

onShareAppMessage(() => ({
  title: '这些食物千万别喂猫！猫咪危险食物清单',
  path: '/pages/tool-detail/dangerous-foods'
}))
</script>

<template>
  <view class="df">
    <!-- 顶部说明 -->
    <view class="df__intro">
      <text class="df__intro-title">🚫 猫咪危险食物指南</text>
      <text class="df__intro-text">
        共收录 {{ dangerousFoods.length }} 种常见危险食物。误食"剧毒"类请分秒必争立即送医，不要等症状出现。
      </text>
    </view>

    <!-- 等级筛选 -->
    <view class="df__filter">
      <view
        v-for="opt in filterOptions"
        :key="opt.value"
        class="df__filter-item"
        :class="{
          'df__filter-item--active': activeFilter === opt.value,
          [`df__filter-item--${opt.value}`]: activeFilter === opt.value
        }"
        @click="setFilter(opt.value)"
      >
        {{ opt.label }} {{ opt.count }}
      </view>
    </view>

    <!-- 危险食物列表 -->
    <view class="df__list">
      <view
        v-for="food in filteredFoods"
        :key="food.id"
        class="food-card"
        @click="toggleExpand(food.id)"
      >
        <view class="food-card__head">
          <text class="food-card__emoji">{{ food.emoji }}</text>
          <view class="food-card__title-box">
            <text class="food-card__name">{{ food.name }}</text>
            <text class="food-card__found">{{ food.foundIn }}</text>
          </view>
          <text class="food-card__level" :class="`food-card__level--${food.level}`">
            {{ FOOD_RISK_LABELS[food.level] }}
          </text>
        </view>

        <view v-if="expandedId === food.id" class="food-card__body">
          <view class="food-card__block">
            <text class="food-card__block-title">⚠️ 危害与症状</text>
            <text class="food-card__block-text">{{ food.symptoms }}</text>
          </view>
          <view class="food-card__block">
            <text class="food-card__block-title">🚑 怎么办</text>
            <text class="food-card__block-text">{{ food.action }}</text>
          </view>
        </view>
        <text v-else class="food-card__more">点击展开详情 ›</text>
      </view>
    </view>

    <!-- 应急处理 -->
    <view class="df__section">
      <text class="df__section-title">🆘 误食了怎么办？应急四步</text>
      <view class="df__card">
        <view
          v-for="(step, index) in emergencySteps"
          :key="step.title"
          class="step-row"
        >
          <view class="step-row__num">{{ index + 1 }}</view>
          <view class="step-row__body">
            <text class="step-row__title">{{ step.title }}</text>
            <text class="step-row__desc">{{ step.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 急诊信号 -->
    <view class="df__section">
      <text class="df__section-title">🚨 出现以下信号，立刻送急诊</text>
      <view class="df__card df__card--alert">
        <view v-for="sign in emergencySigns" :key="sign" class="sign-row">
          <text class="sign-row__dot">•</text>
          <text class="sign-row__text">{{ sign }}</text>
        </view>
      </view>
    </view>

    <!-- 安全零食 -->
    <view class="df__section">
      <text class="df__section-title">✅ 想给它加点餐？这些才安全</text>
      <view class="safe-grid">
        <view v-for="food in safeFoods" :key="food.id" class="safe-grid__item">
          <view class="safe-grid__head">
            <text class="safe-grid__emoji">{{ food.emoji }}</text>
            <text class="safe-grid__name">{{ food.name }}</text>
          </view>
          <text class="safe-grid__note">{{ food.note }}</text>
        </view>
      </view>
    </view>

    <view class="df__tip">
      <text class="df__tip-text">
        💡 内容参考主流兽医科普共识，仅供参考。个体差异较大，任何误食情况请以兽医的现场诊断为准。
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.df {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__intro {
    background: linear-gradient(160deg, $primary-light, $accent-cream);
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__intro-title {
    font-size: $font-display;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__intro-text {
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
  }

  &__filter {
    display: flex;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-lg;
  }

  &__filter-item {
    flex: 1;
    text-align: center;
    font-size: $font-sm;
    color: $text-secondary;
    background: $bg-card;
    border: 2rpx solid transparent;
    border-radius: $radius-sm;
    padding: 12rpx 0;
    box-shadow: $shadow-card;

    &--active {
      color: #ffffff;
      background: $primary;
    }

    &--deadly {
      background: #e57373;
    }

    &--danger {
      background: $primary;
    }

    &--caution {
      background: $accent-mint;
      color: $text-primary;
    }
  }

  &__list {
    padding: 0 $spacing-lg;
  }

  &__section {
    padding: 0 $spacing-lg;
    margin-top: $spacing-xl;
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

    &--alert {
      border: 2rpx solid #e57373;
      background: #fffafa;
    }
  }

  &__tip {
    margin: $spacing-xl $spacing-lg 0;
  }

  &__tip-text {
    font-size: $font-sm;
    color: $text-muted;
    line-height: 1.7;
  }
}

.food-card {
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md $spacing-lg;
  margin-bottom: $spacing-md;

  &__head {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__emoji {
    font-size: 48rpx;
    flex-shrink: 0;
  }

  &__title-box {
    flex: 1;
    min-width: 0;
  }

  &__name {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__found {
    display: block;
    margin-top: 4rpx;
    font-size: 22rpx;
    color: $text-muted;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__level {
    flex-shrink: 0;
    font-size: 22rpx;
    color: #ffffff;
    border-radius: $radius-sm;
    padding: 4rpx 16rpx;

    &--deadly {
      background: #e57373;
    }

    &--danger {
      background: $primary;
    }

    &--caution {
      background: $accent-mint;
      color: $text-primary;
    }
  }

  &__more {
    display: block;
    margin-top: $spacing-sm;
    font-size: $font-sm;
    color: $text-muted;
  }

  &__body {
    margin-top: $spacing-md;
    border-top: 1rpx solid $divider;
    padding-top: $spacing-md;
  }

  &__block {
    & + & {
      margin-top: $spacing-md;
    }
  }

  &__block-title {
    display: block;
    font-size: $font-sm;
    font-weight: $font-weight-medium;
    color: $text-primary;
    margin-bottom: 6rpx;
  }

  &__block-text {
    display: block;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
  }
}

.step-row {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-sm 0;

  & + & {
    border-top: 1rpx solid $divider;
  }

  &__num {
    width: 44rpx;
    height: 44rpx;
    border-radius: 22rpx;
    background: $primary;
    color: #ffffff;
    font-size: $font-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__title {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__desc {
    display: block;
    margin-top: 4rpx;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
  }
}

.sign-row {
  display: flex;
  gap: $spacing-sm;
  padding: 8rpx 0;

  &__dot {
    color: #e57373;
    font-weight: $font-weight-bold;
    flex-shrink: 0;
  }

  &__text {
    font-size: $font-sm;
    color: $text-primary;
    line-height: 1.7;
  }
}

.safe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-sm;

  &__item {
    background: $bg-card;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
    padding: $spacing-md;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: 6rpx;
  }

  &__emoji {
    font-size: 36rpx;
  }

  &__name {
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__note {
    display: block;
    font-size: 22rpx;
    color: $text-secondary;
    line-height: 1.6;
  }
}
</style>
