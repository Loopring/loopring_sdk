// const replace = require();
// const babel = require();
// const  = require("@rollup/plugin-node-resolve");
import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
  },
  plugins: [
    json(),
    babel(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(options.env),
      preventAssignment: true,
    }),
    resolve(),
  ],
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
};
