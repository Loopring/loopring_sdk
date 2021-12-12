const replace = require("@rollup/plugin-replace");
const commonjs = require("@rollup/plugin-commonjs");

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
    config.plugins.push(commonjs());
    return config;
  },
};
