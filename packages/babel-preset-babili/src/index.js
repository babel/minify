const plugins = [
  require("babel-plugin-minify-constant-folding"),
  require("babel-plugin-minify-dead-code-elimination"),
  require("babel-plugin-minify-flip-comparisons"),
  require("babel-plugin-minify-guarded-expressions"),
  require("babel-plugin-minify-infinity"),
  require("babel-plugin-minify-mangle-names"),
  require("babel-plugin-minify-replace"),
  require("babel-plugin-minify-simplify"),
  require("babel-plugin-minify-type-constructors"),
  require("babel-plugin-transform-member-expression-literals"),
  require("babel-plugin-transform-merge-sibling-variables"),
  require("babel-plugin-transform-minify-booleans"),
  require("babel-plugin-transform-property-literals"),
  require("babel-plugin-transform-simplify-comparison-operators"),
  require("babel-plugin-transform-undefined-to-void"),
];

module.exports = {
  minified: true,
  plugins: [
    function ({version}) {
      validateVersion(version);
      return {visitor: {}};
    },
    ...plugins
  ],
};

function validateVersion(versionStr) {
  const version = versionStr.split(".");
  if (!(version[0] === '6' && parseInt(version[1]) >= 14)) {
    throw new Error(
      "Babili requires babel-core>=6.14.0. " +
      "Upgrade babel-core or tools dependent on babel-core to recent versions"
    );
  }
}
