<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN -->
    <ec-canvas class="mp-ec-canvas" :ec="ec" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import EcCanvas from '../components/ec-canvas/ec-canvas.vue'
import { ref } from 'vue'
import china from './china.json'

const ec = ref({
  options: {
    grid: {
      containLabel: true
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1,
      scaleLimit: {
        min: 1,
        max: 2,
      },
    }
  },
  mapJSON: china
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 400rpx;
}

.mp-ec-canvas {
  width: 100%;
  height: 500rpx;
}
</style>
