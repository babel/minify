const OFF = "off";

module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  env: {
    jest: true,
    es6: true,
    node: true
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    "no-cond-assign": OFF,
    "no-case-declarations": OFF
  }
};
