<script setup lang="ts">
import { ref } from 'vue'
import { useFeedbackStore } from '@/stores/feedback'
import { FEEDBACK_TYPE_LABELS } from '@/data/types'
import type { FeedbackItem, FeedbackType } from '@/data/types'
import { formatDate } from '@/utils/date'

const feedbackStore = useFeedbackStore()

const typeOptions: Array<{ value: FeedbackType; icon: string }> = [
  { value: 'feature', icon: '💡' },
  { value: 'bug', icon: '🐛' },
  { value: 'content', icon: '✏️' },
  { value: 'other', icon: '💬' }
]

const MAX_LENGTH = 200

const selectedType = ref<FeedbackType>('feature')
const content = ref('')
const contact = ref('')

function pickType(type: FeedbackType) {
  selectedType.value = type
}

/** 拼出可直接粘贴到官方反馈渠道的文本 */
function formatFeedback(item: Pick<FeedbackItem, 'type' | 'content' | 'contact'>): string {
  const lines = [
    '【喵星人图鉴 · 意见反馈】',
    `类型：${FEEDBACK_TYPE_LABELS[item.type]}`,
    `内容：${item.content}`
  ]
  if (item.contact) {
    lines.push(`联系方式：${item.contact}`)
  }
  return lines.join('\n')
}

function copyText(text: string, tip: string) {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: tip, icon: 'none' })
    },
    fail: () => {
      uni.showToast({ title: '复制失败，请长按内容手动复制', icon: 'none' })
    }
  })
}

function submit() {
  const text = content.value.trim()
  if (!text) {
    uni.showToast({ title: '请填写反馈内容', icon: 'none' })
    return
  }
  const item = feedbackStore.addFeedback({
    type: selectedType.value,
    content: text,
    contact: contact.value.trim() || undefined
  })
  content.value = ''
  contact.value = ''
  copyText(formatFeedback(item), '已保存并复制，去官方反馈粘贴提交吧')
}

function copyHistory(item: FeedbackItem) {
  copyText(formatFeedback(item), '已复制')
}

function removeItem(item: FeedbackItem) {
  uni.showModal({
    title: '删除反馈',
    content: '确定要删除这条反馈记录吗？',
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (res.confirm) {
        feedbackStore.removeFeedback(item.id)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}
</script>

<template>
  <view class="fb">
    <!-- 说明 -->
    <view class="fb__intro">
      <text class="fb__intro-text">
        📮 本小程序暂无服务器，你的反馈会在本地留存一份，并自动复制到剪贴板。点击下方「微信官方反馈」按钮，粘贴提交后开发者就能在后台看到啦～
      </text>
    </view>

    <!-- 反馈类型 -->
    <view class="fb__section">
      <text class="fb__label">反馈类型</text>
      <view class="type-row">
        <view
          v-for="opt in typeOptions"
          :key="opt.value"
          class="type-row__item"
          :class="{ 'type-row__item--active': selectedType === opt.value }"
          @click="pickType(opt.value)"
        >
          <text class="type-row__icon">{{ opt.icon }}</text>
          <text class="type-row__name">{{ FEEDBACK_TYPE_LABELS[opt.value] }}</text>
        </view>
      </view>
    </view>

    <!-- 反馈内容 -->
    <view class="fb__section">
      <view class="fb__label-row">
        <text class="fb__label">反馈内容</text>
        <text class="fb__counter">{{ content.length }}/{{ MAX_LENGTH }}</text>
      </view>
      <view class="fb__card">
        <textarea
          v-model="content"
          class="fb__textarea"
          :maxlength="MAX_LENGTH"
          placeholder="说说你的建议或遇到的问题，帮助我们做得更好～"
          placeholder-class="fb__placeholder"
        />
      </view>
    </view>

    <!-- 联系方式 -->
    <view class="fb__section">
      <text class="fb__label">联系方式（选填）</text>
      <view class="fb__card">
        <input
          v-model="contact"
          class="fb__input"
          placeholder="微信号 / 邮箱，方便我们回复你"
          placeholder-class="fb__placeholder"
        />
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="fb__actions">
      <button class="fb__btn fb__btn--primary" @click="submit">
        保存并复制反馈内容
      </button>
      <button class="fb__btn fb__btn--ghost" open-type="feedback">
        📮 打开微信官方反馈
      </button>
    </view>

    <!-- 我的反馈 -->
    <view class="fb__section">
      <text class="fb__label">我的反馈（{{ feedbackStore.items.length }}）</text>
      <view class="fb__card">
        <view v-if="feedbackStore.sortedItems.length">
          <view
            v-for="item in feedbackStore.sortedItems"
            :key="item.id"
            class="fb-item"
          >
            <view class="fb-item__head">
              <text class="fb-item__type">{{ FEEDBACK_TYPE_LABELS[item.type] }}</text>
              <text class="fb-item__date">{{ formatDate(item.createdAt) }}</text>
            </view>
            <text class="fb-item__content">{{ item.content }}</text>
            <text v-if="item.contact" class="fb-item__contact">联系方式：{{ item.contact }}</text>
            <view class="fb-item__actions">
              <text class="fb-item__action" @click="copyHistory(item)">复制</text>
              <text class="fb-item__action fb-item__action--danger" @click="removeItem(item)">删除</text>
            </view>
          </view>
        </view>
        <Empty v-else icon="📮" text="还没有反馈记录" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.fb {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__intro {
    margin: $spacing-lg $spacing-lg 0;
    background: linear-gradient(135deg, $accent-cream, #fff);
    border-radius: $radius-lg;
    padding: $spacing-md $spacing-lg;
  }

  &__intro-text {
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.7;
  }

  &__section {
    padding: 0 $spacing-lg;
    margin-top: $spacing-lg;
  }

  &__label-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
  }

  &__label {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }

  &__counter {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__card {
    background: $bg-card;
    border-radius: $radius-lg;
    box-shadow: $shadow-card;
    padding: $spacing-md $spacing-lg;
  }

  &__textarea {
    width: 100%;
    height: 220rpx;
    font-size: $font-md;
    color: $text-primary;
    line-height: 1.6;
  }

  &__input {
    width: 100%;
    height: 64rpx;
    font-size: $font-md;
    color: $text-primary;
  }

  &__placeholder {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__actions {
    padding: $spacing-xl $spacing-lg 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: $radius-md;
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    text-align: center;

    &::after {
      border: none;
    }

    &--primary {
      background: $primary;
      color: #ffffff;

      &:active {
        background: $primary-dark;
      }
    }

    &--ghost {
      background: $bg-card;
      color: $primary-dark;
      border: 2rpx solid $primary-light;
      box-shadow: $shadow-card;

      &:active {
        background: $accent-cream;
      }
    }
  }
}

.type-row {
  display: flex;
  gap: $spacing-sm;

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rpx;
    background: $bg-card;
    border: 2rpx solid transparent;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
    padding: $spacing-md 0;

    &--active {
      border-color: $primary;
      background: $accent-cream;
    }

    &:active {
      background: $accent-cream;
    }
  }

  &__icon {
    font-size: 40rpx;
  }

  &__name {
    font-size: $font-sm;
    color: $text-primary;
  }
}

.fb-item {
  padding: $spacing-md 0;

  & + & {
    border-top: 1rpx solid $divider;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__type {
    font-size: $font-sm;
    color: $primary-dark;
    background: rgba(255, 159, 107, 0.15);
    border-radius: $radius-sm;
    padding: 4rpx 16rpx;
  }

  &__date {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__content {
    display: block;
    margin-top: $spacing-sm;
    font-size: $font-md;
    color: $text-primary;
    line-height: 1.6;
    word-break: break-all;
  }

  &__contact {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-lg;
    margin-top: $spacing-sm;
  }

  &__action {
    font-size: $font-sm;
    color: $primary-dark;

    &--danger {
      color: #e57373;
    }
  }
}
</style>
