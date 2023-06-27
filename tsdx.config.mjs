const replace = require("@rollup/plugin-replace");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
//  json from  "@rollup/plugin-json";

// import replace from "@rollup/plugin-replace";
// import resolve from "@rollup/plugin-node-resolve";
// import {createBasicConfig} from '@open-wc/building-rollup';
// import commonjs from '@rollup/plugin-commonjs';
// import typescript from "@rollup/plugin-typescript";
// import json from  "@rollup/plugin-json";

module.exports = {
  rollup(config, options) {
    config.output.esModule = true;
    config.plugins = config.plugins.map((p) =>
      p.name === "replace"
        ? replace({
            "process.env.NODE_ENV": JSON.stringify(options.env),
            preventAssignment: true,
          })
        : p
    );
    config.plugins.push(commonjs({
      defaultIsModuleExports: 'auto',
    }))
    config.plugins.push(resolve());
    config.plugins.push(json);
    return config;
  },
};
