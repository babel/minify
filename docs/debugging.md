# Debugging

In your project, if you find that there is a bug that appears ONLY when you use BabelMinify, it's most likely that there is a bug in BabelMinify and you should definitely report it. Here are some guidelines that might help you drill down the issue. If it doesn't help you, you can of course create a minimal repro project with the bug and report it.

## Compile time Errors

If you get a syntax error at compile time, then it could be a few things:

1. The code is actually invalid syntax.
1. You didn't turn on the relevant Babel plugin for that syntax (if experimental).
1. The parser itself doesn't handle the syntax being used (a [babylon](https://github.com/babel/babel/tree/master/packages/babylon) bug).

If the syntax error occurs at runtime,  it likely means the code generator ([babel-generator](https://github.com/babel/babel/tree/master/packages/babel-generator)) has a bug and has output invalid code.

## Runtime errors

When you run your minified code in the browser,

1. If there is an error in the console, as a first step, look around the code block where the error happens, and the code block of a few steps up in the stack.
1. Try to predict what caused the error and try relating it to some of the plugin names in the [packages/](https://github.com/babel/minify/tree/master/packages) directory. The major ones (that do a lot of transformations) are - mangle, deadcode-elimination and simplify.
1. Every plugin that Babel-Minify uses has an option in preset to toggle it on/off - [preset-options](https://github.com/babel/minify/tree/master/packages/babel-preset-minify#options)
1. Disable any transformation(s) that you suspect are causing problems. Turning OFF mangling (`mangle: false`) is a good practice if you don't think it's related to a mangling bug, since unmangled variable names will make debugging easier.
1. Sometimes it might NOT be a bug with one plugin but a combination of plugins. Again, `deadcode-elimination` and `simplify` maybe good candidates to start with here as they perform many transformations.
1. Sometimes it might because of the [unsafe transformations](https://github.com/babel/minify/tree/master/packages/babel-preset-minify#option-groups). Some of them are grouped into a single option named `unsafe`. This option can help you identify it sooner if the bug is in one these plugins.
1. Produce a minimal repro of the same issue - the function block containing the bug should be enough to help reproduce the bug.
1. [Report it 🙂](https://github.com/babel/minify/issues/new)
1. You're awesome. Thanks!
