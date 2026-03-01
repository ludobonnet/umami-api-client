import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import external from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const aliasPlugin = alias({
  entries: [
    { find: 'UmamiApiClient', replacement: path.resolve(__dirname, 'src/UmamiApiClient.ts') },
    { find: 'types', replacement: path.resolve(__dirname, 'src/types.ts') },
  ],
});

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      aliasPlugin,
      external({ includeDependencies: true }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/index.d.ts',
      format: 'esm',
    },
    plugins: [aliasPlugin, dts({ tsconfig: './tsconfig.json' })],
  },
];
