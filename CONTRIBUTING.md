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

### Releasing

> If you are releasing a new package, you'll want to run `./scripts/npm-owner-update.sh` to add all owners to the new npm package after releasing. Or do it manually via `https://www.npmjs.com/package/package-name-here/access`.

If you need to update deps run `npm run clean` and then `npm run bootstrap`.

To get the changelog, run `npm run changelog` to print to the terminal.

Use `npm run publish`. It will run `lerna publish` (we use `--independent`) so it will prompt the version number for every package.
