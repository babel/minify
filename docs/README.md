# Developing babel-minify

Note: These are docs about contributing to the project. The documentation for plugins, presets, helpers, CLI and other packages are found in the respective package directory's README.

The project structure is a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) same as the one followed in the [babel](https://github.com/babel/babel) project. Read more about this structure in [babel's monorepo design documentation](https://github.com/babel/babel/blob/master/doc/design/monorepo.md).

## Table of Contents

1. [Installation, build and run](setup.md)
1. [Linting and Testing](tests.md)
1. [Benchmark Scripts](benchmarks.md)
1. [Debugging Tips](debugging.md)
1. [Releasing packages](releasing.md)

## Canary Version

The packages of babel-minify (commits to master branch) are auto-published to npm with the **`canary`** tag.

To get the latest master branch of babel-minify,

```sh
yarn add "package-name"@canary

# for example
yarn add babel-minify@canary

# or
yarn add babel-preset-minify@canary
```
