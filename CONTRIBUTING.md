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
```

To run current plugin timing on a file:

```sh
$ ./scripts/plugin-timing.js file.js
```

### Releasing

Use `npm run publish`. It will run `lerna publish` (we use --independent) so it will prompt the version number for every package.

If you are releasing a new package, you'll want to run `./scripts/npm-owner-update.sh` to add all owners to the new npm package. 
