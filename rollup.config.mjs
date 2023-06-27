// const replace = require();
// const babel = require();
// const  = require("@rollup/plugin-node-resolve");
// import merge from "deepmerge";
import merge  from "deepmerge";

import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import {createBasicConfig} from '@open-wc/building-rollup';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import json from  "@rollup/plugin-json";

export default merge(createBasicConfig({ rootDir:"./src",outputDir:"dist"}),{
  input: "./src/index.ts",
  preserveModules: true,
  plugins: [
   json(),

  // babel(),
  replace({
    "process.env.NODE_ENV": JSON.stringify('production'),
    preventAssignment: true,
  }),
  resolve(),
  typescript({ tsconfig: "./tsconfig.json" }),
  commonjs({
    defaultIsModuleExports: 'auto',
  }),

],})
// const baseConfig = createBasicConfig({
  // input: "./src/index.ts",



  // rollup(config, options) {
  //   config.output.esModule = true;
  //   config.plugins = config.plugins.map((p) =>
  //       p.name === "replace"
  //           ? replace({
  //             "process.env.NODE_ENV": JSON.stringify(options.env),
  //             preventAssignment: true,
  //           })
  //           : p
  //   );
  //   config.plugins.push(resolve());
  //   config.plugins.push(babel());
  //   return config;
  // },
// });
// export default baseConfig;

