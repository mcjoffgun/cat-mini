/**
 * 疫苗/驱虫提醒 store
 * 记录疫苗与驱虫计划，支持倒计时，自动持久化
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { VaccineRecord } from '@/data/types'
import { genId } from '@/utils/id'
import { createPersist } from './persist'

export const useVaccineStore = defineStore(
  'vaccine',
  () => {
    const records = ref<VaccineRecord[]>([])

    /** 记录数量 */
    const recordCount = computed(() => records.value.length)

    /** 新增记录 */
    function addRecord(data: Omit<VaccineRecord, 'id'>): VaccineRecord {
      const record: VaccineRecord = { ...data, id: genId('vaccine') }
      records.value.push(record)
      return record
    }

    /** 更新记录 */
    function updateRecord(id: string, data: Partial<Omit<VaccineRecord, 'id'>>): void {
      const idx = records.value.findIndex((r) => r.id === id)
      if (idx > -1) {
        records.value[idx] = { ...records.value[idx], ...data }
      }
    }

    /** 删除记录 */
    function removeRecord(id: string): void {
      records.value = records.value.filter((r) => r.id !== id)
    }

    return { records, recordCount, addRecord, updateRecord, removeRecord }
  },
  {
    persist: createPersist({ key: 'cat_vaccine', version: 1 })
  }
)
