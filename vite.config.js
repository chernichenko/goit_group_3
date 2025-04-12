import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/goit_group_3/',
  esbuild: {
    target: 'esnext',
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        favorites: resolve(__dirname, 'favorites.html'), 
      },
    },
  },
  plugins: [
    ViteImageOptimizer({}),
    handlebars({
      partialDirectory: resolve(__dirname, './src/partials'),
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import'],
      },
    },
  },
})
