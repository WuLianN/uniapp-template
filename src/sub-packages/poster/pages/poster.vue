<template>
  <Poster canvas-id="my" :poster-data="postData" :height="400" />
</template>

<script setup lang="ts">
import Poster from '@/components/poster/poster.vue'
import { ref } from 'vue'
import type { PosterOptions } from '@/components/poster/types'

const postData = ref([
  {
    type: 'image',
    width: 300,
    height: 400,
    x: 0,
    y: 0,
    url: 'https://cdn-oss.kabel.work/scheme/20220323/239f324b-4b2f-4b0b-9a02-50185962cc74.png'
  },
  {
    type: 'text',
    content: 'hello world',
    x: 50,
    y: 100,
    textDecoration: 'underline'
  },
  {
    type: 'text',
    content: 'hello world 大吉大利 今晚吃鸡',
    x: 0,
    y: 150,
    width: 100,
    isWrap: true,
    textDecoration: 'line-through'
  },
  {
    type: 'rect',
    x: 200,
    y: 10,
    width: 30,
    height: 60,
    background: 'green'
  },
  {
    type: 'rect',
    x: 150,
    y: 60,
    width: 30,
    height: 60,
    background: 'green',
    radius: 0.5
  }
]) as unknown as Array<PosterOptions>
</script>

<style scoped lang="scss"></style>
