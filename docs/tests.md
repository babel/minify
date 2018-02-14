# Tests

## Lint

This project uses [prettier](https://github.com/prettier/prettier) for formatting code and [eslint](https://github.com/eslint/eslint) for other linting.

```sh
yarn lint
```

### Lint Fix

To fix formatting and other auto-fixable eslint errors,

```sh
yarn fix
```

## Check Staged Files

Lint and Test staged files

```sh
yarn lint-staged
```

## Test

To run all tests,

```sh
yarn test
```

To run tests for a specific package,

```sh
yarn test packages/babel-preset-minify
```

## Test files and directory structure

We use [jest](https://github.com/facebook/jest) for testing and follow this directory structure -

```
packages/
  - babel-plugin-minify-mangle-names/
    - __tests__/
      - fixtures/
        - fixture-name/
          - actual.js                   # source
          - expected.js                 # minify transforms applied (except whitespace & comments)

        - a-skipped-test/
          - actual.js                   # source
          - skip                        # an empty file to indicate test.skip

        - test-plugin-with-opts/
          - actual.js                   # source
          - options.json                # options passed to plugin during transform
          - expected.js

      - index.js                        # to run fixture tests
      - mangle-names-test.js            # to run tests which don't fit into fixtures
```

### Updating fixtures

Fixtures are auto updatable like jest's snapshots. It is possible to either update all fixtures of a particular plugin or of all plugins using the `--update-fixtures` option. Updating a fixture means updating the `expected.js` file of a fixture.

To update fixtures of a particular plugin,

```sh
$(yarn bin)/jest packages/plugin-name -- --update-fixtures
```

Since jest throws when unknown CLI arguments are passed, an extra `--` is required to be passed to the test-runner.

And to update all fixtures of all packages

```sh
$(yarn bin)/jest ./ -- --update-fixtures
```

## Smoke Tests

Prepare:

```sh
git submodule init
git submodule update
```

Run:

```sh
node smoke/run.js [options] [inputTests...]
```

Usage:

```
Usage: run [options] [inputTests...]

  Options:

    -h, --help         output usage information
    -i --skip-install  Skip Install Step
    -b --skip-build    Skip Build step
    -c --skip-cleanup  Skip cleanup step
    -q --quiet         Quiet mode
```

Example:

To build and test `lodash`,

```sh
node smoke/run.js lodash
```

To run smoke test without re-building and re-installing again

```sh
node smoke/run.js -ib lodash
```
