import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/triplay.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/triplay.crt')),
    },
  },
  plugins: [react(), svgr()],
});
