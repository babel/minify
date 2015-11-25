jest.autoMockOff();

const babel = require('babel-core');

function transform(code) {
  return babel.transform(code,  {
    plugins: [require('../index')],
  }).code;
}

describe('mangle-names', () => {
  it('should not mangle names in the global namespace', () => {
    const source = unpad(`
      var Foo = 1;
    `);
    const expected = unpad(`
      var Foo = 1;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should mangle names', () => {
    const source = unpad(`
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        var a = 1;
        if (a) {
          console.log(a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should handle name collisions', () => {
    const source = unpad(`
      function foo() {
        var x = 2;
        var xxx = 1;
        if (xxx) {
          console.log(xxx + x);
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        var a = 2;
        var b = 1;
        if (b) {
          console.log(b + a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should be fine with shadowing', () => {
    const source = unpad(`
      var a = 1;
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `);
    const expected = unpad(`
      var a = 1;
      function foo() {
        var a = 1;
        if (a) {
          console.log(a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should not shadow outer references', () => {
    const source = unpad(`
      function bar() {
        function foo(a, b, c) {
          lol(a,b,c);
        }

        function lol() {}
      }
    `);
    const expected = unpad(`
      function bar() {
        function a(c, d, e) {
          b(c, d, e);
        }

        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should not shadow outer references 2', () => {
    const source = `
__d(function(require) {
var ErrorUtilsConfig = {};

var eprintf = require('eprintf');
var erx = require('erx');
var removeFromArray = require('removeFromArray');

var ANONYMOUS_GUARD_TAG = '<anonymous guard>';
var GENERATED_GUARD_TAG = '<generated guard>';
var GLOBAL_ERROR_HANDLER_TAG = (typeof window === 'undefined') ?
  '<self.onerror>' : // It would be better if self is replaced by worker name
  '<window.onerror>';

var HTTP_OR_HTTPS_URI_PATTERN = /^https?:\/\//i;
var TYPECHECKER_ERROR_PATTERN = /^Type Mismatch for/;

// These are possible values in stack frame's script property besides normal
// URIs when it's IE. If you saw them in normalized stack frames, e.g. Scuba
// x_js_error, you can look up their meanings here.
var IE_STACK_TRACE_REFERENCES = [
  'Unknown script code', // (probably programmatically) injected script tag,
  'Function code',
  'eval code'
];
var IE_STACK_FRAME_PATTERN =
  new RegExp('(.*?)(\\s)(?:' + IE_STACK_TRACE_REFERENCES.join('|') + ')$');

var IE_AND_OTHER_FRAME_PATTERN = /(.*)(@|\s)[^\s]+$/;

// Callbacks to notify of errors
var listeners = [];

// Source resolver is only set and used by m-site when ScriptLoader is in use
var sourceResolver;

// Cache of the first MAX_HISTORY errors in the page
var history = [];
var MAX_HISTORY = 50;

var guardList = [];

// Returns true if we're inside applyWithGuard() call
var isGuarding = false;

// Returns true if we're currently reporting errors to listeners
// during that time further errors won't be reported to avoid infinite loops
var isReporting = false;

var nocatch =
  ErrorUtilsConfig.nocatch ||
  (/nocatch/).test(location.search);

/**
 * Normalizes the stack trace for Opera, Firefox and Chrome into the format used
 * by Chrome.
 */
function normalizeStack(input) {
  if (!input) {
    return [];
  }
  var stack = input
      .map(function(frame) {
    var identifier, line, col;

    frame = frame.trim();
    // First extract the line and col, these are always in the same format
    if (/(:(\d+)(:(\d+))?)$/.test(frame)) {
      line = RegExp.$2;
      col = RegExp.$4;
      frame = frame.slice(0, -RegExp.$1.length);
    }
    // Now, extract the part matching the function identifier.

    if (
      IE_STACK_FRAME_PATTERN.test(frame) || /* IE */
      IE_AND_OTHER_FRAME_PATTERN.test(frame) /* IE and Everyone else */
    ) {
      frame = frame.substring(RegExp.$1.length + 1);
      identifier =
        /(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1) ? RegExp.$2 : '';
    }

    var stackFrame = {
      identifier: identifier,
      script: frame,
      line: line,
      column: col
    };

    if (sourceResolver) {
      sourceResolver(stackFrame);
    }

    // return using a pattern matching that of Chrome
    stackFrame.text = '    at'
      + (stackFrame.identifier ? ' ' + stackFrame.identifier + ' (' : ' ')
      + stackFrame.script
      + (stackFrame.line ? ':' + stackFrame.line : '')
      + (stackFrame.column ? ':' + stackFrame.column : '')
      + (stackFrame.identifier ? ')' : '');

    return stackFrame;
  });

  return stack;
}

/**
 * Normalize properties in Error objects across browsers. This has the dual
 * benefits of copying the state off an error object (which tends to get GC'ed
 * at unexpected/awkward times) and providing predictable names for that state.
 *
 * @see http://broofa.com/tests/ErrorProperties.htm
 */
function normalizeError(err) {
  if (!err) {
    return {};
  } else if (err._originalError) {
    return err;
  }

  var stackData = normalizeStack(err.stackTrace || err.stack);
  var stackPopped = false;

  if (err.framesToPop) {
    // used by TypeChecker, invariant and other error throwers.
    var framesToPop = err.framesToPop;
    var lastPoppedFrame;
    while (framesToPop > 0 && stackData.length > 0) {
      lastPoppedFrame = stackData.shift();
      framesToPop--;
      stackPopped = true;
    }
    if (
      TYPECHECKER_ERROR_PATTERN.test(err.message) &&
      err.framesToPop === 2 &&
      lastPoppedFrame
    ) {
      // this is for TypeChecker. in order to avoid grouping different type
      // check error with same argument name and type together, we append uri
      // and line to the error message. we do that when they can be mapped back
      // to source code, otherwise we would separate same error with different
      // messages.
      if (HTTP_OR_HTTPS_URI_PATTERN.test(lastPoppedFrame.script)) {
        err.message += ' at ' + lastPoppedFrame.script
          + (lastPoppedFrame.line ? ':' + lastPoppedFrame.line : '')
          + (lastPoppedFrame.column ? ':' + lastPoppedFrame.column : '');
      }
    }
    delete err.framesToPop;
  }

  var info = {
    line:
      err.lineNumber ||
      err.line,
    column:
      err.columnNumber ||
      err.column,
    name: err.name,
    message: err.message,
    messageWithParams: err.messageWithParams,
    type: err.type,
    script:
      err.fileName ||
      err.sourceURL ||
      err.script,
    stack: stackData.map(function(frame) { return frame.text; }).join(''),
    stackFrames: stackData,
    guard: err.guard,
    guardList: err.guardList,
    extra: err.extra, /* tags to override MJSErrorExtra */
    snapshot: err.snapshot /* usually from DocumentSnapShot */
  };

  if (typeof info.message === 'string' && !info.messageWithParams) {
    info.messageWithParams = erx(info.message);
    info.message = eprintf.apply(global, info.messageWithParams);
  } else {
    info.messageObject = info.message;
    info.message = String(info.message);
  }

  // because error has script and line properties just like a stack frame,
  // we can pass it to sourceResolver just like a stack frame.
  if (sourceResolver) {
    sourceResolver(info);
  }

  // if first stack is popped, original script, line, column properties are
  // wrong, and they should be filled by current first stack or left empty.
  if (stackPopped) {
    delete info.script;
    delete info.line;
    delete info.column;
  }

  // fill in missing script, line, column properties from first stack frame.
  if (stackData[0]) {
    info.script = info.script || stackData[0].script;
    info.line = info.line || stackData[0].line;
    info.column = info.column || stackData[0].column;
  }

  // Keep a reference to the original error
  info._originalError = err;

  // Clear out unspecified properties
  for (var k in info) {
    (info[k] == null && delete info[k]);
  }
  return info;
}

/**
 * @param err Error to report (will be normalized as necessary)
 * @param quiet suppresses console output if true
 */
function reportError(err, quiet) {
  if (isReporting) {
    // already in the process of reporting errors
    console.error('Error reported during error processing', err);
    return false;
  }

  // fill in guard and guardList properties even if it's not caught by
  // applyWithGuard as long as there is any guard in context
  if (guardList.length > 0) {
    err.guard = err.guard || guardList[0];
    err.guardList = guardList.slice();
  }

  err = normalizeError(err);
  if (!quiet) {
    // Stack traces that point here are probably wrong.  err.stack may
    // contain the correct trace.  To fix this, use the 'js_nocatch'
    // gatekeeper to opt out of error catching/guarding.
    console.error(err._originalError.message + '' +
      err.stack + '' +
      'Original error:' + err._originalError);
  }

  // Cache early errors for playback to listeners
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY / 2, 1);
  }
  history.push(err);

  isReporting = true;
  for (var i = 0; i < listeners.length; i++) {
    try {
      listeners[i](err);
    } catch (e) {
      console.error('Error thrown from listener during error processing', e);
    }
  }
  isReporting = false;
  return true;
}

// Returns true if we're inside applyWithGuard() call
function inGuard() {
  return isGuarding;
}

function pushGuard(name) {
  guardList.unshift(name);
  isGuarding = true;
}

function popGuard() {
  guardList.shift();
  isGuarding = (guardList.length !== 0);
}

/**
 * Call a function while guarding against errors.
 *
 * @param func (Function) function to invoke
 * @param context (Object) 'this' context
 * @param args (Array) arguments to pass to func
 * @param onError (Function) Called if an error occurs.  Gets one argument, the
 *                normalized error object that will be passed to ERROR event
 *                listeners
 * @param name (?String) name of the guard and will be used as guard property
 *             of the error
 */
function applyWithGuard(func, context, args, onError, name) {
  pushGuard(name || ANONYMOUS_GUARD_TAG);

  var returnValue;

  // TODO (cpojer|#2497966): Remove this after disabling channel iframe for
  // IE8-9 and use ErrorUtilsConfig. This check is inlined in applyWithGuard

  if (require('Env').nocatch) {
    nocatch = true;
  }

  if (nocatch) {
    try {
      returnValue = func.apply(context, args || []);
    } finally {
      // IE: finally block won't be triggered if there's no catch block, and
      //     this only happens when testing with IE on sandbox. details:
      //     http://fburl.com/ie-try-finally-bug
      popGuard();
    }
    return returnValue;
  }

  try {
    // IE8: Function#apply throws if you pass null args parameter
    returnValue = func.apply(context, args || []);
    return returnValue;
  } catch (ex) {
    var err = normalizeError(ex);
    if (onError) {
      onError(err);
    }

    // function args can provide valuable debug info. add it to normalized err
    if (func) {
      err.callee = func.toString().substring(0, 100);
    }
    if (args) {
      err.args = Array.prototype.slice.call(args).toString().substring(0, 100);
    }
    err.guard = guardList[0]; // for compatibility of original single guard
    err.guardList = guardList.slice();

    if (__DEV__) {
      // Warn (once) about error catching being enabled
      if (!nocatch && !applyWithGuard.warned) {
        console.warn('Note: Error catching is enabled, which may lead to ' +
          'misleading stack traces in the JS debugger.  To disable, ' +
          'whitelist yourself in the "js_nocatch" gatekeeper.  See ' +
          'ErrorUtils.js for more info.');
        applyWithGuard.warned = true;
      }
    }

    reportError(err);
  } finally {
    popGuard();
  }
}
});
    `;
    const expected = unpad(`
      function bar(a) {
        function a(c, d, e) {
          b(c, d, e);
        }

        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should mangle args', () => {
    const expected = unpad(`
      function foo(a) {
        if (a) {
          console.log(a);
        }
      }
    `);
    const source = unpad(`
      function foo(xxx) {
        if (xxx) {
          console.log(xxx);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });
});

function unpad(str) {
  const lines = str.split('\n');
  const m = lines[1] && lines[1].match(/^\s+/);
  if (!m) {
    return str;
  }
  const spaces = m[0].length;
  return lines.map(
    line => line.slice(spaces)
  ).join('\n').trim();
}
