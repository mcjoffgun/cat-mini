<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import NavBar from '@/components/nav-bar/NavBar.vue'
import BreedImage from '@/components/breed-image/BreedImage.vue'
import Empty from '@/components/empty/Empty.vue'
import ScoreBar from '@/components/score-bar/ScoreBar.vue'
import { catBreeds } from '@/data/cat-breeds'
import { SIZE_LABELS, COAT_LABELS } from '@/data/types'
import type { CatBreed } from '@/data/types'
import { useFavoriteStore } from '@/stores/favorite'

const breed = ref<CatBreed | null>(null)
const favoriteStore = useFavoriteStore()

onLoad((options) => {
  const id = Number(options?.id || 0)
  breed.value = catBreeds.find((b) => b.id === id) || null
})

const isFav = computed(() => (breed.value ? favoriteStore.isFavorite(breed.value.id) : false))

const sizeLabel = computed(() => (breed.value ? SIZE_LABELS[breed.value.size] : ''))
const coatLabel = computed(() => (breed.value ? COAT_LABELS[breed.value.coat] : ''))

function toggleFav() {
  if (breed.value) {
    favoriteStore.toggleFavorite(breed.value.id)
    uni.showToast({
      title: isFav.value ? '已收藏 ❤️' : '已取消收藏',
      icon: 'none'
    })
  }
}

/** 分享给好友：带上当前品种，点开直达详情页 */
onShareAppMessage(() => {
  if (breed.value) {
    const tags = breed.value.personality.slice(0, 2).join('·')
    return {
      title: `${breed.value.name}｜${tags}，点我看完整图鉴`,
      path: `/pages/catalog/detail?id=${breed.value.id}`
    }
  }
  return { title: '喵星人图鉴 - 一起来认识各种猫咪', path: '/pages/home/index' }
})

/** 分享到朋友圈：朋友圈路径用 query 传参 */
onShareTimeline(() => {
  if (breed.value) {
    return {
      title: `${breed.value.name}（${breed.value.englishName}）你了解吗？来喵星人图鉴看看`,
      query: `id=${breed.value.id}`
    }
  }
  return { title: '喵星人图鉴 - 一起来认识各种猫咪' }
})
</script>

<template>
  <view v-if="breed" class="detail">
    <!-- 顶部大图 -->
    <view class="detail__hero">
      <BreedImage :breed="breed" radius="0" />
      <NavBar :title="breed.name" show-back transparent color="#ffffff" />
      <view class="detail__hero-actions">
        <view class="detail__hero-btn" @click="toggleFav">
          <text :class="{ 'is-fav': isFav }">{{ isFav ? '♥' : '♡' }}</text>
        </view>
        <button class="detail__hero-btn detail__hero-share" open-type="share">↗</button>
      </view>
    </view>

    <view class="detail__body">
      <!-- 基本信息 -->
      <view class="detail__header">
        <view class="detail__title-row">
          <text class="detail__name">{{ breed.name }}</text>
          <text class="detail__en">{{ breed.englishName }}</text>
        </view>
        <text v-if="breed.alias" class="detail__alias">别名：{{ breed.alias }}</text>
      </view>

      <!-- 关键信息卡 -->
      <view class="info-card">
        <view class="info-card__item">
          <text class="info-card__label">产地</text>
          <text class="info-card__value">{{ breed.origin }}</text>
        </view>
        <view class="info-card__item">
          <text class="info-card__label">寿命</text>
          <text class="info-card__value">{{ breed.lifeSpan }}</text>
        </view>
        <view class="info-card__item">
          <text class="info-card__label">体重</text>
          <text class="info-card__value">{{ breed.weight }}</text>
        </view>
        <view class="info-card__item">
          <text class="info-card__label">体型</text>
          <text class="info-card__value">{{ sizeLabel }}</text>
        </view>
        <view class="info-card__item">
          <text class="info-card__label">毛发</text>
          <text class="info-card__value">{{ coatLabel }}</text>
        </view>
      </view>

      <!-- 性格评分 -->
      <view class="section">
        <text class="section__title">性格画像</text>
        <view class="score-card">
          <view class="score-card__row">
            <ScoreBar :level="breed.temperament" label="亲人程度" />
          </view>
          <view class="score-card__row">
            <ScoreBar :level="breed.activityLevel" label="活跃程度" />
          </view>
          <view class="score-card__row">
            <ScoreBar :level="breed.grooming" label="打理难度" />
          </view>
        </view>
        <view class="section__tags">
          <text v-for="(tag, i) in breed.personality" :key="i" class="tag tag-purple">
            {{ tag }}
          </text>
        </view>
      </view>

      <!-- 外形特征 -->
      <view class="section">
        <text class="section__title">🐾 外形特征</text>
        <text class="section__text">{{ breed.appearance }}</text>
      </view>

      <!-- 性格特点 -->
      <view class="section">
        <text class="section__title">💛 性格特点</text>
        <text class="section__text">{{ breed.character }}</text>
      </view>

      <!-- 饲养要点 -->
      <view class="section">
        <text class="section__title">🍽️ 饲养要点</text>
        <view class="care-item">
          <view class="care-item__badge care-item__badge--diet">饮食</view>
          <text class="care-item__text">{{ breed.care.diet }}</text>
        </view>
        <view class="care-item">
          <view class="care-item__badge care-item__badge--grooming">护理</view>
          <text class="care-item__text">{{ breed.care.grooming }}</text>
        </view>
        <view class="care-item">
          <view class="care-item__badge care-item__badge--health">健康</view>
          <text class="care-item__text">{{ breed.care.health }}</text>
        </view>
      </view>

      <!-- 适合/不适合 -->
      <view class="section">
        <text class="section__title">👨‍👩‍👧 适合人群</text>
        <view class="section__suit">
          <text v-for="(s, i) in breed.suitableFor" :key="i" class="suit-tag suit-tag--yes">
            ✓ {{ s }}
          </text>
        </view>
        <text class="section__subtitle">⚠️ 不太适合</text>
        <view class="section__suit">
          <text v-for="(s, i) in breed.notSuitableFor" :key="i" class="suit-tag suit-tag--no">
            ✕ {{ s }}
          </text>
        </view>
      </view>

      <!-- 趣味小知识 -->
      <view v-if="breed.funFact" class="fun-card">
        <text class="fun-card__icon">💡</text>
        <view class="fun-card__body">
          <text class="fun-card__title">趣味小知识</text>
          <text class="fun-card__content">{{ breed.funFact }}</text>
        </view>
      </view>

      <view class="detail__footer-space" />
    </view>
  </view>
  <view v-else class="detail-error">
    <NavBar title="品种详情" show-back />
    <Empty text="未找到该猫咪品种" icon="?" />
  </view>
</template>

<style lang="scss" scoped>
.detail {
  min-height: 100vh;
  background: $bg-color;

  &__hero {
    position: relative;
    height: 480rpx;
  }

  &__hero-actions {
    position: absolute;
    right: $spacing-md;
    bottom: $spacing-md;
    display: flex;
    gap: $spacing-sm;
  }

  &__hero-btn {
    width: 76rpx;
    height: 76rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40rpx;
    color: $text-secondary;

    .is-fav {
      color: $accent-purple;
    }
  }

  /* 分享按钮：重置小程序 button 默认样式，与圆形图标按钮保持一致 */
  &__hero-share {
    padding: 0;
    margin: 0;
    border: none;
    line-height: 1;

    &::after {
      border: none;
    }
  }

  &__body {
    padding: 0 $spacing-lg;
  }

  &__header {
    padding: $spacing-lg 0 $spacing-md;
  }

  &__title-row {
    display: flex;
    align-items: baseline;
    gap: 16rpx;
  }

  &__name {
    font-size: 44rpx;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__en {
    font-size: $font-subtitle;
    color: $text-muted;
  }

  &__alias {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__footer-space {
    height: calc(#{$spacing-xl} + env(safe-area-inset-bottom));
  }
}

.detail-error {
  min-height: 100vh;
  background: $bg-color;
}

.info-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md 0;
  margin-bottom: $spacing-lg;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-sm 0;
  }

  &__label {
    font-size: $font-sm;
    color: $text-muted;
    margin-bottom: $spacing-xs;
  }

  &__value {
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }
}

.section {
  margin-bottom: $spacing-lg;

  &__title {
    display: block;
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-md;
  }

  &__subtitle {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
    margin: $spacing-md 0 $spacing-sm;
  }

  &__text {
    font-size: $font-subtitle;
    color: $text-secondary;
    line-height: 1.8;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  &__suit {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }
}

.score-card {
  background: $bg-card;
  border-radius: $radius-md;
  box-shadow: $shadow-card;
  padding: $spacing-md $spacing-lg;
  margin-bottom: $spacing-md;

  &__row {
    padding: $spacing-xs 0;
  }
}

.care-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  margin-bottom: $spacing-md;

  &__badge {
    flex-shrink: 0;
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-sm;
    font-weight: $font-weight-medium;
    color: #ffffff;

    &--diet {
      background: $primary;
    }
    &--grooming {
      background: $accent-mint;
    }
    &--health {
      background: $accent-purple;
    }
  }

  &__text {
    flex: 1;
    font-size: $font-subtitle;
    color: $text-secondary;
    line-height: 1.7;
    padding-top: 6rpx;
  }
}

.suit-tag {
  font-size: $font-sm;
  padding: 8rpx 20rpx;
  border-radius: $radius-sm;

  &--yes {
    background: rgba(143, 215, 199, 0.2);
    color: #3f9c8c;
  }

  &--no {
    background: rgba(255, 159, 107, 0.12);
    color: #c2703f;
  }
}

.fun-card {
  display: flex;
  gap: $spacing-md;
  background: linear-gradient(135deg, $accent-cream, #fff);
  border-radius: $radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;

  &__icon {
    font-size: 48rpx;
  }

  &__body {
    flex: 1;
  }

  &__title {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $primary-dark;
    margin-bottom: $spacing-xs;
  }

  &__content {
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
  }
}
</style>
