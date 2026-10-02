import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const FONT = path.resolve(import.meta.dirname, 'local/Recoleta-Regular.otf')
const FONT_URL = '/__local-font.otf'

/*
  Local-only font preview.

  Recoleta is licensed to this machine for desktop use, which does not cover
  serving it from a server. `apply: 'serve'` keeps this plugin out of `vite
  build` entirely, so the font can never reach `dist/` — it exists only while
  you're designing at localhost. Production falls back to Newsreader until a
  web licence (and a .woff2) is in hand.

  Drop the file in and it turns itself on; delete it and everything still runs.
*/
function localFontPreview() {
  return {
    name: 'local-font-preview',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use(FONT_URL, (_req, res) => {
        if (!fs.existsSync(FONT)) {
          res.statusCode = 404
          return res.end()
        }
        res.setHeader('Content-Type', 'font/otf')
        res.setHeader('Cache-Control', 'no-store')
        fs.createReadStream(FONT).pipe(res)
      })
    },

    transformIndexHtml() {
      if (!fs.existsSync(FONT)) return
      return [
        {
          tag: 'style',
          injectTo: 'head',
          children: `
            @font-face {
              font-family: 'Recoleta Local';
              src: url('${FONT_URL}') format('opentype');
              font-weight: 400;
              font-display: swap;
            }
            /* One token drives every serif on the site — the nav reads from it
               too. !important so it wins regardless of when Vite injects app CSS. */
            :root {
              --font-serif: 'Recoleta Local', 'Newsreader', ui-serif, Georgia, serif !important;
            }
          `,
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localFontPreview()],
})
