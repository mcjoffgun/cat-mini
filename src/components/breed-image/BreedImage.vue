<script setup lang="ts">
import type { CatBreed } from '@/data/types'

const props = withDefaults(
  defineProps<{
    breed: CatBreed
    /** 占位背景色 */
    color?: string
    /** 占位 emoji */
    emoji?: string
    /** 图片模式 */
    mode?: 'aspectFill' | 'scaleToFill' | 'aspectFit'
    /** 圆角 */
    radius?: string
  }>(),
  {
    color: '',
    emoji: '',
    mode: 'aspectFill',
    radius: '16rpx'
  }
)

const bgColor = props.color || props.breed.color
const emojiText = props.emoji || props.breed.emoji
</script>

<template>
  <view class="breed-image" :style="{ borderRadius: radius }">
    <image
      v-if="breed.image"
      class="breed-image__img"
      :src="breed.image"
      :mode="mode"
    />
    <view v-else class="breed-image__placeholder" :style="{ backgroundColor: bgColor }">
      <text class="breed-image__emoji">{{ emojiText }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.breed-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $accent-cream;

  &__img,
  &__placeholder {
    width: 100%;
    height: 100%;
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__emoji {
    font-size: 120rpx;
  }
}
</style>
