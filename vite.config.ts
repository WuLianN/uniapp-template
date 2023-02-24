import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

console.info(resolve(__dirname, 'src/mock'))

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      uni(),
      viteMockServe({
        mockPath: 'src/mock',
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
})
