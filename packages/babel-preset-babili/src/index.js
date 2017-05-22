const isPlainObject = require("lodash.isplainobject");

// the flat plugin map
// This is to prevent dynamic requires - require('babel-plugin-' + name);
// as it suffers during bundling of this code with webpack/browserify
// sorted by option name
// prettier-ignore
const PLUGINS = [
  // [optionname,         plugin,                                                          default],
  ["booleans",            require("babel-plugin-transform-minify-booleans"),               true],
  ["builtIns",            require("babel-plugin-minify-builtins"),                         true],
  ["consecutiveAdds",     require("babel-plugin-minify-inline-consecutive-adds"),          true],
  ["deadcode",            require("babel-plugin-minify-dead-code-elimination"),            true],
  ["evaluate",            require("babel-plugin-minify-constant-folding"),                 true],
  ["flipComparisons",     require("babel-plugin-minify-flip-comparisons"),                 true],
  ["guards",              require("babel-plugin-minify-guarded-expressions"),              true],
  ["infinity",            require("babel-plugin-minify-infinity"),                         true],
  ["mangle",              require("babel-plugin-minify-mangle-names"),                     true],
  ["memberExpressions",   require("babel-plugin-transform-member-expression-literals"),    true],
  ["mergeVars",           require("babel-plugin-transform-merge-sibling-variables"),       true],
  ["numericLiterals",     require("babel-plugin-minify-numeric-literals"),                 true],
  ["propertyLiterals",    require("babel-plugin-transform-property-literals"),             true],
  ["regexpConstructors",  require("babel-plugin-transform-regexp-constructors"),           true],
  ["removeConsole",       require("babel-plugin-transform-remove-console"),                false],
  ["removeDebugger",      require("babel-plugin-transform-remove-debugger"),               false],
  ["removeUndefined",     require("babel-plugin-transform-remove-undefined"),              true],
  ["replace",             require("babel-plugin-minify-replace"),                          true],
  ["simplify",            require("babel-plugin-minify-simplify"),                         true],
  ["simplifyComparisons", require("babel-plugin-transform-simplify-comparison-operators"), true],
  ["typeConstructors",    require("babel-plugin-minify-type-constructors"),                true],
  ["undefinedToVoid",     require("babel-plugin-transform-undefined-to-void"),             true]
];

const PROXIES = {
  keepFnName: ["mangle", "deadcode"],
  keepClassName: ["mangle", "deadcode"]
};

module.exports = preset;

function preset(context, _opts = {}) {
  const opts = isPlainObject(_opts) ? _opts : {};

  // validate options
  const validOptions = [...PLUGINS.map(p => p[0]), ...Object.keys(PROXIES)];
  for (let name in opts) {
    if (validOptions.indexOf(name) < 0) {
      throw new Error(`Invalid option "${name}"`);
    }
  }

  // build a plugins map from the plugin table above
  const pluginsMap = PLUGINS.reduce(
    (acc, [name, plugin, defaultValue]) =>
      Object.assign(acc, {
        [name]: {
          plugin,
          options: null,
          enabled: defaultValue
        }
      }),
    {}
  );

  // handle plugins and their options
  for (const [name] of PLUGINS) {
    if (isPlainObject(opts[name])) {
      pluginsMap[name].options = opts[name];
    } else if (opts[name] !== void 0) {
      pluginsMap[name].enabled = !!opts[name];
    }
  }

  // handle proxies
  for (let proxyname in PROXIES) {
    if (opts[proxyname] !== void 0) {
      for (const to of PROXIES[proxyname]) {
        if (!pluginsMap[to].options) {
          pluginsMap[to].options = {};
        }
        if (!hop(pluginsMap[to].options, proxyname)) {
          pluginsMap[to].options[proxyname] = opts[proxyname];
        }
      }
    }
  }

  // get the array of plugins
  const plugins = Object.keys(pluginsMap)
    .map(name => pluginsMap[name])
    .filter(plugin => plugin.enabled)
    .map(
      plugin =>
        plugin.options ? [plugin.plugin, plugin.options] : plugin.plugin
    );

  return {
    minified: true,
    comments: false,
    presets: [{ plugins }],
    passPerPreset: true
  };
}

function hop(o, key) {
  return Object.prototype.hasOwnProperty.call(o, key);
}
