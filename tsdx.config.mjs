// const replace = require("@rollup/plugin-replace");
// const resolve = require("@rollup/plugin-node-resolve");
// const commonjs = require("@rollup/plugin-commonjs");
// const json = require("@rollup/plugin-json");
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

module.exports = {
  rollup(config, options) {
    config.output.esModule = true;
    config.output.format='esm'
      config.output.plugins = [terser()],
      // input: 'src/index.ts',
          // output: [
          // {
          //     file: 'dist/lib/bundles/bundle.esm.js',
          //     format: 'esm',
          //     sourcemap: true
          // },
          // {
          //     file: 'dist/lib/bundles/bundle.esm.min.js',
          //     format: 'esm',
          //     plugins: [terser()],
          //     sourcemap: true
          // },
          // {
          //     file: 'lib/bundles/bundle.umd.js',
          //     format: 'umd',
          //     name: 'myLibrary',
          //     sourcemap: true
          // },
          // {
          //     file: 'lib/bundles/bundle.umd.min.js',
          //     format: 'umd',
          //     name: 'myLibrary',
          //     plugins: [terser()],
          //     sourcemap: true
          // }
      // ],
    // config.plugins = config.plugins.map((p) =>
    //   p.name === "replace"
    //     ? replace({
    //         "process.env.NODE_ENV": JSON.stringify(options.env),
    //         preventAssignment: true,
    //       })
    //     : p
    // );
    // config.plugins.push(commonjs({
    //   defaultIsModuleExports: 'auto',
    // }))
    // config.plugins.push(resolve());
    // config.plugins.push(json);
      config.plugins = [
          json(),
          commonjs({
              include: 'node_modules/**'  ,
              defaultIsModuleExports:true
          }),
          nodeResolve({
              exportConditions:[ "import", "default",'require' ],
              mainFields: [ "module", "main",'browser' ],
              modulesOnly: true,
              preferBuiltins: false
          }),
          babel({ babelHelpers: 'bundled', include: ['src/**/*.ts'], extensions, exclude: './node_modules/**'})
      ]

    return config;
  },
};
