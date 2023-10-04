import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@Reducer': '/src/stores',
      '@customHook': '/src/hooks',
      '@hook': '/src/hooks',
      '$LIB': '/src/lib',
      '@Public': '/public',
      '@Data': '/src/data',
      // 添加其他别名
    },
  },
  define: {
    'MAP_API_KEY': JSON.stringify(process.env.VITE_MAP_API_KEY),
    'API_DOMAIN': JSON.stringify(process.env.VITE_API_DOMAIN),
  },
})
