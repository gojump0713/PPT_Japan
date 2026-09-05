import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 행사장 오프라인 상영 대비: 상대경로 base로 USB/로컬서버 어디서든 실행 가능
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'chrome110',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 5173,
  },
})
