'use strict';

var commonjs = require('@rollup/plugin-commonjs');
var babel = require('@rollup/plugin-babel');
var terser = require('@rollup/plugin-terser');
var json = require('@rollup/plugin-json');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var typescript = require('rollup-plugin-typescript2');
var module$1 = require('module');
var pkg = require('./package.json');

// console.log('pkg',pkg)
module.exports = {
  input: pkg.source,
  output: [
    { file:pkg.main  , format: 'cjs', sourcemap: true, plugins: [terser()], },
    { file: pkg.module , format: 'esm', sourcemap: true, plugins: [terser()], }
  ],
  external: [
    ...module$1.builtinModules,
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.devDependencies ? Object.keys(pkg.devDependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [])
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    json(),
    typescript({
          abortOnError: process.env.NODE_ENV === 'production',
          tsconfig:'./tsconfig.json',
          tsconfigDefaults: {
            exclude: [
              // all TS test files, regardless whether co-located or in test/ etc
              '**/*.spec.ts',
              '**/*.test.ts',
              '**/*.spec.ts',
              '**/*.test.ts',
              // TS defaults below
              'node_modules',
              'bower_components',
              'jspm_packages',
            ],
            compilerOptions: {
              sourceMap: true,
              declaration: true,
              jsx: 'react',
            },
          },
          tsconfigOverride: {
            compilerOptions: Object.assign({
              // TS -> esnext, then leave the rest to babel-preset-env
              target: 'esnext' }, { declaration: true, declarationMap: true }),
          },
        }
    ),
    commonjs() ,
    pluginNodeResolve.nodeResolve({
      exportConditions: ['import', 'default', 'require'],
      mainFields: ['module', 'main', 'browser'],
      modulesOnly: true,
      preferBuiltins: false,
    }),
    babel({
      babelHelpers: 'bundled',
      include: ['src/**/*.ts'],
      exclude: './node_modules/**',
    }),
  ],
  cache: false
};
