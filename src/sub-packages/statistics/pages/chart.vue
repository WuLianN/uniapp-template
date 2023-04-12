<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN -->
    <ec-canvas :ec="ec" :height="400" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import EcCanvas from '../components/ec-canvas/ec-canvas.vue'
import { ref } from 'vue'

const ec = ref({
  options: {
    title: {
      text: '测试下面legend的红色区域不应被裁剪',
      left: 'center'
    },
    legend: {
      data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true,
      bottom: 0
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [
      {
        name: 'A',
        type: 'line',
        smooth: true,
        data: [18, 36, 65, 30, 78, 40, 33]
      },
      {
        name: 'B',
        type: 'line',
        smooth: true,
        data: [12, 50, 51, 35, 70, 30, 20]
      },
      {
        name: 'C',
        type: 'line',
        smooth: true,
        data: [10, 30, 31, 50, 40, 20, 10]
      }
    ]
  }
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 600rpx;
}
</style>
