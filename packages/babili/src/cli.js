const yargsParser = require("yargs-parser");
// const babili = require("./index");
const optionsParser = require("./options-parser");

const plugins = [
  "booleans",
  "builtIns",
  "consecutiveAdds",
  "deadcode",
  "evaluate",
  "flipComparisons",
  "guards",
  "infinity",
  "mangle",
  "memberExpressions",
  "mergeVars",
  "numericLiterals",
  "propertyLiterals",
  "regexpConstructors",
  "removeConsole",
  "removeDebugger",
  "removeUndefined",
  "replace",
  "simplify",
  "simplifyComparisons",
  "typeConstructors",
  "undefinedToVoid"
];

const proxies = ["keepFnName", "keepClassName"];

const dceBooleanOpts = [
  "deadcode.keepFnName",
  "deadcode.keepFnArgs",
  "deadcode.keepClassName"
];

const mangleBooleanOpts = [
  "mangle.eval",
  "mangle.keepFnName",
  "mangle.topLevel",
  "mangle.keepClassName"
];

const mangleArrayOpts = ["mangle.blacklist"];

const typeConsOpts = [
  "typeConstructors.array",
  "typeConstructors.boolean",
  "typeConstructors.number",
  "typeConstructors.object",
  "typeConstructors.string"
];

function validate(opts) {
  const allOpts = [
    ...plugins,
    ...proxies,
    ...dceBooleanOpts,
    ...mangleBooleanOpts,
    ...typeConsOpts,
    ...mangleArrayOpts
  ];

  return Object.keys(opts).filter(
    opt => opt !== "_" && allOpts.indexOf(opt) === -1
  );
}

function run(args) {
  const presetOpts = [...plugins, ...proxies];

  const booleanOpts = [
    ...presetOpts,
    ...dceBooleanOpts,
    ...mangleBooleanOpts,
    ...typeConsOpts
  ];

  const booleanDefaults = booleanOpts.reduce(
    (acc, cur) =>
      Object.assign(acc, {
        [cur]: void 0
      }),
    {}
  );

  const arrayOpts = [...mangleArrayOpts];

  const arrayDefaults = arrayOpts.reduce(
    (acc, cur) =>
      Object.assign(acc, {
        [cur]: []
      }),
    {}
  );

  const argv = yargsParser(args, {
    boolean: booleanOpts,
    array: mangleArrayOpts,
    default: Object.assign({}, arrayDefaults, booleanDefaults),
    configuration: {
      "dot-notation": false
    }
  });

  const inputOpts = Object.keys(argv)
    .filter(key => {
      if (Array.isArray(argv[key])) {
        return argv[key].length > 0;
      }
      return argv[key] !== void 0;
    })
    .reduce((acc, cur) => Object.assign(acc, { [cur]: argv[cur] }), {});

  const invalidOpts = validate(inputOpts);

  if (invalidOpts.length > 0) {
    throw new Error("Invalid Options passed: " + invalidOpts.join(","));
  }

  console.log(optionsParser(inputOpts));
}

run(process.argv.slice(2));
