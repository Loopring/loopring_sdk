// import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
// import json from '@rollup/plugin-json';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import typescript from 'rollup-plugin-typescript2';
// import { builtinModules } from 'module';
import pkg from  './package.json'  assert { type: "json" };
// import tsconfig  from './tsconfig.json' assert { type: "json" };
console.log('pkg',pkg)
module.exports = {
  input: './src',
  output: [
    { file: "dist/index.js", format: 'cjs', sourcemap: true, plugins: [terser()], },
    { file: "dist/loopring-sdk.esm.cjs", format: 'esm', sourcemap: true, plugins: [terser()], }
  ],
  // external: [
  //   ...builtinModules,
  //   ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
  //   ...(pkg.devDependencies ? Object.keys(pkg.devDependencies) : []),
  //   ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [])
  // ],
  // watch: {
  //   include: 'lib/**'
  // },
  // plugins: [
  //   json(),
  //   typescript({
  //         abortOnError: process.env.NODE_ENV === 'production',
  //         typescript: require("typescript"),
  //         tsconfig,
  //         tsconfigDefaults: {
  //           exclude: [
  //             // all TS test files, regardless whether co-located or in test/ etc
  //             '**/*.spec.ts',
  //             '**/*.test.ts',
  //             '**/*.spec.tsx',
  //             '**/*.test.tsx',
  //             // TS defaults below
  //             'node_modules',
  //             'bower_components',
  //             'jspm_packages',
  //           ],
  //           compilerOptions: {
  //             sourceMap: true,
  //             declaration: true,
  //             jsx: 'react',
  //           },
  //         },
  //         tsconfigOverride: {
  //           compilerOptions: Object.assign({
  //             // TS -> esnext, then leave the rest to babel-preset-env
  //             target: 'esnext' }, { declaration: true, declarationMap: true }),
  //         },
  //       }
  //   ),
  //   commonjs() ,
  //   nodeResolve({
  //     exportConditions: ['import', 'default', 'require'],
  //     mainFields: ['module', 'main', 'browser'],
  //     modulesOnly: true,
  //     preferBuiltins: false,
  //   }),
  //   babel({
  //     babelHelpers: 'bundled',
  //     include: ['src/**/*.ts'],
  //     exclude: './node_modules/**',
  //   }),
  // ]
};
