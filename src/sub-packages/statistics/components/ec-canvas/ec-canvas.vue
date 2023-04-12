<template>
  <canvas
    type="2d"
    class="ec-canvas"
    :canvas-id="canvasId"
    @init="init"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    :style="{ height: height + 'rpx' }"
  ></canvas>
</template>

<script setup>
import { watch, getCurrentInstance } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import WxCanvas from './wx-canvas'
// import * as echarts from 'echarts' // app可以使用npm依赖 
import * as echarts from './echarts.esm.min.js' // 微信小程序有包大小限制

const props = defineProps({
  canvasId: {
    type: String,
    default: 'ec-canvas'
  },

  ec: {
    type: Object,
    default: () => {}
  },

  height: {
    type: Number,
    default: 500
  }
})

let chart = null

onReady(() => {
  if (!props.ec) {
    console.warn(
      '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
        'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
    )
    return
  }

  if (!props.ec.lazyLoad) {
    init()
  }
})

function init(callback) {
  initByNewWay(callback)
}

function initByNewWay(callback) {
  const instance = getCurrentInstance()
  const query = wx.createSelectorQuery().in(instance)
  query
    .select('.ec-canvas')
    .fields({ node: true, size: true })
    .exec(res => {
      const canvasNode = res[0].node

      const canvasDpr = wx.getSystemInfoSync().pixelRatio
      const canvasWidth = res[0].width
      const canvasHeight = res[0].height

      const ctx = canvasNode.getContext('2d')

      const canvas = new WxCanvas(ctx, props.canvasId, true, canvasNode)
      echarts.setPlatformAPI({
        createCanvas() {
          return canvas
        }
      })

      if (typeof callback === 'function') {
        chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr)
      } else if (props.ec) {
        chart = initChart(canvas, canvasWidth, canvasHeight, canvasDpr)
      } else {
        triggerEvent('init', {
          canvas: canvas,
          width: canvasWidth,
          height: canvasHeight,
          dpr: canvasDpr
        })
      }
    })
}

// function canvasToTempFilePath(opt) {
//   const query = wx.createSelectorQuery().in(this)
//   query
//     .select('.ec-canvas')
//     .fields({ node: true, size: true })
//     .exec(res => {
//       const canvasNode = res[0].node
//       opt.canvas = canvasNode
//       wx.canvasToTempFilePath(opt)
//     })
// }

function touchStart(e) {
  if (chart && e.touches.length > 0) {
    var touch = e.touches[0]
    var handler = chart.getZr().handler
    handler.dispatch('mousedown', {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    })
    handler.dispatch('mousemove', {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    })
    handler.processGesture(wrapTouch(e), 'start')
  }
}

function touchMove(e) {
  if (chart && e.touches.length > 0) {
    var touch = e.touches[0]
    var handler = chart.getZr().handler
    handler.dispatch('mousemove', {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    })
    handler.processGesture(wrapTouch(e), 'change')
  }
}

function touchEnd(e) {
  if (chart) {
    const touch = e.changedTouches ? e.changedTouches[0] : {}
    var handler = chart.getZr().handler
    handler.dispatch('mouseup', {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    })
    handler.dispatch('click', {
      zrX: touch.x,
      zrY: touch.y,
      preventDefault: () => {},
      stopImmediatePropagation: () => {},
      stopPropagation: () => {}
    })
    handler.processGesture(wrapTouch(e), 'end')
  }
}

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i]
    touch.offsetX = touch.x
    touch.offsetY = touch.y
  }
  return event
}

function setOption(val) {
  chart.setOption(val, true)
}

function initChart(canvas, width, height, canvasDpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: canvasDpr
  })

  if (props.ec.options.geo?.map) {
    echarts.registerMap(props.ec.options.geo.map, {
      geoJSON: props.ec.mapJSON
    })
  }

  chart.setOption(props.ec.options, true)

  return chart
}

watch(
  'ec.option',
  val => {
    setOption(val, true)
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.ec-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
