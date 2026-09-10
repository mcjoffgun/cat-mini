<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 分数 1-5 */
    level: number
    /** 标签文字，如 "亲人程度" */
    label?: string
    /** 空分数颜色 */
    emptyColor?: string
  }>(),
  {
    label: '',
    emptyColor: ''
  }
)

const filled = computed(() => Math.min(Math.max(props.level, 0), 5))

function isActive(index: number): boolean {
  return index < filled.value
}
</script>

<template>
  <view class="score-bar">
    <text v-if="label" class="score-bar__label">{{ label }}</text>
    <view class="score-bar__stars">
      <text
        v-for="i in 5"
        :key="i"
        class="score-bar__star"
        :class="{ 'score-bar__star--active': isActive(i) }"
      >★</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.score-bar {
  display: flex;
  align-items: center;
  gap: 12rpx;

  &__label {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__stars {
    display: flex;
    gap: 4rpx;
  }

  &__star {
    font-size: 28rpx;
    color: $divider;
    line-height: 1;

    &--active {
      color: $primary;
    }
  }
}
</style>
