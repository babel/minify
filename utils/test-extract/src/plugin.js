const BASE_FUNCTION_NAME = "thePlugin";
const babelGenerator = require("babel-generator").default;
const unpad = require("unpad");

const generate = (ast, shouldUnpad = true) => {
  const { code } = babelGenerator(ast);
  return shouldUnpad ? unpad(code) : code;
};

module.exports = ({ states, filePathName }) =>
  function({ types: t }) {
    return {
      visitor: {
        CallExpression(path) {
          const { node: { callee, arguments: args } = {} } = path;
          let createSkip =
            t.isMemberExpression(callee) &&
            t.isIdentifier(callee.property) &&
            callee.property.name === "skip";

          if (!(callee.name === BASE_FUNCTION_NAME || createSkip)) return;

          const testName = args[0].value;
          // Actual === expted
          if (args.length === 2) {
            const actual = generate(args[1]);
            const expected = generate(args[1]);

            states.push({
              testName,
              filePathName,
              actual,
              expected,
              createSkip
            });
          } else if (args.length === 3) {
            // Typeof last args {Object} => actual is expected
            // Actual is 2nd args and Expected is 3rd args
            if (t.isStringLiteral(args[2]) || t.isTemplateLiteral(args[2])) {
              const actual = generate(args[1]);
              const expected = generate(args[2]);

              states.push({
                testName,
                filePathName,
                actual,
                expected,
                createSkip
              });
            }
          } else if (args.length === 4) {
            // Actual is thani expexted is thani and options is thani
            const actual = generate(args[1]);
            const expected = generate(args[2]);

            const obj = args[3].properties[0].value.elements[0].elements[1];

            const value = generate(obj, false);

            states.push({
              testName,
              filePathName,
              actual,
              expected,
              options: value,
              createSkip
            });
          }
        }
      }
    };
  };
