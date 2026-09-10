<script setup lang="ts">
import { ref } from 'vue'

/**
 * 自定义导航栏
 * 用于 navigationStyle: custom 的页面
 */
withDefaults(
  defineProps<{
    title?: string
    /** 是否显示返回按钮 */
    showBack?: boolean
    /** 是否透明（叠加在图片上） */
    transparent?: boolean
    /** 文字颜色（transparent 时生效） */
    color?: string
  }>(),
  {
    title: '',
    showBack: false,
    transparent: false,
    color: '#4A3F35'
  }
)

const emit = defineEmits<{
  (e: 'back'): void
}>()

const statusBarHeight = ref(0)

try {
  const info = uni.getSystemInfoSync()
  statusBarHeight.value = info.statusBarHeight || 0
} catch (e) {
  statusBarHeight.value = 0
}

function handleBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  } else {
    uni.switchTab({ url: '/pages/home/index' })
  }
  emit('back')
}
</script>

<template>
  <view class="nav-bar" :class="{ 'nav-bar--transparent': transparent }">
    <view class="nav-bar__status" :style="{ height: statusBarHeight + 'px' }" />
    <view class="nav-bar__content">
      <view class="nav-bar__side">
        <text
          v-if="showBack"
          class="nav-bar__back"
          :style="{ color }"
          @click="handleBack"
        >‹</text>
      </view>
      <text class="nav-bar__title" :style="{ color }">{{ title }}</text>
      <view class="nav-bar__side" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  z-index: 100;
  background: transparent;

  &--transparent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  &__content {
    height: $nav-bar-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-md;
  }

  &__side {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__back {
    font-size: 60rpx;
    line-height: 1;
    font-weight: $font-weight-normal;
    color: $text-primary;
  }

  &__title {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }
}
</style>
