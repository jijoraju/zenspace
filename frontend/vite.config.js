import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@Reducer': '/src/stores',
      '@customHook': '/src/hooks',
      '$LIB': '/src/lib',
      '@Public': '/public',
      '@Data': '/src/data',
      // 添加其他别名
    },
  },
})
