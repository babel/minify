const OFF = "off";

module.exports = {
  root: true,
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    jest: true,
    es6: true,
    node: true
  },
  plugins: ["prettier"],
  rules: {
    "linebreak-style": ["error", "unix"],
    "no-cond-assign": OFF,
    "no-case-declarations": OFF,
    "prettier/prettier": ["error", { printWidth: 80 }]
  }
};
