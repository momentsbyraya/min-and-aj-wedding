import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sirv from 'sirv'

// Pin project root to this config file’s folder (fixes wrong cwd / worktree issues)
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/**
 * In dev only: serve ./assets/<folder> at /<folder>, so `/src/*` never hits static file
 * middleware for a mistakenly-present `assets/src` tree (fixes main.jsx 404).
 * Mirrors Vite build behavior where `publicDir: 'assets'` maps files to URLs like `/images/…`.
 */
function servePartitionedAssetsInDev() {
  const prefixes = ['images', 'videos', 'music', 'fonts']
  return {
    name: 'serve-partitioned-assets-dev',
    enforce: 'pre',
    configureServer(server) {
      const assetRoot = path.join(projectRoot, 'assets')
      if (!existsSync(assetRoot)) return
      const opts = {
        etag: true,
        dev: true,
      }
      for (const name of prefixes) {
        const dir = path.join(assetRoot, name)
        if (!existsSync(dir)) continue
        server.middlewares.use(`/${name}`, sirv(dir, opts))
      }
    },
  }
}

// Custom plugin to copy assets into dist/assets (bundles alongside hashed chunks)
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const copyDir = (src, dest) => {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
        }

        const items = readdirSync(src)
        items.forEach((item) => {
          const srcPath = path.join(src, item)
          const destPath = path.join(dest, item)

          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        })
      }

      const assetRoot = path.join(projectRoot, 'assets')
      const distAssets = path.join(projectRoot, 'dist', 'assets')
      if (existsSync(assetRoot)) {
        copyDir(assetRoot, distAssets)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  root: projectRoot,
  plugins: [
    ...(command === 'serve' ? [servePartitionedAssetsInDev()] : []),
    react(),
    copyAssetsPlugin(),
  ],
  logLevel: 'info',
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
    hmr: {
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
      interval: 100,
      awaitWriteFinish: {
        stabilityThreshold: 120,
        pollInterval: 100,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Serve whole `assets/` at `/` during build preview & production expectation;
  // dev disables this and uses partitioned sirv mounts above.
  publicDir: command === 'serve' ? false : 'assets',
}))
