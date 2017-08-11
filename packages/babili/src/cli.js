const yargsParser = require("yargs-parser");
const optionsParser = require("./options-parser");
const { version } = require("../package.json");
const { handleStdin, handleFile, handleArgs, isFile } = require("./fs");

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

const cliBooleanOpts = ["help", "version"];
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

function printHelpInfo({ exitCode = 0 } = {}) {
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

  Nested Options:
    To use nested options (plugin specfic options) simply use the pattern
    --pluginName.featureName.

    For example,
    babili index.js --mangle.keepClassName --deadcode.keepFnArgs --outFile index.min.js
  `;
  log(msg, exitCode);
}

function log(msg, exitCode = 0) {
  process.stdout.write(msg + "\n");
  process.exit(exitCode);
}

function error(err) {
  process.stderr.write(err + "\n");
  process.exit(1);
}

function getArgv(args) {
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

  return yargsParser(args, {
    boolean: booleanOpts,
    array: mangleArrayOpts,
    default: Object.assign({}, arrayDefaults, booleanDefaults),
    alias,
    configuration: {
      "dot-notation": false
    }
  });
}

function getBabiliOpts(argv) {
  const inputOpts = Object.keys(argv)
    .filter(key => {
      if (Array.isArray(argv[key])) return argv[key].length > 0;
      return argv[key] !== void 0;
    })
    .reduce((acc, cur) => Object.assign(acc, { [cur]: argv[cur] }), {});

  const invalidOpts = validate(inputOpts);

  if (invalidOpts.length > 0) {
    throw new Error("Invalid Options passed: " + invalidOpts.join(","));
  }

  const options = optionsParser(inputOpts);

  // delete unncessary options to babili preset
  delete options["_"];
  delete options.d;
  delete options["out-dir"];
  delete options.o;
  delete options["out-file"];
  delete options.outFile;
  delete options.outDir;

  return options;
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

function runStdin(argv, options) {
  if (argv._.length > 0) {
    throw new Error("Reading input from STDIN. Cannot take file params");
  }

  return handleStdin(argv.outFile, options);
}

function runFile(argv, options) {
  const file = argv._[0];

  // prefer outFile
  if (argv.outFile) {
    return handleFile(file, argv.outFile, options);
  } else if (argv.outDir) {
    return handleArgs([file], argv.outDir, options);
  } else {
    // prints to STDOUT
    return handleFile(file, void 0, options);
  }
}

function runArgs(argv, options) {
  return handleArgs(argv._, argv.outDir, options);
}

async function run(args) {
  const argv = getArgv(args);

  // early exits
  if (argv.help) printHelpInfo();
  if (argv.V) log(version);

  const options = getBabiliOpts(argv);

  if (!process.stdin.isTTY) {
    return runStdin(argv, options);
  } else if (argv._.length <= 0) {
    return printHelpInfo({ exitCode: 1 });
  } else if (argv._.length === 1 && (await isFile(argv._[0]))) {
    return runFile(argv, options);
  } else {
    return runArgs(argv, options);
  }
}

run(process.argv.slice(2)).catch(e => error(e));
