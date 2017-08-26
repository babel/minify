babel-minify-standalone
=======================

babel-minify-standalone is a standalone build of [babel-minify](https://github.com/babel/minify) for use in non-Node.js environments, including browsers.

But why?!
=========

It's true that using Babel (and babel-minify) through Webpack, Browserify or Gulp should be sufficient for most use cases. However, there are some valid use cases for babel-standalone:

 - Sites like [JSFiddle](https://jsfiddle.net/), [JS Bin](https://jsbin.com/), the [REPL on the Babel site](http://babeljs.io/repl/), etc. These sites compile user-provided JavaScript in real-time, and babel-minify could be used to provide on-the-fly minification and related statistics,
 - Apps that embed a JavaScript engine such as V8 directly, and want to use Babel for compilation and minification
  - Apps that want to use JavaScript as a scripting language for extending the app itself, including all the goodies that ES2015 provides.
  - Integration of Babel into a non-Node.js environment ([ReactJS.NET](http://reactjs.net/), [ruby-babel-transpiler](https://github.com/babel/ruby-babel-transpiler), [php-babel-transpiler](https://github.com/talyssonoc/php-babel-transpiler), etc).

Installation
============

There are several ways to get a copy of babel-minify. Pick whichever one you like:

- Use it via Unpkg: https://unpkg.com/babel-minify-standalone@0.x/babel-minify.min.js. This is a simple way to embed it on a webpage without having to do any other setup.
- Install via Bower: `bower install babili-standalone`
- Install via NPM: `npm install --save babel-minify`
- Manually grab `babel-minify.js` and/or `babel-minify.min.js` from the [GitHub releases page](https://github.com/Daniel15/babel-standalone/releases). Every release includes these files.

Usage
=====

Load `babel-minify.js` or `babel-minify.min.js` in your environment, **along with Babel-standalone**. This is important: You need to load Babel too!

This will load babel-minify's Babel plugins and preset, and expose a simple API in a `BabelMinify` object:

```js
var input = 'class Foo { constructor(bar) { this.bar = bar } }; new Foo()';
var output = BabelMinify.transform(input).code;
// class a{constructor(b){this.bar=b}};new a;
```
