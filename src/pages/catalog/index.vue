<script setup lang="ts">
import { computed, ref } from 'vue'
import NavBar from '@/components/nav-bar/NavBar.vue'
import CatCard from '@/components/cat-card/CatCard.vue'
import { catBreeds } from '@/data/cat-breeds'
import { SIZE_LABELS, COAT_LABELS } from '@/data/types'
import type { CatBreed, CatSize, CoatType } from '@/data/types'

/** 筛选维度 */
type SizeFilter = 'all' | CatSize
type CoatFilter = 'all' | CoatType

const keyword = ref('')
const sizeFilter = ref<SizeFilter>('all')
const coatFilter = ref<CoatFilter>('all')

const sizeOptions: Array<{ value: SizeFilter; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'small', label: SIZE_LABELS.small },
  { value: 'medium', label: SIZE_LABELS.medium },
  { value: 'large', label: SIZE_LABELS.large }
]

const coatOptions: Array<{ value: CoatFilter; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'short', label: COAT_LABELS.short },
  { value: 'long', label: COAT_LABELS.long },
  { value: 'hairless', label: COAT_LABELS.hairless },
  { value: 'curly', label: COAT_LABELS.curly }
]

const filteredBreeds = computed<CatBreed[]>(() => {
  const kw = keyword.value.trim()
  return catBreeds.filter((b) => {
    // 关键词过滤：名称 / 英文名 / 别名 / 性格标签
    if (kw) {
      const hit =
        b.name.includes(kw) ||
        b.englishName.toLowerCase().includes(kw.toLowerCase()) ||
        (b.alias || '').includes(kw) ||
        b.personality.some((p) => p.includes(kw))
      if (!hit) return false
    }
    if (sizeFilter.value !== 'all' && b.size !== sizeFilter.value) return false
    if (coatFilter.value !== 'all' && b.coat !== coatFilter.value) return false
    return true
  })
})

function handleBreedClick(breed: CatBreed) {
  uni.navigateTo({ url: `/pages/catalog/detail?id=${breed.id}` })
}
</script>

<template>
  <view class="catalog">
    <NavBar title="猫咪图鉴" />

    <!-- 搜索框 -->
    <view class="catalog__search">
      <view class="catalog__search-box">
        <text class="catalog__search-icon">🔍</text>
        <input
          v-model="keyword"
          class="catalog__search-input"
          placeholder="搜索品种 / 别名 / 性格"
          placeholder-class="catalog__search-placeholder"
          confirm-type="search"
        />
        <text v-if="keyword" class="catalog__search-clear" @click="keyword = ''">✕</text>
      </view>
    </view>

    <!-- 筛选 -->
    <view class="catalog__filters">
      <scroll-view class="catalog__filter-row" scroll-x>
        <view class="catalog__filter-row-inner">
          <view
            v-for="opt in sizeOptions"
            :key="opt.value"
            class="catalog__filter-chip"
            :class="{ 'catalog__filter-chip--active': sizeFilter === opt.value }"
            @click="sizeFilter = opt.value"
          >
            {{ opt.label }}
          </view>
        </view>
      </scroll-view>
      <scroll-view class="catalog__filter-row" scroll-x>
        <view class="catalog__filter-row-inner">
          <view
            v-for="opt in coatOptions"
            :key="opt.value"
            class="catalog__filter-chip"
            :class="{ 'catalog__filter-chip--active': coatFilter === opt.value }"
            @click="coatFilter = opt.value"
          >
            {{ opt.label }}
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 列表 -->
    <view class="catalog__list">
      <view class="catalog__count">
        共 {{ filteredBreeds.length }} 个品种
      </view>
      <view v-if="filteredBreeds.length">
        <CatCard
          v-for="breed in filteredBreeds"
          :key="breed.id"
          :breed="breed"
          type="list"
          @click="handleBreedClick"
        />
      </view>
      <view v-else class="empty">
        <text class="empty__icon">🔍</text>
        <text class="empty__text">没有找到匹配的品种，换个关键词试试</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.catalog {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__search {
    padding: 0 $spacing-lg $spacing-sm;
  }

  &__search-box {
    display: flex;
    align-items: center;
    background: $bg-card;
    border-radius: 44rpx;
    padding: 0 $spacing-md;
    height: 76rpx;
    box-shadow: $shadow-card;
  }

  &__search-icon {
    font-size: 28rpx;
    margin-right: $spacing-sm;
  }

  &__search-input {
    flex: 1;
    font-size: $font-md;
    color: $text-primary;
  }

  &__search-placeholder {
    color: $text-muted;
  }

  &__search-clear {
    font-size: 32rpx;
    color: $text-muted;
    padding: 0 $spacing-xs;
  }

  &__filters {
    padding: 0 $spacing-lg;
    margin-bottom: $spacing-sm;
  }

  &__filter-row {
    white-space: nowrap;
    margin-bottom: $spacing-sm;
  }

  &__filter-row-inner {
    display: inline-flex;
    gap: $spacing-sm;
    padding-right: $spacing-lg;
  }

  &__filter-chip {
    display: inline-flex;
    align-items: center;
    height: 60rpx;
    padding: 0 $spacing-md;
    border-radius: 30rpx;
    background: $bg-card;
    color: $text-secondary;
    font-size: $font-sm;

    &--active {
      background: linear-gradient(135deg, $primary-light, $primary);
      color: #ffffff;
      font-weight: $font-weight-medium;
    }
  }

  &__list {
    padding: 0 $spacing-lg;
  }

  &__count {
    font-size: $font-sm;
    color: $text-muted;
    margin-bottom: $spacing-sm;
    padding-left: $spacing-xs;
  }
}
</style>
