import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.js',
    output: {
        file: './dist/index.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			sourceMaps: true,
			presets: [
				[
					'@babel/preset-env', {
						useBuiltIns: 'usage',
						corejs: 2,
						targets: '> 0.25%, not dead',
					},
				],
			],
		}),
		resolve(),
		commonjs(),
		terser(),
	]
  },
  {
    input: './src/video.js',
    output: {
      file: './dist/video.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			sourceMaps: true,
			presets: [
				[
					'@babel/preset-env', {
						useBuiltIns: 'usage',
						corejs: 2,
						targets: '> 0.25%, not dead',
					},
				],
			],
		}),
		resolve(),
		commonjs(),
		terser(),
	]
  }
];

