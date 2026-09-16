/**
 * 猫咪档案 store
 * 管理"我的猫咪"档案，供各工具选猫与聚合展示，自动持久化
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CatProfile } from '@/data/types'
import { genId } from '@/utils/id'
import { now } from '@/utils/date'
import { createPersist } from './persist'

export const useProfileStore = defineStore(
  'profile',
  () => {
    const profiles = ref<CatProfile[]>([])

    /** 按创建时间正序（先建的在前） */
    const sortedProfiles = computed(() =>
      [...profiles.value].sort((a, b) => a.createdAt - b.createdAt)
    )

    /** 档案数量 */
    const profileCount = computed(() => profiles.value.length)

    /** 新增档案 */
    function addProfile(data: Omit<CatProfile, 'id' | 'createdAt'>): CatProfile {
      const profile: CatProfile = { ...data, id: genId('cat'), createdAt: now() }
      profiles.value.push(profile)
      return profile
    }

    /** 更新档案 */
    function updateProfile(id: string, data: Partial<Omit<CatProfile, 'id' | 'createdAt'>>): void {
      const idx = profiles.value.findIndex((p) => p.id === id)
      if (idx > -1) {
        profiles.value[idx] = { ...profiles.value[idx], ...data }
      }
    }

    /** 删除档案 */
    function removeProfile(id: string): void {
      profiles.value = profiles.value.filter((p) => p.id !== id)
    }

    /** 按名字查档案（各工具以 catName 字符串关联） */
    function getByName(name: string): CatProfile | undefined {
      return profiles.value.find((p) => p.name === name)
    }

    return { profiles, sortedProfiles, profileCount, addProfile, updateProfile, removeProfile, getByName }
  },
  {
    persist: createPersist({ key: 'cat_profile', version: 1 })
  }
)
