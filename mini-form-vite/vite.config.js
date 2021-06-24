import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
        {
          libraryName: 'antd3',
          esModule: true,
          resolveStyle: (name) => {
            return `antd3/es/${name}/style/index`;
          },
        },
        {
          libraryName: 'antd4',
          esModule: true,
          resolveStyle: (name) => {
            return `antd4/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
});
