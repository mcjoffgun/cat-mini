<script setup lang="ts">
import { computed } from 'vue'
import type { CatBreed } from '@/data/types'
import { SIZE_LABELS, COAT_LABELS } from '@/data/types'
import { useFavoriteStore } from '@/stores/favorite'

const props = withDefaults(
  defineProps<{
    breed: CatBreed
    /** 是否显示收藏按钮 */
    showFavorite?: boolean
    /** 卡片样式：list 列表 / grid 网格 */
    type?: 'list' | 'grid'
  }>(),
  {
    showFavorite: true,
    type: 'list'
  }
)

const emit = defineEmits<{
  (e: 'click', breed: CatBreed): void
}>()

const favoriteStore = useFavoriteStore()

const sizeLabel = computed(() => SIZE_LABELS[props.breed.size])
const coatLabel = computed(() => COAT_LABELS[props.breed.coat])
const isFav = computed(() => favoriteStore.isFavorite(props.breed.id))

function handleClick() {
  emit('click', props.breed)
}

function handleFav(e: Event) {
  // 阻止冒泡，避免触发卡片点击
  e.stopPropagation()
  favoriteStore.toggleFavorite(props.breed.id)
}

/** 渲染亲人程度星星 */
function renderStars(level: number): string {
  return '★'.repeat(level) + '☆'.repeat(5 - level)
}
</script>

<template>
  <view class="cat-card" :class="[`cat-card--${type}`]" @click="handleClick">
    <!-- 图片 / 占位图 -->
    <view class="cat-card__img-wrap">
      <image
        v-if="breed.image"
        class="cat-card__img"
        :src="breed.image"
        mode="aspectFill"
      />
      <view v-else class="cat-card__placeholder" :style="{ backgroundColor: breed.color }">
        <text class="cat-card__placeholder-emoji">{{ breed.emoji }}</text>
      </view>
      <!-- 收藏按钮 -->
      <view
        v-if="showFavorite"
        class="cat-card__fav"
        :class="{ 'cat-card__fav--active': isFav }"
        @click.stop="handleFav"
      >
        {{ isFav ? '♥' : '♡' }}
      </view>
    </view>

    <!-- 信息区 -->
    <view class="cat-card__info">
      <view class="cat-card__header">
        <text class="cat-card__name">{{ breed.name }}</text>
        <text class="cat-card__en">{{ breed.englishName }}</text>
      </view>

      <view class="cat-card__tags">
        <text class="tag tag-cream">{{ sizeLabel }}</text>
        <text class="tag tag-mint">{{ coatLabel }}</text>
      </view>

      <view class="cat-card__meta">
        <text class="cat-card__stars">{{ renderStars(breed.temperament) }}</text>
        <text class="cat-card__meta-label">亲人度</text>
      </view>

      <view class="cat-card__personality">
        <text
          v-for="(tag, i) in breed.personality.slice(0, 3)"
          :key="i"
          class="cat-card__chip"
        >
          {{ tag }}
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.cat-card {
  display: flex;
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  overflow: hidden;

  &--list {
    flex-direction: row;
    padding: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &--grid {
    flex-direction: column;
    padding: $spacing-sm;
  }

  &__img-wrap {
    position: relative;
    flex-shrink: 0;
    border-radius: $radius-md;
    overflow: hidden;
  }

  &--list &__img-wrap {
    width: 200rpx;
    height: 200rpx;
  }

  &--grid &__img-wrap {
    width: 100%;
    height: 220rpx;
  }

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

  &__placeholder-emoji {
    font-size: 80rpx;
  }

  &__fav {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34rpx;
    color: $text-muted;

    &--active {
      color: $accent-purple;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
    padding: 8rpx 16rpx;
  }

  &--grid &__info {
    padding: 16rpx 8rpx 8rpx;
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 12rpx;
  }

  &__name {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__en {
    font-size: $font-sm;
    color: $text-muted;
    flex-shrink: 0;
  }

  &__tags {
    display: flex;
    gap: 12rpx;
    margin-top: 14rpx;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8rpx;
    margin-top: 14rpx;
  }

  &__stars {
    color: $primary;
    font-size: $font-sm;
    letter-spacing: 2rpx;
  }

  &__meta-label {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__personality {
    display: flex;
    flex-wrap: wrap;
    gap: 8rpx;
    margin-top: 14rpx;
  }

  &__chip {
    font-size: $font-sm;
    color: $text-secondary;
    background: $accent-cream;
    border-radius: $radius-sm;
    padding: 2rpx 12rpx;
  }
}
</style>
