/**
 * 喂食记录 store
 * 记录每日喂食时间与量，自动持久化
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FeedingRecord } from '@/data/types'
import { genId } from '@/utils/id'
import { now } from '@/utils/date'

export const useFeedingStore = defineStore(
  'feeding',
  () => {
    const records = ref<FeedingRecord[]>([])

    /** 按时间倒序（最新在前） */
    const sortedRecords = computed(() =>
      [...records.value].sort((a, b) => b.createdAt - a.createdAt)
    )

    /** 某天的记录 */
    function getRecordsByDate(date: string): FeedingRecord[] {
      return records.value.filter((r) => r.date === date)
    }

    /** 新增喂食记录 */
    function addRecord(data: Omit<FeedingRecord, 'id' | 'createdAt'>): FeedingRecord {
      const record: FeedingRecord = { ...data, id: genId('feed'), createdAt: now() }
      records.value.push(record)
      return record
    }

    /** 更新记录并保留原始 id 与创建时间 */
    function updateRecord(
      id: string,
      data: Omit<FeedingRecord, 'id' | 'createdAt'>
    ): void {
      const index = records.value.findIndex((record) => record.id === id)
      if (index > -1) {
        records.value[index] = { ...records.value[index], ...data }
      }
    }

    /** 删除记录 */
    function removeRecord(id: string): void {
      records.value = records.value.filter((r) => r.id !== id)
    }

    return { records, sortedRecords, getRecordsByDate, addRecord, updateRecord, removeRecord }
  },
  {
    persist: { key: 'cat_feeding' }
  }
)
