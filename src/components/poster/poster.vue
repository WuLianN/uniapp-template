<template>
  <view class="container">
    <canvas
      type="2d"
      canvas-id="myCanvas"
      :style="{ width: width + 'px', height: height + 'px' }"
      class="canvas"
    ></canvas>
  </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick } from 'vue'
import type {
  ImageOptions,
  TextOptions,
  TextLineOptions,
  RectOptions,
  PosterOptions
} from './types'

const props = defineProps({
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 225
  },
  posterData: {
    type: Array<PosterOptions>,
    default: () => []
  }
})

const currentInstance = getCurrentInstance()
const ctx = uni.createCanvasContext('myCanvas', currentInstance)

nextTick(() => {
  startPainting()
})

// 开始绘画
async function startPainting() {
  const list: Array<PosterOptions> = props.posterData
  if (list && list.length > 0) {
    for (let i = 0; i < props.posterData.length; i++) {
      if (list[i].type === 'image') {
        await getImageInfo(list[i])
      } else if (list[i].type === 'text') {
        drawText(list[i])
      } else if (list[i].type === 'rect') {
        drawRect(list[i])
      }
    }

    ctx.draw(false, () => {
      console.info('成功。。。')
    })
  }
}

/**
 * @description 获取图片信息
 * @param item
 */
async function getImageInfo(item: ImageOptions) {
  try {
    return await new Promise((resolve, reject) => {
      const { url } = item
      const isLink = /^http(s)?:\/\/([\w.]+\/?)\S*/
      if (isLink.test(url)) {
        uni.getImageInfo({
          src: url,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          complete: function (res_1: any) {
            if (res_1.errMsg === 'getImageInfo:ok') {
              console.log(res_1)
              ctx.drawImage(res_1.path, item.x, item.y, item.width, item.height)
              resolve(res_1.path)
            } else {
              reject(new Error('getImageInfo fail'))
            }
          }
        })
      }
    })
  } catch (err) {
    console.info(err)
  }
}

/**
 * @description 绘制文案
 * @param params
 */
function drawText(params: TextOptions) {
  ctx.save()
  const {
    maxLineNum = 2,
    isWrap = false,
    color = 'black',
    content = '',
    fontSize = 16,
    x = 0,
    y = 0,
    lineHeight = 20,
    textAlign = 'left',
    width = 30,
    textDecoration = 'none'
  } = params

  ctx.beginPath()
  ctx.setTextBaseline('top')
  ctx.setTextAlign(textAlign)
  ctx.setFillStyle(color)
  ctx.setFontSize(fontSize)

  if (!isWrap) {
    // 不换行
    ctx.fillText(content, x, y)
    drawTextLine({
      x,
      y,
      textDecoration,
      color,
      fontSize,
      content
    })
  } else {
    // 长文本 换行显示
    let fillText = ''
    let fillY = y
    let lineNum = 1
    for (let i = 0; i < content.length; i++) {
      fillText += content[i]
      if (ctx.measureText(fillText).width > width) {
        // 最大行数
        if (lineNum === maxLineNum) {
          // 当前字数不等于文本总字数 超出省略...
          if (i !== content.length) {
            fillText = fillText.substring(0, fillText.length - 1) + '...'
            ctx.fillText(fillText, x, fillY)
            drawTextLine({
              x,
              y: fillY,
              textDecoration,
              color,
              fontSize,
              content: fillText
            })
            fillText = ''
            break
          }
        }
        ctx.fillText(fillText, x, fillY)
        drawTextLine({
          x,
          y: fillY,
          textDecoration,
          color,
          fontSize,
          content: fillText
        })
        fillText = ''
        fillY += lineHeight
        lineNum++
      }
    }
  }

  ctx.restore()
}

/**
 * @description 画文本的装饰线 即text-decoration
 * @param params
 */
function drawTextLine(params: TextLineOptions) {
  const { x, y, textDecoration, color, fontSize, content } = params

  if (textDecoration === 'underline') {
    drawRect({
      background: color,
      y: y + fontSize * 1.2,
      x: x - 1,
      width: ctx.measureText(content).width + 3,
      height: 1
    })
  } else if (textDecoration === 'line-through') {
    drawRect({
      background: color,
      y: y + fontSize * 0.6,
      x: x - 1,
      width: ctx.measureText(content).width + 3,
      height: 1
    })
  }
}

/**
 * @description 绘制矩形
 * @param params
 */
function drawRect(params: RectOptions) {
  ctx.save()
  const { x = 0, y = 0, width = 0, height = 0, background, radius = 0 } = params
  ctx.setFillStyle(background)
  ctx.fillRect(x, y, width, height)
  if (Number(radius) > 0) {
    ctx.setLineJoin('round') // 圆角矩形
    ctx.setLineWidth(100) // 将ctx的lineWidth属性增大一些，效果就出来了
  }
  ctx.restore()
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
}

.canvas {
  background-color: white;
}
</style>
