import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import UniComponents from '@uni-helper/vite-plugin-uni-components'

export default defineConfig({
  plugins: [
    // 自动按需注册 src/components 下的组件，页面无需手动 import
    UniComponents({
      dirs: ['src/components'],
      dts: 'src/components.d.ts'
    }),
    uni()
  ],
  resolve: {
    alias: {
      '@': process.cwd() + '/src'
    }
  }
})
