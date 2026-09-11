import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { uniStorage } from './stores/persist'

export function createApp() {
  const app = createSSRApp(App)

  // Pinia 状态管理（uni-app 环境下的唯一状态方案）
  const pinia = Pinia.createPinia()
  pinia.use(
    createPersistedState({
      // 小程序环境没有 window.localStorage，改用带容错的 uni storage
      storage: uniStorage
    })
  )

  app.use(pinia)

  return {
    app,
    Pinia: pinia
  }
}
