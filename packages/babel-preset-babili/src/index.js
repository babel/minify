const isPlainObject = require("lodash.isplainobject");
const {group, option, proxy, generate} = require("./options-manager");

// the flat plugin map
// This is to prevent dynamic requires - require('babel-plugin-' + name);
// as it suffers during bundling of this code with webpack/browserify
const PLUGINS = [
  ["booleans",            require("babel-plugin-transform-minify-booleans"),               true],
  ["consecutiveAdds",     require("babel-plugin-transform-inline-consecutive-adds"),       true],
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
  ["undefinedToVoid",     require("babel-plugin-transform-undefined-to-void"),             true],
];

module.exports = preset;

function preset(context, _opts = {}) {
  const opts = isPlainObject(_opts) ? _opts : {};

  // to track every plugin is used
  const usedPlugins = new Set;

  const optionsMap = PLUGINS
    .map((plugin) => option(plugin[0], plugin[1], plugin[2]))
    .reduce((acc, cur) => {
      Object.defineProperty(acc, cur.name, {
        get() {
          usedPlugins.add(cur.name);
          return cur;
        }
      });
      return acc;
    }, {});

  const optionsTree = group(
    "options",
    [
      optionsMap.evaluate,
      optionsMap.deadcode,

      group("unsafe", [
        optionsMap.flipComparisons,
        optionsMap.simplifyComparisons,
        optionsMap.guards,
        optionsMap.typeConstructors,
      ]),

      optionsMap.infinity,
      optionsMap.mangle,
      optionsMap.numericLiterals,
      optionsMap.replace,
      optionsMap.simplify,

      group("properties", [
        optionsMap.consecutiveAdds,
        optionsMap.memberExpressions,
        optionsMap.propertyLiterals,
      ]),

      optionsMap.mergeVars,
      optionsMap.booleans,
      optionsMap.undefinedToVoid,
      optionsMap.regexpConstructors,

      optionsMap.removeConsole,
      optionsMap.removeDebugger,
      optionsMap.removeUndefined,

      proxy("keepFnName", [
        optionsMap.mangle,
        optionsMap.deadcode
      ]),

      proxy("keepClassName", [
        optionsMap.mangle,
        optionsMap.deadcode
      ])
    ],
    "some"
  );

  // verify all plugins are used
  if (usedPlugins.size !== PLUGINS.length) {
    const unusedPlugins = PLUGINS
      .filter((plugin) => !usedPlugins.has(plugin[0]))
      .map((plugin) => plugin[0]);
    throw new Error("Some imported plugins unused\n" + unusedPlugins);
  }

  const plugins = generate(optionsTree, opts);

  return {
    minified: true,
    comments: false,
    presets: [
      { plugins }
    ],
    passPerPreset: true,
  };
}
