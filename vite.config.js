import { defineConfig } from 'vite';
import path from 'path';
// import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/module.js'),
      name: 'editable-react-table',
      fileName: format => `editable-react-table.${format}.js`,
    },
  },
});
