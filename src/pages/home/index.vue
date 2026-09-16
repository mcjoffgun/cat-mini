<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { catBreeds } from '@/data/cat-breeds'
import { getRandomFact, catFacts } from '@/data/cat-facts'
import { today, daysUntil, daysBetween } from '@/utils/date'
import { useVaccineStore } from '@/stores/vaccine'
import { useFeedingStore } from '@/stores/feeding'
import { useDiaryStore } from '@/stores/diary'
import { useProfileStore } from '@/stores/profile'

const vaccineStore = useVaccineStore()
const feedingStore = useFeedingStore()
const diaryStore = useDiaryStore()
const profileStore = useProfileStore()

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

/** 最紧急的一条疫苗/驱虫记录（按下次日期最近排序） */
const urgentVaccine = computed(() => {
  if (!vaccineStore.records.length) return null
  return [...vaccineStore.records].sort((a, b) => a.nextDate.localeCompare(b.nextDate))[0]
})

/** 距离最近疫苗计划的天数（负数表示已逾期） */
const vaccineDays = computed(() =>
  urgentVaccine.value ? daysUntil(urgentVaccine.value.nextDate) : 0
)

/** 今日喂食次数 */
const todayFeedingCount = computed(
  () => feedingStore.getRecordsByDate(currentDate.value).length
)

/** 距离上一篇日记的天数（null 表示还没写过） */
const diaryGapDays = computed(() => {
  const last = diaryStore.sortedEntries[0]
  return last ? daysBetween(last.date, currentDate.value) : null
})

/** 今日养猫状态看板：数据驱动，点卡片直达对应工具 */
const statusCards = computed(() => {
  const vaccine = urgentVaccine.value
  return [
    {
      key: 'vaccine',
      icon: '💉',
      label: '疫苗驱虫',
      value: vaccine
        ? vaccineDays.value >= 0
          ? `${vaccineDays.value} 天`
          : `逾期 ${-vaccineDays.value} 天`
        : '未设置',
      desc: vaccine
        ? vaccineDays.value >= 0
          ? `${vaccine.name} 还有 ${vaccineDays.value} 天`
          : `${vaccine.name} 已逾期，尽快安排`
        : '还没有疫苗计划，去添加',
      urgent: !!vaccine && vaccineDays.value <= 3,
      url: '/pages/tool-detail/vaccine',
      isTab: false
    },
    {
      key: 'feeding',
      icon: '🍚',
      label: '今日喂食',
      value: `${todayFeedingCount.value} 次`,
      desc: todayFeedingCount.value > 0 ? '今天已喂食，棒棒哒' : '今天还没有喂食记录',
      urgent: false,
      url: '/pages/tool-detail/feeding',
      isTab: false
    },
    {
      key: 'diary',
      icon: '📝',
      label: '养猫日记',
      value:
        diaryGapDays.value === null
          ? '未写过'
          : diaryGapDays.value <= 0
            ? '今天'
            : `${diaryGapDays.value} 天前`,
      desc:
        diaryGapDays.value === null
          ? '记录第一篇猫咪日常吧'
          : diaryGapDays.value <= 0
            ? '今天已经记过啦'
            : '上次写日记的时间',
      urgent: false,
      url: '/pages/tool-detail/diary',
      isTab: false
    },
    {
      key: 'cats',
      icon: '🐈',
      label: '我的猫咪',
      value: profileStore.profileCount ? `${profileStore.profileCount} 只` : '未建档',
      desc: profileStore.profileCount
        ? profileStore.sortedProfiles
            .map((p) => p.name)
            .slice(0, 3)
            .join('、') + (profileStore.profileCount > 3 ? ' 等' : '')
        : '给猫主子建个档案吧',
      urgent: false,
      url: '/pages/profile/index',
      isTab: false
    }
  ]
})

onShow(() => {
  currentDate.value = today()
  refreshFact()
})

onShareAppMessage(() => ({
  title: '喵星人图鉴 - 认识猫咪品种，科学养猫',
  path: '/pages/home/index'
}))

onShareTimeline(() => ({ title: '喵星人图鉴 - 认识猫咪品种，科学养猫 🐱' }))

function goBreedDetail(id: number) {
  uni.navigateTo({ url: `/pages/catalog/detail?id=${id}` })
}

function goCatalog() {
  uni.switchTab({ url: '/pages/catalog/index' })
}

function goStatus(card: { url: string; isTab: boolean }) {
  if (card.isTab) {
    uni.switchTab({ url: card.url })
  } else {
    uni.navigateTo({ url: card.url })
  }
}

function goToolsTab() {
  uni.switchTab({ url: '/pages/tools/index' })
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

    <!-- 今日养猫状态 -->
    <view class="home__section">
      <view class="home__section-header">
        <text class="home__section-title">📊 今日养猫状态</text>
        <text class="home__section-more" @click="goToolsTab">全部工具 ›</text>
      </view>
      <view class="status-grid">
        <view
          v-for="card in statusCards"
          :key="card.key"
          class="status-card"
          :class="{ 'status-card--urgent': card.urgent }"
          @click="goStatus(card)"
        >
          <view class="status-card__head">
            <text class="status-card__icon">{{ card.icon }}</text>
            <text class="status-card__label">{{ card.label }}</text>
          </view>
          <text class="status-card__value" :class="{ 'status-card__value--urgent': card.urgent }">
            {{ card.value }}
          </text>
          <text class="status-card__desc">{{ card.desc }}</text>
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
      <text class="home__footer-text">
        共收录 {{ catBreeds.length }} 个品种 · {{ catFacts.length }} 条养猫知识 · 愿你的猫健康快乐
      </text>
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

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-sm;
}

.status-card {
  display: flex;
  flex-direction: column;
  background: $bg-card;
  border: 2rpx solid transparent;
  border-radius: $radius-md;
  box-shadow: $shadow-card;
  padding: $spacing-md;

  &:active {
    background: $accent-cream;
  }

  &--urgent {
    border-color: #e57373;
    background: #fff5f5;

    &:active {
      background: #ffecec;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
  }

  &__icon {
    font-size: 32rpx;
  }

  &__label {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__value {
    margin-top: $spacing-sm;
    font-size: 44rpx;
    font-weight: $font-weight-bold;
    color: $text-primary;
    line-height: 1.2;

    &--urgent {
      color: #e57373;
    }
  }

  &__desc {
    margin-top: 6rpx;
    font-size: 22rpx;
    color: $text-muted;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
