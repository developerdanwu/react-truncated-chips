import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react(),
    dts({
      copyDtsFiles: true,
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx', '**/*/examples/**'],
    }),
  ],
  resolve: {
    alias: {
      'react-truncated-chips': resolve(__dirname, 'src/index.ts'),
    },
  },
  build: {
    minify: true,
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')],
      name: 'react-truncated-chips',
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `${entryName}.js`;
        }
        return `${entryName}.${format}`;
      },
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      external: [
        ...Object.keys(pkg.peerDependencies),
        ...Object.keys(pkg.dependencies),
      ],
      output: {
        format: 'umd',
        name: 'react-truncated-chips',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
