import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const wpBase = env.VITE_WP_BASE_URL ?? 'https://cms.noramarketing.no'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/wp-json': {
          target: wpBase,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  }
})
