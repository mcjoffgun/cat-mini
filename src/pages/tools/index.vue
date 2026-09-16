<script setup lang="ts">
import { computed } from 'vue'
import { useDiaryStore } from '@/stores/diary'
import { useVaccineStore } from '@/stores/vaccine'
import { useFeedingStore } from '@/stores/feeding'
import { useFeedbackStore } from '@/stores/feedback'
import { useProfileStore } from '@/stores/profile'
import { useWeightStore } from '@/stores/weight'

const diaryStore = useDiaryStore()
const vaccineStore = useVaccineStore()
const feedingStore = useFeedingStore()
const feedbackStore = useFeedbackStore()
const profileStore = useProfileStore()
const weightStore = useWeightStore()

const tools = computed(() => [
  {
    icon: '🐱',
    name: '年龄换算器',
    desc: '猫龄一键换算人龄',
    url: '/pages/tool-detail/age-converter',
    badge: ''
  },
  {
    icon: '💉',
    name: '疫苗驱虫提醒',
    desc: '记录计划，倒计时不遗漏',
    url: '/pages/tool-detail/vaccine',
    badge: vaccineStore.recordCount > 0 ? `${vaccineStore.recordCount}` : ''
  },
  {
    icon: '🍚',
    name: '喂食记录',
    desc: '记录每日喂食时间和量',
    url: '/pages/tool-detail/feeding',
    badge: feedingStore.records.length > 0 ? `${feedingStore.records.length}` : ''
  },
  {
    icon: '📝',
    name: '养猫日记',
    desc: '记录猫主子每天的日常',
    url: '/pages/tool-detail/diary',
    badge: diaryStore.entries.length > 0 ? `${diaryStore.entries.length}` : ''
  },
  {
    icon: '🐾',
    name: '猫咪身体语言',
    desc: '看懂尾巴耳朵的含义',
    url: '/pages/tool-detail/body-language',
    badge: ''
  },
  {
    icon: '🚫',
    name: '危险食物指南',
    desc: '这些食物千万别喂猫',
    url: '/pages/tool-detail/dangerous-foods',
    badge: ''
  },
  {
    icon: '⚖️',
    name: '体重追踪',
    desc: '记录曲线，胖瘦一目了然',
    url: '/pages/tool-detail/weight',
    badge: weightStore.records.length > 0 ? `${weightStore.records.length}` : ''
  },
  {
    icon: '🧮',
    name: '养猫成本计算器',
    desc: '算算养猫每月花多少',
    url: '/pages/tool-detail/cost-calculator',
    badge: ''
  }
])

function goTool(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="tools">
    <NavBar title="养猫工具" />

    <view class="tools__header">
      <text class="tools__slogan">给猫主子更贴心的照顾 🧡</text>
    </view>

    <view class="tools__list">
      <!-- 我的猫咪档案入口 -->
      <view class="tool-item" @click="goTool('/pages/profile/index')">
        <view class="tool-item__icon">🐈</view>
        <view class="tool-item__info">
          <view class="tool-item__title-row">
            <text class="tool-item__name">我的猫咪</text>
            <text v-if="profileStore.profileCount" class="tool-item__badge">{{ profileStore.profileCount }}</text>
          </view>
          <text class="tool-item__desc">建立档案，各工具一键选猫</text>
        </view>
        <text class="tool-item__arrow">›</text>
      </view>

      <view
        v-for="tool in tools"
        :key="tool.name"
        class="tool-item"
        @click="goTool(tool.url)"
      >
        <view class="tool-item__icon">
          {{ tool.icon }}
        </view>
        <view class="tool-item__info">
          <view class="tool-item__title-row">
            <text class="tool-item__name">{{ tool.name }}</text>
            <text v-if="tool.badge" class="tool-item__badge">{{ tool.badge }}</text>
          </view>
          <text class="tool-item__desc">{{ tool.desc }}</text>
        </view>
        <text class="tool-item__arrow">›</text>
      </view>

      <!-- 意见反馈入口 -->
      <view class="tool-item" @click="goTool('/pages/feedback/index')">
        <view class="tool-item__icon">💬</view>
        <view class="tool-item__info">
          <view class="tool-item__title-row">
            <text class="tool-item__name">意见反馈</text>
            <text v-if="feedbackStore.items.length" class="tool-item__badge">{{ feedbackStore.items.length }}</text>
          </view>
          <text class="tool-item__desc">你的建议是我们改进的动力</text>
        </view>
        <text class="tool-item__arrow">›</text>
      </view>
    </view>

    <view class="tools__footer">
      <text class="tools__footer-text">更多工具开发中，敬请期待</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tools {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__header {
    padding: $spacing-md $spacing-lg;
  }

  &__slogan {
    font-size: $font-subtitle;
    color: $text-secondary;
  }

  &__list {
    padding: 0 $spacing-lg;
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: $spacing-xl 0;
  }

  &__footer-text {
    font-size: $font-sm;
    color: $text-muted;
  }
}

.tool-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md;
  margin-bottom: $spacing-md;

  &:active {
    background: $accent-cream;
  }

  &__icon {
    width: 96rpx;
    height: 96rpx;
    border-radius: $radius-md;
    background: $accent-cream;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__name {
    font-size: $font-title;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__badge {
    min-width: 36rpx;
    height: 36rpx;
    border-radius: 18rpx;
    background: $primary;
    color: #ffffff;
    font-size: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;
  }

  &__desc {
    display: block;
    margin-top: 6rpx;
    font-size: $font-sm;
    color: $text-muted;
  }

  &__arrow {
    font-size: 48rpx;
    color: $text-muted;
  }
}
</style>
