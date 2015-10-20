#!/usr/bin/env node

var uglify = require("uglify-js");
var Table  = require("cli-table");
var child  = require("child_process");
var bytes  = require("bytes");
var chalk  = require("chalk");
var babel  = require("babel-core");
var zlib   = require("zlib");
var fs     = require("fs");

var t = babel.types;

var filename = process.argv[2];
if (!filename) {
  console.error("Error: No filename specified");
  process.exit(1);
}

var table = new Table({
  head: ["", "raw", "raw win", "gzip", "gzip win", "parse time"],
  chars: {
    top: "",
    "top-mid": "" ,
    "top-left": "" ,
    "top-right": "",
    bottom: "" ,
    "bottom-mid": "" ,
    "bottom-left": "" ,
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "" ,
    "right-mid": "",
    middle: " "
  },
  style: {
    "padding-left": 0,
    "padding-right": 0,
    head: ["bold"]
  }
});

var results = [];

var code = fs.readFileSync(filename, "utf8");
var gzippedCode = zlib.gzipSync(code);

function test(name, callback) {
  var start = Date.now();
  var result = callback(code);
  var end = Date.now();
  var now = end - start;

  fs.writeFileSync(name + ".js", result);

  var gzipped = zlib.gzipSync(result);

  var parseStart = Date.now();
  new Function(result);
  var parseEnd = Date.now();
  var parseNow = parseEnd - parseStart;

  results.push({
    name: name,
    raw: result.length,
    gzip: gzipped.length,
    parse: parseNow
  });
}

function mergeSort(array, cmp) {
  if (array.length < 2) return array.slice();

  function merge(a, b) {
    var r = [], ai = 0, bi = 0, i = 0;
    while (ai < a.length && bi < b.length) {
      cmp(a[ai], b[bi]) <= 0 ? r[i++] = a[ai++] : r[i++] = b[bi++];
    }
    if (ai < a.length) r.push.apply(r, a.slice(ai));
    if (bi < b.length) r.push.apply(r, b.slice(bi));
    return r;
  }

  function _ms(a) {
    if (a.length <= 1) return a;
    var m = Math.floor(a.length / 2), left = a.slice(0, m), right = a.slice(m);
    left = _ms(left);
    right = _ms(right);
    return merge(left, right);
  }

  return _ms(array);
}

function is_digit(code) {
    return code >= 48 && code <= 57;
}

var base54 = (function() {
  var string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";
  var chars, frequency;

  function reset() {
    frequency = Object.create(null);

    chars = string.split("").map(function (ch) {
      return ch.charCodeAt(0);
    });

    chars.forEach(function (ch) {
      frequency[ch] = 0;
    });
  }

  base54.consider = function(str){
    for (var i = str.length; --i >= 0;) {
      var code = str.charCodeAt(i);
      if (code in frequency) ++frequency[code];
    }
  };

  base54.sort = function() {
    chars = mergeSort(chars, function(a, b){
      if (is_digit(a) && !is_digit(b)) return 1;
      if (is_digit(b) && !is_digit(a)) return -1;
      return frequency[b] - frequency[a];
    });
  };

  base54.reset = reset;
  reset();

  base54.get = function () {
    return chars;
  };

  base54.freq = function () {
    return frequency;
  };

  function base54(num) {
    var ret = "", base = 54;
    num++;
    do {
      num--;
      ret += String.fromCharCode(chars[num % base]);
      num = Math.floor(num / base);
      base = 64;
    } while (num > 0);
    return ret;
  };
  return base54;
})();

var base54Plugin = new babel.Plugin("base54", {
  visitor: {
    Program: {
      exit: function () {
        base54.sort();
      }
    },

    "FunctionExpression|FunctionDeclaration": function () {
      base54.consider("function");
    },

    "ClassExpression|ClassDeclaration": function () {
      base54.consider("class");
    },

    Identifier: function (node) {
      base54.consider(node.name);
    },

    ReturnStatement: function (){
      base54.consider("return");
    },

    ThrowStatement: function (){
      base54.consider("throw");
    },

    ContinueStatement: function (){
      base54.consider("continue");
    },

    BreakStatement: function (){
      base54.consider("break");
    },

    DebuggerStatement: function (){
      base54.consider("debugger");
    },

    WhileStatement: function (){
      base54.consider("while");
    },

    DoWhileStatement: function (){
      base54.consider("do while");
    },

    For: function (){
      base54.consider("for");
    },

    ForInStatement: function (){
      base54.consider("in");
    },

    ForOfStatement: function (){
      base54.consider("of");
    },

    IfStatement: function (node) {
      base54.consider("if");
      if (node.alternate) base54.consider("else");
    },

    VariableDeclaration: function (node) {
      base54.consider(node.kind);
    },

    NewExpression: function (node) {
      base54.consider("new");
    },

    ThisExpression: function (node) {
      base54.consider("this");
    },

    TryStatement: function () {
      base54.consider("try");
    }
  }
});

function canUse(name, scope) {
  var binding = scope.getBinding(name);
  return true;
  if (binding) {
    var refs = binding.referencePaths;

    // go through all references
    for (var i = 0; i < refs.length; i++) {
      var ref = refs[i];

      // then crawl their scopes upwards, looking to see if one of these references
      // is in this scope
      var myScope = ref.scope;
      do {
        if (myScope === scope) {
          return false;
        }
      } while(myScope = myScope.parent);
    }
  }

  return true;
}

var miscPlugin = new babel.Plugin("dead-code-elimination", {
  metadata: {
    group: "builtin-pre"
  },

  visitor: {
    // undefined -> void 0
    ReferencedIdentifier: function (node) {
      if (node.name === "undefined") {
        return t.unaryExpression("void", t.literal(0), true);
      }
    },

    // mangle names
    Scope: {
      exit: function (node, parent, scope) {
        var bindings = scope.bindings;
        scope.bindings = {};

        var names = Object.keys(bindings);
        names = names.sort(function (a, b) {
          return bindings[a].references < bindings[b].references;
        });

        for (var k = 0; k < names.length; k++) {
          var name = names[k];
          var binding = bindings[name];
          var refs = binding._renameRefs;
          if (!refs) continue;

          var newName;
          var i = 0;
          while (!newName || !t.isValidIdentifier(newName) || !canUse(newName, scope)) {
            newName = base54(++i);
          }
          scope.bindings[newName] = binding;

          for (var i = 0; i < refs.length; i++) {
            var ref = refs[i];
            ref.name = newName;
          }
        }
      }
    },

    "ReferencedIdentifier|BindingIdentifier": function (node, parent, scope) {
      var renamed = scope.getBinding(node.name);
      if (renamed) {
        renamed._renameRefs = renamed._renameRefs || [];
        renamed._renameRefs.push(node);
      }
    },

    // remove side effectless statement
    ExpressionStatement: function (node) {
      if (this.scope.isStatic(node.expression) && !this.isCompletionRecord()) {
        this.dangerouslyRemove();
      }
    },

    // turn blocked ifs into single statements
    IfStatement: function (node) {
      coerceIf("consequent");
      coerceIf("alternate");

      if (node.consequent && !node.alternate && node.consequent.type === "ExpressionStatement" && !this.isCompletionRecord()) {
        return t.expressionStatement(t.binaryExpression("&&", node.test, node.consequent.expression));
      }

      function coerceIf(key) {
        var block = node[key];
        if (!block || block.type !== "BlockStatement") return;

        var body = block.body;
        if (body.length !== 1) return;

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
    whitelist: [],
    optional: [
      'minification.memberExpressionLiterals',
      'minification.propertyLiterals',
    ],
    plugins: [
      "merge-sibling-variables",
      "simplify-comparison-operators",
      "minify-booleans",
//      "member-expression-literals",
      //"dead-code-elimination",
//      "property-literals",
      //"constant-folding",
      base54Plugin,
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
  return child.execSync("java -jar gcc.jar --jscomp_off=uselessCode --js " + filename);
});

test("uglify", function (code, callback) {
  return uglify.minify(code, {
    fromString: true
  }).code;
});

results = results.sort(function (a, b) {
  return a.gzip > b.gzip;
});

results.forEach(function (result, i) {
  var row = [
    chalk.bold(result.name),
    bytes(result.raw),
    Math.round(((code.length / result.raw) * 100) - 100) + "%",
    bytes(result.gzip),
    Math.round(((gzippedCode.length / result.gzip) * 100) - 100) + "%",
    Math.round(result.parse) + "ms"
  ];

  var style = chalk.yellow;
  if (i === 0) style = chalk.green;
  if (i === results.length - 1) style = chalk.red;
  row = row.map(function (item) {
    return style(item);
  });

  table.push(row);
});

console.log(table.toString());
