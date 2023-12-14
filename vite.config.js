import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import pkg from './package.json';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

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
    minify: false,
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
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: [
              'src/**/*.stories.{tsx,mdx,ts}',
              'src/**/*.d.ts',
              '**/*/examples/**',
              'src/stories/**',
            ],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('src', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
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
