/**
 * Reason for Filename to be babel.config.js
 *
 * https://github.com/facebook/jest/issues/6053#issuecomment-383632515
 * https://github.com/babel/babel/pull/7784
 */

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 6
        }
      }
    ]
  ]
};
