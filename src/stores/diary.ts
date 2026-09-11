/**
 * 养猫日记 store
 * 记录猫咪日常（文字 + 图片），按时间倒序，自动持久化
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { DiaryEntry } from '@/data/types'
import { genId } from '@/utils/id'
import { now } from '@/utils/date'
import { createPersist } from './persist'

export const useDiaryStore = defineStore(
  'diary',
  () => {
    const entries = ref<DiaryEntry[]>([])

    /** 按创建时间倒序（最新在前） */
    const sortedEntries = computed(() =>
      [...entries.value].sort((a, b) => b.createdAt - a.createdAt)
    )

    /** 新增日记 */
    function addEntry(data: Omit<DiaryEntry, 'id' | 'createdAt'>): DiaryEntry {
      const entry: DiaryEntry = { ...data, id: genId('diary'), createdAt: now() }
      entries.value.unshift(entry)
      return entry
    }

    /** 更新日记 */
    function updateEntry(id: string, data: Partial<Omit<DiaryEntry, 'id'>>): void {
      const idx = entries.value.findIndex((e) => e.id === id)
      if (idx > -1) {
        entries.value[idx] = { ...entries.value[idx], ...data }
      }
    }

    /** 删除日记 */
    function removeEntry(id: string): void {
      entries.value = entries.value.filter((e) => e.id !== id)
    }

    return { entries, sortedEntries, addEntry, updateEntry, removeEntry }
  },
  {
    persist: createPersist({ key: 'cat_diary', version: 1 })
  }
)
