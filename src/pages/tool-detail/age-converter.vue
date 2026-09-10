<script setup lang="ts">
import { computed, ref } from 'vue'
import { catToHumanAge, getAgeStage } from '@/utils/age'

// 年（整数）
const years = ref(0)
// 月（整数）
const months = ref(0)

// 允许的年范围
const yearOptions = Array.from({ length: 26 }, (_, i) => i)
// 允许的月范围
const monthOptions = Array.from({ length: 12 }, (_, i) => i)

const humanAge = computed(() => catToHumanAge(years.value, months.value))
const ageStage = computed(() => getAgeStage(years.value, months.value))

const catTotalMonths = computed(() => years.value * 12 + months.value)

function pickYear(index: number) {
  years.value = yearOptions[index] ?? 0
}

function pickMonth(index: number) {
  months.value = monthOptions[index] ?? 0
}
</script>

<template>
  <view class="age">
    <view class="age__hero">
      <view class="age__result">
        <view class="age__result-label">🐱 {{ years }} 年 {{ months }} 个月</view>
        <view class="age__result-value">
          ≈ {{ humanAge }} <text class="age__result-unit">岁（人类）</text>
        </view>
        <view class="age__stage">{{ ageStage }}</view>
      </view>
    </view>

    <!-- 年龄选择 -->
    <view class="age__picker">
      <view class="age__picker-col">
        <text class="age__picker-title">年</text>
        <picker
          :range="yearOptions"
          :value="years"
          range-key=""
          @change="pickYear($event.detail.value)"
        >
          <view class="age__picker-box">
            <text class="age__picker-value">{{ years }}</text>
            <text class="age__picker-arrow">▾</text>
          </view>
        </picker>
      </view>
      <view class="age__picker-col">
        <text class="age__picker-title">月</text>
        <picker
          :range="monthOptions"
          :value="months"
          range-key=""
          @change="pickMonth($event.detail.value)"
        >
          <view class="age__picker-box">
            <text class="age__picker-value">{{ months }}</text>
            <text class="age__picker-arrow">▾</text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 换算说明 -->
    <view class="age__card">
      <text class="age__card-title">📖 换算规则说明</text>
      <view class="age__rule">
        <text class="age__rule-item">猫咪 1 个月 ≈ 人类 1 岁</text>
        <text class="age__rule-item">猫咪 2 个月 ≈ 人类 3 岁</text>
        <text class="age__rule-item">猫咪 6 个月 ≈ 人类 10 岁</text>
        <text class="age__rule-item">猫咪 1 岁 ≈ 人类 15 岁</text>
        <text class="age__rule-item">猫咪 2 岁 ≈ 人类 24 岁</text>
        <text class="age__rule-item">此后每增加 1 年 ≈ 人类 +4 岁</text>
      </view>
    </view>

    <view class="age__tip">
      <text class="age__tip-text">💡 {{ catTotalMonths }} 个月的猫主子正在经历它喵生的重要阶段，好好陪伴它吧～</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.age {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__hero {
    background: linear-gradient(160deg, $primary-light, $accent-cream);
    padding: $spacing-xl $spacing-lg;
    display: flex;
    justify-content: center;
  }

  &__result {
    text-align: center;
  }

  &__result-label {
    font-size: $font-subtitle;
    color: $text-secondary;
  }

  &__result-value {
    font-size: 88rpx;
    font-weight: $font-weight-bold;
    color: $primary-dark;
    line-height: 1.4;
  }

  &__result-unit {
    font-size: $font-md;
    font-weight: $font-weight-normal;
    color: $text-secondary;
  }

  &__stage {
    display: inline-block;
    margin-top: $spacing-sm;
    font-size: $font-sm;
    color: #ffffff;
    background: $primary;
    border-radius: $radius-sm;
    padding: 6rpx 24rpx;
  }

  &__picker {
    display: flex;
    justify-content: center;
    gap: $spacing-xl;
    padding: $spacing-xl $spacing-lg;
  }

  &__picker-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__picker-title {
    font-size: $font-md;
    color: $text-secondary;
    margin-bottom: $spacing-sm;
  }

  &__picker-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    width: 200rpx;
    height: 100rpx;
    background: $bg-card;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
  }

  &__picker-value {
    font-size: 48rpx;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__picker-arrow {
    font-size: 28rpx;
    color: $text-muted;
  }

  &__card {
    background: $bg-card;
    border-radius: $radius-lg;
    box-shadow: $shadow-card;
    padding: $spacing-lg;
    margin: 0 $spacing-lg;
  }

  &__card-title {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-md;
  }

  &__rule-item {
    display: block;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 2.2;
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
</style>
