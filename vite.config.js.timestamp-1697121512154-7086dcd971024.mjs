// vite.config.js
import { defineConfig } from "file:///Users/fredli/Desktop/Learning/Conestoga/Level4/CapStone/Project/zenspace/node_modules/vite/dist/node/index.js";
import react from "file:///Users/fredli/Desktop/Learning/Conestoga/Level4/CapStone/Project/zenspace/node_modules/@vitejs/plugin-react-swc/index.mjs";
import dotenv from "file:///Users/fredli/Desktop/Learning/Conestoga/Level4/CapStone/Project/zenspace/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@Reducer": "/src/stores",
      "@customHook": "/src/hooks",
      "@hook": "/src/hooks",
      "$LIB": "/src/lib",
      "@Public": "/public",
      "@Data": "/src/data"
      // 添加其他别名
    }
  },
  define: {
    "MAP_API_KEY": JSON.stringify(process.env.VITE_MAP_API_KEY),
    "API_DOMAIN": JSON.stringify(process.env.VITE_API_DOMAIN)
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZnJlZGxpL0Rlc2t0b3AvTGVhcm5pbmcvQ29uZXN0b2dhL0xldmVsNC9DYXBTdG9uZS9Qcm9qZWN0L3plbnNwYWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZnJlZGxpL0Rlc2t0b3AvTGVhcm5pbmcvQ29uZXN0b2dhL0xldmVsNC9DYXBTdG9uZS9Qcm9qZWN0L3plbnNwYWNlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9mcmVkbGkvRGVza3RvcC9MZWFybmluZy9Db25lc3RvZ2EvTGV2ZWw0L0NhcFN0b25lL1Byb2plY3QvemVuc3BhY2Uvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52J1xuXG5kb3RlbnYuY29uZmlnKCkgLy8gbG9hZCBlbnYgdmFycyBmcm9tIC5lbnZcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQGNvbXBvbmVudHMnOiAnL3NyYy9jb21wb25lbnRzJyxcbiAgICAgICdAYXNzZXRzJzogJy9zcmMvYXNzZXRzJyxcbiAgICAgICdAUmVkdWNlcic6ICcvc3JjL3N0b3JlcycsXG4gICAgICAnQGN1c3RvbUhvb2snOiAnL3NyYy9ob29rcycsXG4gICAgICAnQGhvb2snOiAnL3NyYy9ob29rcycsXG4gICAgICAnJExJQic6ICcvc3JjL2xpYicsXG4gICAgICAnQFB1YmxpYyc6ICcvcHVibGljJyxcbiAgICAgICdARGF0YSc6ICcvc3JjL2RhdGEnLFxuICAgICAgLy8gXHU2REZCXHU1MkEwXHU1MTc2XHU0RUQ2XHU1MjJCXHU1NDBEXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ01BUF9BUElfS0VZJzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuVklURV9NQVBfQVBJX0tFWSksXG4gICAgJ0FQSV9ET01BSU4nOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5WSVRFX0FQSV9ET01BSU4pLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlksU0FBUyxvQkFBb0I7QUFDMWEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUVuQixPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2YsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osZUFBZTtBQUFBLE1BQ2YsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBO0FBQUEsSUFFWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWUsS0FBSyxVQUFVLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxJQUMxRCxjQUFjLEtBQUssVUFBVSxRQUFRLElBQUksZUFBZTtBQUFBLEVBQzFEO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
