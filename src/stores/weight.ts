/**
 * 体重记录 store
 * 记录猫咪体重变化，支持按猫筛选与趋势展示，自动持久化
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { WeightRecord } from '@/data/types'
import { genId } from '@/utils/id'
import { now } from '@/utils/date'
import { createPersist } from './persist'

export const useWeightStore = defineStore(
  'weight',
  () => {
    const records = ref<WeightRecord[]>([])

    /** 按记录日期倒序（最新在前） */
    const sortedRecords = computed(() =>
      [...records.value].sort(
        (a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt
      )
    )

    /** 某只猫的记录，按日期正序（画趋势用） */
    function getRecordsByCat(catName: string): WeightRecord[] {
      return records.value
        .filter((r) => (r.catName || '') === catName)
        .sort(
          (a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt
        )
    }

    /** 新增记录 */
    function addRecord(data: Omit<WeightRecord, 'id' | 'createdAt'>): WeightRecord {
      const record: WeightRecord = { ...data, id: genId('wt'), createdAt: now() }
      records.value.push(record)
      return record
    }

    /** 更新记录并保留原始 id 与创建时间 */
    function updateRecord(id: string, data: Omit<WeightRecord, 'id' | 'createdAt'>): void {
      const index = records.value.findIndex((r) => r.id === id)
      if (index > -1) {
        records.value[index] = { ...records.value[index], ...data }
      }
    }

    /** 删除记录 */
    function removeRecord(id: string): void {
      records.value = records.value.filter((r) => r.id !== id)
    }

    return { records, sortedRecords, getRecordsByCat, addRecord, updateRecord, removeRecord }
  },
  {
    persist: createPersist({ key: 'cat_weight', version: 1 })
  }
)
