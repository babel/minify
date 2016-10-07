## Changelog for 2016-10-07
 
- babel-plugin-minify-dead-code-elimination@0.0.4
- babel-plugin-minify-guarded-expressions@0.0.3
- babel-preset-babili@0.0.5
- babili@0.0.7
 
#### Bug Fix
 
* `babel-plugin-minify-guarded-expressions`
 * [#179](https://github.com/babel/babili/pull/179) Fix guarded expressions being utilized elsewhere. Fixes #171,#174,#176 ([@boopathi](https://github.com/boopathi))
 
#### Deps
 
* `babel-plugin-dead-code-elimination`
 * [#180](https://github.com/babel/babili/pull/180) Use modularized lodash. ([@boopathi](https://github.com/boopathi))
 
## Changelog for 2016-09-30

 - babel-plugin-minify-dead-code-elimination@0.0.3
 - babel-preset-babili@0.0.4
 - babili@0.0.6
 
#### Bug Fix

* `babili`
  * [#166](https://github.com/babel/babili/pull/166) use process.execPath when spawing cli. Fixes #108 ([@rossipedia](https://github.com/rossipedia))
 
Should fix windows support for the cli.

* `babel-plugin-minify-dead-code-elimination`
  * [#155](https://github.com/babel/babili/pull/155) Fix DCE for ArrayPatterns and ObjectPatterns (#155) ([@boopathi](https://github.com/boopathi))
  
```js
// bail out when destructuring with a variable
const me = lyfe => {
  const [swag] = lyfe;
  return swag;
};
 ```

* [#169](https://github.com/babel/babili/pull/169) Fix var hoisting bug in DCE (#169) ([@boopathi](https://github.com/boopathi))

```
// var hoisting but not let/const
function foo() {
  a = 1;
  return a;
  var a;
}
 ```

## Changelog for 2016-09-20

- babel-plugin-minify-dead-code-elimination@0.0.2
- babel-plugin-minify-guarded-expressions@0.0.2
- babel-plugin-minify-mangle-names@0.0.3
- babel-plugin-minify-simplify@0.0.3
- babel-plugin-transform-merge-sibling-variables@0.0.2
- babel-preset-babili@0.0.3
- babili@0.0.5

#### Bug Fix
* `babel-plugin-minify-guarded-expressions`
  * [#160](https://github.com/babel/babili/pull/160) don't remove impure reachable parts of logical expressions. ([@goto-bus-stop](https://github.com/goto-bus-stop))
* `babel-plugin-transform-merge-sibling-variables`
  * [#157](https://github.com/babel/babili/pull/157) don't merge block-scoped sibling vars across scopes, Fixes [#153](https://github.com/babel/babili/issues/153). ([@goto-bus-stop](https://github.com/goto-bus-stop))
* `babel-plugin-minify-mangle-names`
  * [#140](https://github.com/babel/babili/pull/140) Mangle - Fix for classes and program scope. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-dead-code-elimination`
  * [ba50db](https://github.com/babel/babili/commit/ba50db58d8c366302e1f23ad1f30f5a5fe182f45) - Ensure parent node has declarations

#### Docs
* Other
  * [#136](https://github.com/babel/babili/pull/136) add changelog [skip ci]. ([@hzoo](https://github.com/hzoo))

#### Internal
* `babel-plugin-minify-simplify`
  * [#143](https://github.com/babel/babili/pull/143) Satisfy the "space-infix-ops" eslint rule. ([@gigabo](https://github.com/gigabo))
* `babel-plugin-minify-mangle-names`
  * [#134](https://github.com/babel/babili/pull/134) Mangler performance - some improvement. ([@boopathi](https://github.com/boopathi))

## Changelog for 2016-08-31

#### Bug Fix
* `babel-preset-babili`
  * [#135](https://github.com/babel/babili/pull/135) update older packages. ([@hzoo](https://github.com/hzoo))
  * [#125](https://github.com/babel/babili/pull/125) Revert "Throw upgrade error when babel version is less than 6.14.0". ([@kangax](https://github.com/kangax))
  * [#116](https://github.com/babel/babili/pull/116) Throw upgrade error when babel version is less than 6.14.0. ([@boopathi](https://github.com/boopathi))
* `babili`
  * [#128](https://github.com/babel/babili/pull/128) add `--no-babelrc` option. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-minify-mangle-names`, `babel-preset-babili`
  * [#123](https://github.com/babel/babili/pull/123) Add fix for other types of nodes in referencePaths. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-simplify`
  * [#119](https://github.com/babel/babili/pull/119) Fix bug - Conditionals transformation for impure paths. ([@boopathi](https://github.com/boopathi))

#### Docs
* Other
  * [#118](https://github.com/babel/babili/pull/118) Add link to repl [skip ci]. ([@boopathi](https://github.com/boopathi))
  * [#107](https://github.com/babel/babili/pull/107) Capitalise ECMAScript and Babel. ([@Daniel15](https://github.com/Daniel15))
  * [#104](https://github.com/babel/babili/pull/104) add a why [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-minify-dead-code-elimination`, `babel-plugin-minify-mangle-names`
  * [#111](https://github.com/babel/babili/pull/111) Add docs for mangle and dce options. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-flip-comparisons`
  * [#110](https://github.com/babel/babili/pull/110) minify-flip-comparisons: Explain why this optimization makes sense. ([@mathiasbynens](https://github.com/mathiasbynens))

#### Chore
* Other
  * [#121](https://github.com/babel/babili/pull/121) run test on publish [skip ci]. ([@hzoo](https://github.com/hzoo))
  * [#120](https://github.com/babel/babili/pull/120) Independent mode. ([@hzoo](https://github.com/hzoo))
  * [#101](https://github.com/babel/babili/pull/101) Update Closure Compiler to 20160822.0.0. ([@Dominator008](https://github.com/Dominator008))

#### Internal
* `babel-plugin-minify-mangle-names`
  * [#109](https://github.com/babel/babili/pull/109) Remove old Mangle renamer. ([@boopathi](https://github.com/boopathi))
