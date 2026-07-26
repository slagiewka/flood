import path from 'node:path';

import {defineConfig} from 'vite';

import {buildPaths} from './shared/config/buildPaths.mjs';
export default defineConfig(({command}) => {
  if (command === 'serve') {
    return {
      resolve: {
        tsconfigPaths: true,
      },
    };
  }

  return {
    ssr: {
      noExternal: true,
    },
    build: {
      emptyOutDir: false,
      minify: false,
      outDir: path.resolve(buildPaths.appSrc, 'dist'),
      rolldownOptions: {
        external: ['geoip-country'],
        output: {
          codeSplitting: false,
          entryFileNames: 'index.js',
          format: 'esm',
        },
      },
      sourcemap: 'inline',
      ssr: path.resolve(buildPaths.appSrc, 'server/bin/start.ts'),
      target: 'node22',
    },
  };
});
