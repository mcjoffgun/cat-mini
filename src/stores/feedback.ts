/**
 * 用户反馈 store
 * 本地留存反馈记录（无后端），支持复制后粘贴到微信官方反馈
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FeedbackItem } from '@/data/types'
import { genId } from '@/utils/id'
import { now } from '@/utils/date'
import { createPersist } from './persist'

export const useFeedbackStore = defineStore(
  'feedback',
  () => {
    const items = ref<FeedbackItem[]>([])

    /** 按创建时间倒序（最新在前） */
    const sortedItems = computed(() =>
      [...items.value].sort((a, b) => b.createdAt - a.createdAt)
    )

    /** 新增反馈 */
    function addFeedback(data: Omit<FeedbackItem, 'id' | 'createdAt'>): FeedbackItem {
      const item: FeedbackItem = { ...data, id: genId('fb'), createdAt: now() }
      items.value.unshift(item)
      return item
    }

    /** 删除反馈 */
    function removeFeedback(id: string): void {
      items.value = items.value.filter((i) => i.id !== id)
    }

    /** 清空全部反馈 */
    function clearAll(): void {
      items.value = []
    }

    return { items, sortedItems, addFeedback, removeFeedback, clearAll }
  },
  {
    persist: createPersist({ key: 'cat_feedback', version: 1 })
  }
)
