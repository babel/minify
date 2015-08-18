#!/usr/bin/env node

var child = require("child_process");
var uglify = require("uglify-js");
var bytes = require("bytes");
var babel = require("babel-core");
var zlib = require("zlib");
var fs = require("fs");

var filename = process.argv[2];
if (!filename) {
  console.error("Error: No filename specified");
  process.exit(1);
}

var code = fs.readFileSync(filename, "utf8");

function test(name, callback) {
  var start = Date.now();
  var result = callback(code);
  var end = Date.now();
  var now = end - start;

  var gzipped = zlib.gzipSync(result);

  console.log(name, bytes(result.length) + " raw", bytes(gzipped.length) + " gzipped");
}

test("normal", function (code) {
  return code;
});

var miscPlugin = new babel.Plugin("dead-code-elimination", {
  metadata: {
    group: "builtin-pre"
  },

  visitor: {
    // remove side effectless statement
    ExpressionStatement: function () {
      if (this.get("expression").isStatic() && !this.isCompletionRecord()) {
        this.dangerouslyRemove();
      }
    },

    // turn blocked ifs into single statements
    IfStatement: function (node) {
      coerceIf("consequent");
      coerceIf("alternate");

      function coerceIf(key) {
        var body = node[key];
        if (!body || body.length !== 1) return;

        var first = body[0];
        if (first.type === "VariableDeclaration" && first.kind !== "var") return;

        node[key] = first;
      }
    }
  }
});

test("babel", function (code, callback) {
  return babel.transform(code, {
    experimental: true,
    whitelist: ["minification.deadCodeElimination"],
    plugins: [
      "merge-sibling-variables",
      "simplify-comparison-operators",
      "minify-booleans",
      "member-expression-literals",
      //"dead-code-elimination",
      "property-literals",
      //"constant-folding",
      miscPlugin
    ],
    compact: true,
    comments: false
  }).code;
});

test("fb jsmin", function (code, callback) {
  return fs.readFileSync("fb-jsmin.js");
});

test("closure", function (code, callback) {
  return child.execSync("java -jar gcc.jar --js " + filename);
});

test("uglify", function (code, callback) {
  return uglify.minify(code, {
    fromString: true,
    //mangle: false
  }).code;
});
