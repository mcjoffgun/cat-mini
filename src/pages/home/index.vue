<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import NavBar from '@/components/nav-bar/NavBar.vue'
import BreedImage from '@/components/breed-image/BreedImage.vue'
import { catBreeds } from '@/data/cat-breeds'
import { getRandomFact, catFacts } from '@/data/cat-facts'
import { today } from '@/utils/date'

const currentDate = ref(today())

// 每日一猫：按日期确定性选择，保证一天内稳定
const dailyBreed = computed(() => {
  const dayNum = Number(currentDate.value.replace(/-/g, ''))
  return catBreeds[dayNum % catBreeds.length]
})

// 养猫小知识：页面每次显示随机刷新
const fact = ref(getRandomFact())

function refreshFact() {
  fact.value = getRandomFact()
}

const quickTools = [
  { icon: '🐱', name: '年龄换算', desc: '猫龄换算人龄', url: '/pages/tool-detail/age-converter' },
  { icon: '💉', name: '疫苗提醒', desc: '打疫苗不遗漏', url: '/pages/tool-detail/vaccine' },
  { icon: '🍚', name: '喂食记录', desc: '记录每日喂养', url: '/pages/tool-detail/feeding' },
  { icon: '📝', name: '养猫日记', desc: '记录猫主子日常', url: '/pages/tool-detail/diary' }
]

onShow(() => {
  currentDate.value = today()
  refreshFact()
})

function goBreedDetail(id: number) {
  uni.navigateTo({ url: `/pages/catalog/detail?id=${id}` })
}

function goCatalog() {
  uni.switchTab({ url: '/pages/catalog/index' })
}

function goTool(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="home">
    <NavBar title="喵星人图鉴" />

    <!-- 每日一猫 -->
    <view class="home__section">
      <view class="home__section-header">
        <text class="home__section-title">🐱 每日一猫</text>
        <text class="home__section-more" @click="goCatalog">全部图鉴 ›</text>
      </view>

      <view class="daily-card" @click="goBreedDetail(dailyBreed.id)">
        <view class="daily-card__img">
          <BreedImage :breed="dailyBreed" radius="20rpx" />
        </view>
        <view class="daily-card__body">
          <view class="daily-card__title-row">
            <text class="daily-card__name">{{ dailyBreed.name }}</text>
            <text class="daily-card__en">{{ dailyBreed.englishName }}</text>
          </view>
          <text class="daily-card__desc">{{ dailyBreed.character }}</text>
          <view class="daily-card__tags">
            <text
              v-for="(tag, i) in dailyBreed.personality"
              :key="i"
              class="tag tag-cream"
            >{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 快捷工具 -->
    <view class="home__section">
      <view class="home__section-header">
        <text class="home__section-title">🧰 养猫工具</text>
      </view>
      <view class="quick-grid">
        <view
          v-for="tool in quickTools"
          :key="tool.name"
          class="quick-grid__item"
          @click="goTool(tool.url)"
        >
          <view class="quick-grid__icon">{{ tool.icon }}</view>
          <text class="quick-grid__name">{{ tool.name }}</text>
          <text class="quick-grid__desc">{{ tool.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 养猫小知识 -->
    <view class="home__section">
      <view class="home__section-header">
        <text class="home__section-title">💡 养猫小知识</text>
        <text class="home__section-more" @click="refreshFact">换一条</text>
      </view>
      <view class="fact-card">
        <view class="fact-card__badge">{{ fact.category }}</view>
        <text class="fact-card__content">{{ fact.content }}</text>
      </view>
    </view>

    <view class="home__footer">
      <text class="home__footer-text">共收录 {{ catFacts.length }} 条养猫知识 · 愿你的猫健康快乐</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__section {
    padding: 0 $spacing-lg;
    margin-bottom: $spacing-lg;
  }

  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-md;
  }

  &__section-title {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__section-more {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: $spacing-md 0;
  }

  &__footer-text {
    font-size: $font-sm;
    color: $text-muted;
  }
}

.daily-card {
  display: flex;
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-sm;
  gap: $spacing-md;

  &__img {
    width: 220rpx;
    height: 220rpx;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: $spacing-xs 0;
  }

  &__title-row {
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
  }

  &__desc {
    margin-top: $spacing-sm;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8rpx;
    margin-top: auto;
    padding-top: $spacing-sm;
  }
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-sm;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $bg-card;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
    padding: $spacing-md $spacing-xs;

    &:active {
      background: $accent-cream;
    }
  }

  &__icon {
    font-size: 52rpx;
    margin-bottom: $spacing-xs;
  }

  &__name {
    font-size: $font-sm;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__desc {
    margin-top: 4rpx;
    font-size: 20rpx;
    color: $text-muted;
  }
}

.fact-card {
  position: relative;
  background: linear-gradient(135deg, $accent-cream, #fff);
  border-radius: $radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-card;

  &__badge {
    display: inline-block;
    font-size: $font-sm;
    color: $primary-dark;
    background: rgba(255, 159, 107, 0.15);
    border-radius: $radius-sm;
    padding: 4rpx 16rpx;
    margin-bottom: $spacing-sm;
  }

  &__content {
    font-size: $font-subtitle;
    color: $text-primary;
    line-height: 1.7;
  }
}
</style>
