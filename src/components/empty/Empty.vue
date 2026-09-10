<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 空状态文案 */
    text?: string
    /** 展示图标（emoji） */
    icon?: string
  }>(),
  {
    text: '这里空空如也',
    icon: '🐱'
  }
)
</script>

<template>
  <view class="empty">
    <text class="empty__icon">{{ icon }}</text>
    <text class="empty__text">{{ text }}</text>
  </view>
</template>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl 0;

  &__icon {
    font-size: 100rpx;
    margin-bottom: $spacing-md;
    opacity: 0.7;
  }

  &__text {
    font-size: $font-md;
    color: $text-muted;
  }
}
</style>
