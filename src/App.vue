<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('🐱 喵星人图鉴 App Launch')
})

onShow(() => {
  console.log('🐱 App Show')
})

onHide(() => {
  console.log('🐱 App Hide')
})
</script>

<style lang="scss">
/* 全局样式：在 uni.scss 中定义设计规范变量 */
page {
  background-color: $bg-color;
  color: $text-primary;
  font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: $font-md;
}
</style>
