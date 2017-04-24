const yargsParser = require("yargs-parser");
const optionsParser = require("./options-parser");
const { version } = require("../package.json");
const { processFiles } = require("./fs");

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

const cliBooleanOpts = ["stdin", "help", "version"];
const cliOpts = ["out-file", "out-dir"];
const alias = {
  outFile: "o",
  outDir: "d",
  version: "V"
};

function aliasArr(obj) {
  const r = Object.keys(obj).reduce((acc, val) => {
    return acc.concat(val, obj[val]);
  }, []);
  return r;
}

function printHelpInfo() {
  const msg = `
  Usage: babili index.js [options]

  Options:
    --out-file, -o          Output to a specific file
    --out-dir, -d           Output to a specific directory
    --mangle                Context and scope aware variable renaming
    --simplify              Simplifies code for minification by reducing statements into
                            expressions
    --booleans              Transform boolean literals into !0 for true and !1 for false
    --builtIns              Minify standard built-in objects
    --consecutiveAdds       Inlines consecutive property assignments, array pushes, etc.
    --deadcode              Inlines bindings and tries to evaluate expressions.
    --evaluate              Tries to evaluate expressions and inline the result. Deals
                            with numbers and strings
    --flipComparisons       Optimize code for repetition-based compression algorithms
                            such as gzip.
    --infinity              Minify Infinity to 1/0
    --memberExpressions     Convert valid member expression property literals into plain
                            identifiers
    --mergeVars             Merge sibling variables into single variable declaration
    --numericLiterals       Shortening of numeric literals via scientific notation
    --propertyLiterals      Transform valid identifier property key literals into identifiers
    --regexpConstructors    Change RegExp constructors into literals
    --removeConsole         Removes all console.* calls
    --removeDebugger        Removes all debugger statements
    --removeUndefined       Removes rval's for variable assignments, return arguments from
                            functions that evaluate to undefined
    --replace               Replaces matching nodes in the tree with a given replacement node
    --simplifyComparisons   Convert === and !== to == and != if their types are inferred
                            to be the same
    --typeConstructors      Minify constructors to equivalent version
    --undefinedToVoid       Transforms undefined into void 0
    --version, -V           Prints the current version number
  `;
  log(msg);
}

function log(msg) {
  process.stdout.write(msg + "\n");
  process.exit(0);
}

function validate(opts) {
  const allOpts = [
    ...plugins,
    ...proxies,
    ...dceBooleanOpts,
    ...mangleBooleanOpts,
    ...typeConsOpts,
    ...mangleArrayOpts,
    ...cliBooleanOpts,
    ...cliOpts,
    ...aliasArr(alias)
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
    ...typeConsOpts,
    ...cliBooleanOpts
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
    alias,
    configuration: {
      "dot-notation": false
    }
  });

  const files = argv["_"];
  argv["stdin"] = argv["stdin"] || (!files.length && !process.stdin.isTTY);
  const errors = [];

  if (argv.help) {
    printHelpInfo();
  }

  if (argv.V) {
    log(version);
  }

  if (argv.outFile && argv.outDir) {
    errors.push("Cannot have both out-file and out-dir");
  }

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
    errors.push("Invalid Options passed: " + invalidOpts.join(","));
  }

  if (errors.length > 0) {
    log(errors.join("\n"));
  }

  const options = optionsParser(inputOpts);

  // delete unncessary options to babili preset
  delete options["_"];
  delete options.d;
  delete options["out-dir"];
  delete options.o;
  delete options["out-file"];

  processFiles(files, options);
}

run(process.argv.slice(2));
