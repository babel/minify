# Setup

## Requirements

+ node >= 6
+ [yarn](https://yarnpkg.com) >= 1.0.0 (with yarn workspaces support)

## Clone

```sh
git clone https://github.com/babel/minify
cd minify
```

## Install Dependencies

```sh
yarn
```

## Build

To build **once**:

```sh
yarn build
```

Or to do an incremental build in watch mode:

```sh
yarn watch
```

## Use babel-minify's master branch in your project

If you're using the preset - link the preset package ([babel-preset-minify](../packages/babel-preset-minify)). If you're using the [CLI](../packages/babel-minify) or [babel-minify NodeAPI](../packages/babel-minify) or the [gulp plugin](../packages/gulp-babel-minify), link the relevant package to your project.

```sh
cd packages/babel-preset-minify
yarn link

cd /path/to/your-project
yarn link babel-preset-minify
```
