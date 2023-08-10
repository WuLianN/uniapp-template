<template>
  <view class="container">
    <uni-grid :column="3">
      <uni-grid-item v-for="(item, index) in list" :key="index">
        <view class="grid-item-box" @click="go(item.url)">
          <uni-icons :type="item.icon" :size="32" />
          <view> {{ item.name }}</view>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script setup>
const list = [
  {
    name: '海报',
    icon: '',
    url: '/sub-packages/poster/pages/poster'
  },
  {
    name: '地图',
    icon: 'map',
    url: '/sub-packages/statistics/pages/map'
  },
  {
    name: '图表',
    icon: 'flag',
    url: '/sub-packages/statistics/pages/chart'
  },
  {
    name: '非媒体文件上传',
    icon: 'flag',
    url: '/pages/non-media-upload/non-media-upload'
  }
]

function go(url) {
  if (url) {
    uni.navigateTo({
      url
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
}

.grid-item-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.grid-item-box-row {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}
</style>
