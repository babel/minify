## Contributing

### Setup
```sh
$ git clone https://github.com/babel/babili
$ cd babili
$ npm install
$ npm run bootstrap
```

Then you can either run:

```sh
$ npm run build
```

to build Babel **once** or:

```sh
$ npm run watch
```

to have Babel build itself then incrementally build files on change.

To run tests:

```sh
$ npm test
```

To run lint:

```sh
$ npm run lint
```

To run lint autofixes:

```sh
$ npm run fix
```

To run current benchmarks on a file:

```sh
$ ./scripts/benchmark.js package [file.js]
# do not remove package after installing to node_modules
$ ./scripts/benchmark.js package [file.js] --offline
```

To run current plugin timing on a file:

```sh
$ ./scripts/plugin-timing.js file.js
```

### Debugging

When you use babili in your project and you find that there is a bug that appeared ONLY when you used babili, it's most likely that there is a bug in Babili and you should definitely report it. Here are some guidelines that might help you drill down the issue. If it doesn't help you, you can of course create a minimal repro project with the bug and report it.

1. If there is an error in the console, as a first step, look around the code block where the error happens, and the code block of a few steps up in the stack.
2. Try to predict the error and try relating it to some of the plugin names in the [packages/](packages) directory. The major ones (that do a lot of transformations) are - mangle, deadcode-elimination, simplify.
3. Every plugin that babili uses has an option in preset to toggle it on/off - [preset-options](packages/babel-preset-babili#options)
4. Once you suspect a few of the transformations that you think likely caused that bug, try toggling that from the preset. As a good practice, if you think it's NOT a mangler bug, turn OFF mangling and you should see the unmangled variable names to debug easier.
5. Sometimes it is NOT might not be a bug with ONLY one plugin, but the combinations of transformations. Again, deadcode and simplify are the major ones. You can start suspecting them first.
6. Sometimes it might because of the [unsafe transformations](packages/babel-preset-babili#option-groups). Some of them are grouped into a single option named `unsafe`. This option can help you identify it sooner if the bug is in one these plugins.
7. Produce a minimal repro of the same issue - the function block containing the bug should be enough to help reproduce the bug.
8. [Report it 🙂](https://github.com/babel/babili/issues/new)
9. You're awesome. Thanks!

#### Mangler bugs

This should be the easy one. If there is an error thrown in your code which you can see it in the console,

1. Just open the devtools and look at the variable that's mismatched (Usually it is the one that's in the Error message. If you have try..catch, add breakpoints in the try block and get the variable name that's faulty).
2. In current babili, there is no variable reuse (Fix in [#284](https://github.com/babel/babili/pull/284)). So, every variable that you see is declared ONLY ONCE. So it should be pretty easy to find that one declaration in your code.
3. Now, it boils down to finding that variable(or variables) which caused this error.
4. Usually, the containing function mapped to your original source code should help you reproduce the same error.
5. [Report it 🙂](https://github.com/babel/babili/issues/new)
6. You're awesome. Thanks!

### Releasing

> If you are releasing a new package, you'll want to run `./scripts/npm-owner-update.sh` to add all owners to the new npm package after releasing. Or do it manually via `https://www.npmjs.com/package/package-name-here/access`.

If you need to update deps run `npm run clean` and then `npm run bootstrap`.

To get the changelog, run `npm run changelog` to print to the terminal.

Use `npm run publish`. It will run `lerna publish` (we use `--independent`) so it will prompt the version number for every package.
