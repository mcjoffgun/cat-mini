/**
 * 收藏 store
 * 记录用户收藏的猫咪品种 id，自动持久化到本地
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createPersist } from './persist'

export const useFavoriteStore = defineStore(
  'favorite',
  () => {
    const favoriteIds = ref<number[]>([])

    /** 收藏数量 */
    const favoriteCount = computed(() => favoriteIds.value.length)

    /** 是否已收藏某品种 */
    function isFavorite(id: number): boolean {
      return favoriteIds.value.includes(id)
    }

    /** 切换收藏状态 */
    function toggleFavorite(id: number): void {
      const idx = favoriteIds.value.indexOf(id)
      if (idx > -1) {
        favoriteIds.value.splice(idx, 1)
      } else {
        favoriteIds.value.push(id)
      }
    }

    return { favoriteIds, favoriteCount, isFavorite, toggleFavorite }
  },
  {
    persist: createPersist({ key: 'cat_favorite', version: 1 })
  }
)
