const replace = require("@rollup/plugin-replace");
const babel = require("@rollup/plugin-babel");
const resolve = require("@rollup/plugin-node-resolve");

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
    config.plugins.push(resolve());
    config.plugins.push(babel());
    return config;
  },
};
