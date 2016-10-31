## Changelog for 2016-10-31

- babel-helper-to-multiple-sequence-expressions: 0.0.1 => 0.0.2
- babel-plugin-minify-dead-code-elimination: 0.0.4 => 0.1.0
- babel-plugin-minify-mangle-names: 0.0.3 => 0.0.4
- babel-plugin-minify-numeric-literals: 0.0.1 => 0.0.2
- babel-plugin-minify-simplify: 0.0.3 => 0.0.4
- babel-plugin-minify-type-constructors: 0.0.1 => 0.0.2
- babel-plugin-transform-regexp-constructors: 0.0.1 => 0.0.1
- babel-preset-babili: 0.0.5 => 0.0.8
- babili: 0.0.7 => 0.0.8

#### New Feature
* `babel-plugin-minify-numeric-literals`, `babel-preset-babili`
  * [#222](https://github.com/babel/babili/pull/222) Add numeric literals minification. ([@kangax](https://github.com/kangax))
  ```js
  [10000, 0x000001, 0o23420, 0b10011100010000]
  // =>
  [1e4, 1, 1e4, 1e4]
  ```
* `babel-plugin-transform-regexp-constructors`
  * [#196](https://github.com/babel/babili/pull/196) Implemented transform-regexp-constructors plugin. ([@shinew](https://github.com/shinew))
  ```js
  var x = new RegExp('\\w+\\s')
  // =>
  var x = /\w+\s/
  ```
* `babel-plugin-minify-dead-code-elimination`
  * [#182](https://github.com/babel/babili/pull/182) Remove unused fn params. ([@boopathi](https://github.com/boopathi))
  ```js
  function foo(unused) { return 1 }
  // =>
  function foo() { return 1 }
  // To prevent this for code depending on foo.length, use keepFnArgs: true
  {
    plugins: [ ["minify-dead-code-elimination", { keepFnArgs: true }] ]
  }
  ```

#### Bug Fix
* `babel-plugin-minify-dead-code-elimination`
  * [#233](https://github.com/babel/babili/pull/233) Fix array and object patterns in DCE (close #232). ([@boopathi](https://github.com/boopathi))
  * [#225](https://github.com/babel/babili/pull/225) Fix DCE tests with labels in separate namespace. ([@boopathi](https://github.com/boopathi))
  * [#214](https://github.com/babel/babili/pull/214) support for for..of/for..await in DCE. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-simplify`
  * [#220](https://github.com/babel/babili/pull/220) Require blocks around single block-scope declaration. ([@boopathi](https://github.com/boopathi))
  * [#202](https://github.com/babel/babili/pull/202) Fix for merging of vars to successive for loop. ([@boopathi](https://github.com/boopathi))
* `babel-helper-to-multiple-sequence-expressions`, `babel-plugin-minify-simplify`
  * [#216](https://github.com/babel/babili/pull/216) Fix undefined in multiple sequence expressions (close #208). ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-type-constructors`
  * [#215](https://github.com/babel/babili/pull/215) Fix bug where invalid array length throws (close #206). ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-mangle-names`
  * [#201](https://github.com/babel/babili/pull/201) Fix bug - mangling of name "arguments". ([@boopathi](https://github.com/boopathi))
  * [#183](https://github.com/babel/babili/pull/183) Mangler - rename keepFnames to keepFnName. ([@boopathi](https://github.com/boopathi))

#### Internal
* Other
  * [#229](https://github.com/babel/babili/pull/229) add node 4,7, drop 5. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-minify-dead-code-elimination`
  * [#225](https://github.com/babel/babili/pull/225) Fix DCE tests with labels in separate namespace. ([@boopathi](https://github.com/boopathi))
  * [#218](https://github.com/babel/babili/pull/218) Add more tests for DCE'ing conditional expressions. ([@erikdesjardins](https://github.com/erikdesjardins))
* `babel-plugin-minify-mangle-names`
  * [#224](https://github.com/babel/babili/pull/224) Add test for labels shadow in mangle (close #185). ([@boopathi](https://github.com/boopathi))
* `babel-preset-babili`
  * [#211](https://github.com/babel/babili/pull/211) Adds babel-plugin-transform-regexp-constructors to preset.. ([@shinew](https://github.com/shinew))
* `babel-plugin-transform-regexp-constructors`, `babel-preset-babili`
  * [#199](https://github.com/babel/babili/pull/199) Integrated babel-plugin-transform-regexp-constructors into preset.. ([@shinew](https://github.com/shinew))

#### Commiters: 5
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Erik Desjardins ([erikdesjardins](https://github.com/erikdesjardins))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Juriy Zaytsev ([kangax](https://github.com/kangax))
- Shine Wang ([shinew](https://github.com/shinew))

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
