<script setup lang="ts">
import { ref } from 'vue'
import { bodyLanguageGroups } from '@/data/body-language'

// 展开/收起
const expandedGroups = ref<Record<string, boolean>>({})

for (const g of bodyLanguageGroups) {
  expandedGroups.value[g.id] = true
}

function toggleGroup(id: string) {
  expandedGroups.value[id] = !expandedGroups.value[id]
}
</script>

<template>
  <view class="body-lang">
    <view class="body-lang__header">
      <view class="body-lang__intro">
        <text class="body-lang__intro-text">
          🐾 猫咪不会说话，但它们用尾巴、耳朵、眼睛和叫声表达情绪。读懂这些信号，能更好地照顾和理解你的猫主子。
        </text>
      </view>
    </view>

    <view class="body-lang__list">
      <view v-for="group in bodyLanguageGroups" :key="group.id" class="group">
        <view class="group__header" @click="toggleGroup(group.id)">
          <view class="group__title-row">
            <text class="group__icon">{{ group.icon }}</text>
            <text class="group__title">{{ group.label }}</text>
          </view>
          <text class="group__arrow" :class="{ 'group__arrow--open': expandedGroups[group.id] }">▾</text>
        </view>

        <view v-if="expandedGroups[group.id]" class="group__body">
          <view v-for="(item, i) in group.items" :key="i" class="item">
            <view class="item__dot" />
            <view class="item__content">
              <text class="item__title">{{ item.title }}</text>
              <text class="item__meaning">{{ item.meaning }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="body-lang__footer">
      <text class="body-lang__footer-text">温馨提示：以上仅为常见解读，请结合具体情境判断</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.body-lang {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(#{$spacing-xl} + env(safe-area-inset-bottom));

  &__header {
    padding: $spacing-md $spacing-lg;
  }

  &__intro {
    background: linear-gradient(135deg, $accent-cream, #fff);
    border-radius: $radius-lg;
    padding: $spacing-lg;
  }

  &__intro-text {
    font-size: $font-subtitle;
    color: $text-secondary;
    line-height: 1.8;
  }

  &__list {
    padding: 0 $spacing-lg;
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: $spacing-lg;
  }

  &__footer-text {
    font-size: $font-sm;
    color: $text-muted;
  }
}

.group {
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  margin-bottom: $spacing-md;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-md $spacing-lg;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__icon {
    font-size: 40rpx;
  }

  &__title {
    font-size: $font-subtitle;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__arrow {
    font-size: 28rpx;
    color: $text-muted;
    transition: transform 0.2s;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__body {
    padding: 0 $spacing-lg $spacing-md;
  }
}

.item {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-sm 0;

  &__dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: $primary;
    margin-top: 14rpx;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
  }

  &__title {
    display: block;
    font-size: $font-subtitle;
    font-weight: $font-weight-medium;
    color: $text-primary;
  }

  &__meaning {
    display: block;
    margin-top: 4rpx;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.6;
  }
}
</style>
