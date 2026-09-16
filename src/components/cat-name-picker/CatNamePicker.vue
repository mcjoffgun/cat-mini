<script setup lang="ts">
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const props = withDefaults(
  defineProps<{
    /** v-model 绑定的猫咪名字 */
    modelValue: string
    /** 输入框占位文案 */
    placeholder?: string
  }>(),
  { placeholder: '选填，如：咪咪' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const profileStore = useProfileStore()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})

/** 点档案 chip 快捷填充，再点一次取消 */
function pick(name: string) {
  value.value = value.value === name ? '' : name
}
</script>

<template>
  <view class="cnp">
    <view v-if="profileStore.profiles.length" class="cnp__chips">
      <text
        v-for="p in profileStore.sortedProfiles"
        :key="p.id"
        class="cnp__chip"
        :class="{ 'cnp__chip--active': value === p.name }"
        @click="pick(p.name)"
      >{{ p.emoji }} {{ p.name }}</text>
    </view>
    <input
      v-model="value"
      class="cnp__input"
      :placeholder="placeholder"
      placeholder-class="cnp__placeholder"
    />
  </view>
</template>

<style lang="scss" scoped>
.cnp {
  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
    margin-bottom: $spacing-xs;
  }

  &__chip {
    font-size: $font-sm;
    color: $text-secondary;
    background: $accent-cream;
    border: 2rpx solid transparent;
    border-radius: 28rpx;
    padding: 6rpx 20rpx;

    &--active {
      color: $primary-dark;
      border-color: $primary;
      background: rgba(255, 159, 107, 0.12);
      font-weight: $font-weight-medium;
    }
  }

  &__input {
    height: 80rpx;
    background: $bg-card;
    border-radius: $radius-md;
    padding: 0 $spacing-md;
    font-size: $font-subtitle;
    color: $text-primary;
  }

  &__placeholder {
    color: $text-muted;
  }
}
</style>
