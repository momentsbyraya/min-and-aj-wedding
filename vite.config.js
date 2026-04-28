import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Custom plugin to copy assets
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const copyDir = (src, dest) => {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
        }
        
        const items = readdirSync(src)
        items.forEach(item => {
          const srcPath = join(src, item)
          const destPath = join(dest, item)
          
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        })
      }
      
      copyDir('assets', 'dist/assets')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyAssetsPlugin()],
  logLevel: 'info',
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
    hmr: {
      protocol: 'ws'
    },
    watch: {
      usePolling: true,
      interval: 100,
      awaitWriteFinish: {
        stabilityThreshold: 120,
        pollInterval: 100
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'assets'
}) 