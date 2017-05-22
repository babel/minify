## babili@0.1.1 (2017-05-22)

#### Summary

+ New rewritten `mangler` which shaves off lots of bytes. Check [Benchmarks](https://github.com/babel/babili#benchmarks) for info about how Babili compares with other minifiers.
+ The preset options are [flattened](https://github.com/babel/babili/tree/master/packages/babel-preset-babili#options)
+ Smoke tests
+ Project uses [Yarn](https://yarnpkg.com) & [Prettier](https://github.com/prettier/prettier)
+ And a lot of bug fixes (refer below)

<details>
<summary>Updated Pacakges:</summary>

 - babel-helper-evaluate-path@0.1.0
 - babel-helper-flip-expressions@0.1.1
 - babel-helper-is-void-0@0.1.1
 - babel-helper-mark-eval-scopes@0.1.1
 - babel-helper-remove-or-void@0.1.1
 - babel-helper-to-multiple-sequence-expressions@0.1.1
 - babel-plugin-minify-builtins@0.1.1
 - babel-plugin-minify-constant-folding@0.1.1
 - babel-plugin-minify-dead-code-elimination@0.1.6
 - babel-plugin-minify-flip-comparisons@0.1.1
 - babel-plugin-minify-guarded-expressions@0.1.1
 - babel-plugin-minify-infinity@0.1.1
 - babel-plugin-minify-mangle-names@0.1.1
 - babel-plugin-minify-numeric-literals@0.1.1
 - babel-plugin-minify-replace@0.1.1
 - babel-plugin-minify-simplify@0.1.1
 - babel-plugin-minify-type-constructors@0.1.1
 - babel-plugin-transform-inline-consecutive-adds@0.1.1
 - babel-plugin-transform-inline-environment-variables@0.1.1
 - babel-plugin-transform-member-expression-literals@6.8.3
 - babel-plugin-transform-merge-sibling-variables@6.8.4
 - babel-plugin-transform-minify-booleans@6.8.2
 - babel-plugin-transform-node-env-inline@0.1.1
 - babel-plugin-transform-property-literals@6.8.3
 - babel-plugin-transform-regexp-constructors@0.1.1
 - babel-plugin-transform-remove-console@6.8.3
 - babel-plugin-transform-remove-debugger@6.8.3
 - babel-plugin-transform-remove-undefined@0.1.1
 - babel-plugin-transform-simplify-comparison-operators@6.8.3
 - babel-plugin-transform-undefined-to-void@6.8.2
 - babel-preset-babili@0.1.1
 - babili@0.1.1
 - gulp-babili@0.1.1

</details>

#### :boom: Breaking Change
* `babel-preset-babili`
  * [#508](https://github.com/babel/babili/pull/508) Flatten options. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-constant-folding`
  * [#490](https://github.com/babel/babili/pull/490) Remove jsesc. ([@boopathi](https://github.com/boopathi))

#### :rocket: New Feature
* `babel-plugin-minify-mangle-names`
  * [#395](https://github.com/babel/babili/pull/395) Reuse removed vars in mangler. ([@boopathi](https://github.com/boopathi))

#### :bug: Bug Fix
* `babel-plugin-minify-builtins`
  * [#533](https://github.com/babel/babili/pull/533) handle deopt case in builtins properly. ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-plugin-transform-inline-consecutive-adds`
  * [#523](https://github.com/babel/babili/pull/523) Fix collapse with circular reference. ([@jhen0409](https://github.com/jhen0409))
* `babel-plugin-minify-mangle-names`
  * [#518](https://github.com/babel/babili/pull/518) Fix mangling of Named Exports in Modules. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-simplify`
  * [#517](https://github.com/babel/babili/pull/517) Fix crashing in simplify plugin. Deopt instead. ([@boopathi](https://github.com/boopathi))
  * [#482](https://github.com/babel/babili/pull/482) handle default statements with fallthrough properly [Closes [#423](https://github.com/babel/babili/issues/423)]. ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-plugin-minify-constant-folding`
  * [#490](https://github.com/babel/babili/pull/490) Remove jsesc. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-builtins`, `babel-plugin-minify-mangle-names`, `babel-preset-babili`
  * [#472](https://github.com/babel/babili/pull/472) fix builtins plugins from leaking vars. ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-plugin-transform-member-expression-literals`, `babel-plugin-transform-property-literals`
  * [#466](https://github.com/babel/babili/pull/466) Deopt number like properties (Closes [#464](https://github.com/babel/babili/issues/464)). ([@boopathi](https://github.com/boopathi))

#### :nail_care: Polish
* `babel-preset-babili`
  * [#508](https://github.com/babel/babili/pull/508) Flatten options. ([@boopathi](https://github.com/boopathi))

#### :memo: Documentation
* Other
  * [#496](https://github.com/babel/babili/pull/496) Use absolute links in CONTRIBUTING.md. ([@aaronang](https://github.com/aaronang))
  * [#494](https://github.com/babel/babili/pull/494) Add smoke test docs [skip ci]. ([@boopathi](https://github.com/boopathi))
  * [#480](https://github.com/babel/babili/pull/480) Update Contributing.md [skip ci]. ([@boopathi](https://github.com/boopathi))
  * [#475](https://github.com/babel/babili/pull/475) Update CONTRIBUTING.md [skip ci]. ([@alxpy](https://github.com/alxpy))
  * [#462](https://github.com/babel/babili/pull/462) Use absolute paths in CONTRIBUTING.md. ([@aaronang](https://github.com/aaronang))

#### :house: Internal
* Other
  * [#527](https://github.com/babel/babili/pull/527) Add butternut to benchmarks. ([@boopathi](https://github.com/boopathi))
  * [#504](https://github.com/babel/babili/pull/504) Add CircleCI badge [skip ci]. ([@boopathi](https://github.com/boopathi))
  * [#497](https://github.com/babel/babili/pull/497) Set static coverage % & disable patch. ([@boopathi](https://github.com/boopathi))
  * [#495](https://github.com/babel/babili/pull/495) Add Circle CI. ([@boopathi](https://github.com/boopathi))
  * [#492](https://github.com/babel/babili/pull/492) Smoke Tests. ([@boopathi](https://github.com/boopathi))
  * [#488](https://github.com/babel/babili/pull/488) Use Yarn. ([@boopathi](https://github.com/boopathi))
  * [#489](https://github.com/babel/babili/pull/489) Create benchmark_cache dir if it doesn't exist. ([@dirtybit](https://github.com/dirtybit))
  * [#474](https://github.com/babel/babili/pull/474) Enable code coverage. ([@alxpy](https://github.com/alxpy))
  * [#470](https://github.com/babel/babili/pull/470) Fix Benchmark scripts. ([@boopathi](https://github.com/boopathi))
  * [#478](https://github.com/babel/babili/pull/478) 🚀 Prettier. ([@boopathi](https://github.com/boopathi))

#### Chore
  * [#522](https://github.com/babel/babili/pull/522) Upgrade deps. ([@boopathi](https://github.com/boopathi))

#### Committers: 8
- Aaron Ang ([aaronang](https://github.com/aaronang))
- Alex Kuzmenko ([alxpy](https://github.com/alxpy))
- Andrew Start ([andrewstart](https://github.com/andrewstart))
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Jhen-Jie Hong ([jhen0409](https://github.com/jhen0409))
- Joshua Carter ([JoshuaCWebDeveloper](https://github.com/JoshuaCWebDeveloper))
- Sertac Olgunsoylu ([dirtybit](https://github.com/dirtybit))
- Vignesh Shanmugam ([vigneshshanmugam](https://github.com/vigneshshanmugam))

## babili@0.0.12 (2017-03-03)

- babel-helper-mark-eval-scopes@0.0.3
- babel-helper-to-multiple-sequence-expressions@0.0.4
- babel-plugin-minify-builtins@0.0.2
- babel-plugin-minify-dead-code-elimination@0.1.4
- babel-plugin-minify-mangle-names@0.0.8
- babel-plugin-minify-replace@0.0.4
- babel-plugin-minify-simplify@0.0.8
- babel-plugin-minify-type-constructors@0.0.4
- babel-plugin-transform-regexp-constructors@0.0.6
- babel-plugin-transform-remove-console@6.8.1
- babel-plugin-transform-remove-debugger@6.8.1
- babel-preset-babili@0.0.12
- babili@0.0.12
- gulp-babili@0.0.2

#### :boom: Breaking Change
* `babel-plugin-minify-empty-function`
  * [#444](https://github.com/babel/babili/pull/444) Remove minify-empty-function. ([@boopathi](https://github.com/boopathi))

#### :rocket: New Feature
* `gulp-babili`
  * [#318](https://github.com/babel/babili/pull/318) Gulp babili. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-builtins`, `babel-preset-babili`
  * [#410](https://github.com/babel/babili/pull/410) Implement minify-builtins plugin. ([@vigneshshanmugam](https://github.com/vigneshshanmugam))

#### :bug: Bug Fix
* `babel-plugin-minify-dead-code-elimination`
  * [#433](https://github.com/babel/babili/pull/433) Deopt do..while stmts with break. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-simplify`
  * [#408](https://github.com/babel/babili/pull/408) if_return - deopt when ref loses scope. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-transform-remove-console`, `babel-plugin-transform-remove-debugger`
  * [#421](https://github.com/babel/babili/pull/421) Fix remove console.* statements. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-mangle-names`
  * [#383](https://github.com/babel/babili/pull/383) Handle ClassDeclaration binding. ([@boopathi](https://github.com/boopathi))
  * [#414](https://github.com/babel/babili/pull/414) Fix mangler binding rename issue with duplicate names. ([@boopathi](https://github.com/boopathi))

#### :nail_care: Polish
* `babel-plugin-minify-mangle-names`
  * [#446](https://github.com/babel/babili/pull/446) Minor optimization for handling blacklisted names. ([@hzlmn](https://github.com/hzlmn))
* `babel-plugin-transform-regexp-constructors`
  * [#438](https://github.com/babel/babili/pull/438) Remove redundant `=== true` from conditional. ([@josephfrazier](https://github.com/josephfrazier))

#### :memo: Documentation
* Other
  * [#437](https://github.com/babel/babili/pull/437) Add Debugging guidelines [skip ci]. ([@boopathi](https://github.com/boopathi))

#### Chore
* `babili`
  * [#441](https://github.com/babel/babili/pull/441) chore(package): add description to babili package. ([@Haroenv](https://github.com/Haroenv))

#### Committers: 5
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Haroen Viaene ([Haroenv](https://github.com/Haroenv))
- Joseph Frazier ([josephfrazier](https://github.com/josephfrazier))
- Oleh Kuchuk ([hzlmn](https://github.com/hzlmn))
- Vignesh Shanmugam ([vigneshshanmugam](https://github.com/vigneshshanmugam))

## babili@0.0.11 (2017-02-08)

#### :bug: Bug Fix
* `babel-plugin-transform-merge-sibling-variables`, `babel-preset-babili`
  * [#403](https://github.com/babel/babili/pull/403) lift the declarations without mutating the node[Closes [#402](https://github.com/babel/babili/issues/402)]. ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-plugin-minify-mangle-names`
  * [#390](https://github.com/babel/babili/pull/390) Mark renamed paths in mangler. ([@boopathi](https://github.com/boopathi))
  * [#381](https://github.com/babel/babili/pull/381) Clear traverse cache and recrawl for mangler. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-dead-code-elimination`
  * [#391](https://github.com/babel/babili/pull/391) Inline hoisted, post-return declarations properly. ([@kangax](https://github.com/kangax))
* `babel-plugin-minify-constant-folding`, `babel-plugin-minify-dead-code-elimination`, `babel-preset-babili`
  * [#386](https://github.com/babel/babili/pull/386) DCE: Deopt impure statements in If.test. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-constant-folding`
  * [#384](https://github.com/babel/babili/pull/384) Escape "</script" when inlining strings. ([@kangax](https://github.com/kangax))
* `babel-plugin-transform-remove-undefined`
  * [#388](https://github.com/babel/babili/pull/388) Remove undef from seqExpr - (Closes [#373](https://github.com/babel/babili/issues/373)). ([@boopathi](https://github.com/boopathi))
  * [f83b06c4](https://github.com/babel/babili/commit/f83b06c4c5) Do not remove undefined if it's a local var. ([@kangax](https://github.com/kangax))
* `babel-helper-mark-eval-scopes`, `babel-plugin-minify-dead-code-elimination`, `babel-plugin-minify-mangle-names`
  * [#371](https://github.com/babel/babili/pull/371) Add mark eval scopes helper and deopt DCE fn unused params. ([@boopathi](https://github.com/boopathi))

#### :memo: Documentation
* Other
  * [#401](https://github.com/babel/babili/pull/401) Readme: plugin options cannot be set in babili cmd. ([@probins](https://github.com/probins))

#### Committers: 5
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Juriy Zaytsev ([kangax](https://github.com/kangax))
- Peter Robins ([probins](https://github.com/probins))
- Vignesh Shanmugam ([vigneshshanmugam](https://github.com/vigneshshanmugam))

## Babili v0.0.10: Changelog for 2017-01-18

 - babel-helper-flip-expressions@0.0.2
 - babel-helper-to-multiple-sequence-expressions@0.0.3
 - babel-plugin-minify-dead-code-elimination@0.1.2
 - babel-plugin-minify-flip-comparisons@0.0.2
 - babel-plugin-minify-guarded-expressions@0.0.4
 - babel-plugin-minify-mangle-names@0.0.6
 - babel-plugin-minify-simplify@0.0.6
 - babel-plugin-minify-type-constructors@0.0.3
 - babel-plugin-transform-inline-consecutive-adds@0.0.2
 - babel-plugin-transform-inline-environment-variables@0.0.2
 - babel-plugin-transform-member-expression-literals@6.8.1
 - babel-plugin-transform-merge-sibling-variables@6.8.1
 - babel-plugin-transform-node-env-inline@0.0.2
 - babel-plugin-transform-property-literals@6.8.1
 - babel-plugin-transform-regexp-constructors@0.0.5
 - babel-plugin-transform-remove-undefined@0.0.4
 - babel-plugin-transform-simplify-comparison-operators@6.8.1
 - babel-preset-babili@0.0.10
 - babili@0.0.10

#### :rocket: New Feature
* `babel-plugin-minify-dead-code-elimination`, `babel-plugin-minify-mangle-names`, `babel-preset-babili`
  * [#311](https://github.com/babel/babili/pull/311) add keepClassName as separate options (Closes [#298](https://github.com/babel/babili/issues/298)). ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-preset-babili`
  * [#162](https://github.com/babel/babili/pull/162) Minify Options. ([@boopathi](https://github.com/boopathi))

#### :bug: Bug Fix
* `babel-preset-babili`
  * [#325](https://github.com/babel/babili/pull/325) remove comments by default in babel-preset-babili. ([@hzoo](https://github.com/hzoo))
* `babili`
  * [#315](https://github.com/babel/babili/pull/315) resolve babili-preset relative to babili-cli. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-transform-merge-sibling-variables`
  * [#314](https://github.com/babel/babili/pull/314) dont lift declarations when not intialized (Closes [#309](https://github.com/babel/babili/issues/309)). ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-plugin-transform-regexp-constructors`
  * [#304](https://github.com/babel/babili/pull/304) Escape unicode newline in regex optimization. ([@SimonSelg](https://github.com/SimonSelg))
* `babel-plugin-minify-dead-code-elimination`
  * [#303](https://github.com/babel/babili/pull/303) Fix dce - recompute path & scope before pass. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-dead-code-elimination`, `babel-preset-babili`
  * [#292](https://github.com/babel/babili/pull/292) run DCE on program exit (Closes [#289](https://github.com/babel/babili/issues/289)). ([@vigneshshanmugam](https://github.com/vigneshshanmugam))

#### :memo: Documentation
* Other
  * [#348](https://github.com/babel/babili/pull/348) add install, removing #redundancy [skip ci]. ([@hzoo](https://github.com/hzoo))
* `babel-plugin-minify-simplify`
  * [#320](https://github.com/babel/babili/pull/320) Tweak simpify README. ([@existentialism](https://github.com/existentialism))
* `babel-preset-babili`
  * [#293](https://github.com/babel/babili/pull/293) [skip ci] Add preset options docs. ([@boopathi](https://github.com/boopathi))

#### :house: Internal
* [#335](https://github.com/babel/babili/pull/335) Add fb package and an option to bench local file. ([@kangax](https://github.com/kangax))
* [#148](https://github.com/babel/babili/pull/148) Improve benchmarks accuracy. ([@kangax](https://github.com/kangax))
* [#272](https://github.com/babel/babili/pull/272) Add plugin contribution. ([@boopathi](https://github.com/boopathi))
* [#319](https://github.com/babel/babili/pull/319) Remove dollar from sh snippets. ([@xtuc](https://github.com/xtuc))

#### Chore
* [#376](https://github.com/babel/babili/pull/376) devDeps: eslint-config-babel v5.0.0. ([@kaicataldo](https://github.com/kaicataldo))

#### Committers: 10
- Arnaud Marant ([amarant](https://github.com/amarant))
- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Brian Ng ([existentialism](https://github.com/existentialism))
- Chris Vaszauskas ([chrisvasz](https://github.com/chrisvasz))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Juriy Zaytsev ([kangax](https://github.com/kangax))
- Kai Cataldo ([kaicataldo](https://github.com/kaicataldo))
- Simon Selg ([SimonSelg](https://github.com/SimonSelg))
- Sven SAULEAU ([xtuc](https://github.com/xtuc))
- Vignesh Shanmugam ([vigneshshanmugam](https://github.com/vigneshshanmugam))

## Babili v0.0.9: Changelog for 2016-11-21

- babili: 0.0.8 => 0.0.9
- babel-preset-babili: 0.0.8 => 0.0.9
- babel-plugin-minify-constant-folding: 0.0.1 => 0.0.3
- babel-plugin-minify-dead-code-elimination: 0.1.0 => 0.1.1
- babel-plugin-minify-infinity: 0.0.1 => 0.0.3
- babel-plugin-minify-mangle-names: 0.0.4 => 0.0.5
- babel-plugin-minify-simplify: 0.0.4 => 0.0.5
- babel-plugin-transform-regexp-constructors: 0.0.1 => 0.0.4
- babel-plugin-transform-remove-undefined: 0.0.4 (new)
- babel-helper-evaluate-path: 0.0.3 (new)
- babel-helper-is-nodes-equiv: (removed)

### :rocket: New Feature

* `babel-plugin-transform-remove-undefined`
  * [#197](https://github.com/babel/babili/pull/197) Implemented transform-remove-undefined plugin. ([@shinew](https://github.com/shinew))
* `babel-plugin-minify-simplify`
  * [#230](https://github.com/babel/babili/pull/230) Shorten assignments to itself. ([@kangax](https://github.com/kangax))
* `babel-plugin-minify-dead-code-elimination`
  * [#248](https://github.com/babel/babili/pull/248) Remove Empty Functions in block. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-simplify`
  * [#277](https://github.com/babel/babili/pull/227) Minify some Logical Expression patterns. ([@boopathi](https://github.com/boopathi))

### :bug: Bug Fix

* `babel-plugin-minify-simplify`
  * [#240](https://github.com/babel/babili/pull/240) Fix labeled break stmt removal from last switch case. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-infinity`
  * [#241](https://github.com/babel/babili/pull/241) fix for infinity as lval. ([@vigneshshanmugam](https://github.com/vigneshshanmugam))
* `babel-helper-evaluate-path`, `babel-plugin-minify-constant-folding`
  * [#246](https://github.com/babel/babili/pull/246) Fix path.evaluate for runtime errors in constant-folding. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-transform-regexp-constructors`
  * [#256](https://github.com/babel/babili/pull/256) Fix regexp escape. ([@kangax](https://github.com/kangax))
* `babel-plugin-transform-regexp-constructors`
  * [#264](https://github.com/babel/babili/pull/264) RegExp literal fixes. ([@shinew](https://github.com/shinew))
* `babel-plugin-minify-dead-code-elimination`, `babel-plugin-minify-simplify`
  * [#266](https://github.com/babel/babili/pull/266) Fix if_return & dce ifelse..return within loops. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-dead-code-elimination`
  * [#270](https://github.com/babel/babili/pull/270) Fix dce: don't remove fn param from setters. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-simplify`
  * [#282](https://github.com/babel/babili/pull/282) Don't transform earlyReturn on function enter. ([@boopathi](https://github.com/boopathi))

### :house: Internal

* `babel-plugin-minify-simplify`
  * [#234](https://github.com/babel/babili/pull/234) Pattern match tests and bug fixes. ([@boopathi](https://github.com/boopathi))
* `babel-plugin-minify-dead-code-elimination`
  * [#244](https://github.com/babel/babili/pull/244) Ensure binding exists. ([@kangax](https://github.com/kangax))
* Benchmarks
  * [#271](https://github.com/babel/babili/pull/271) benchmark npm packages directly. ([@garyjN7](https://github.com/garyjN7))
* `babel-plugin-minify-simplify`
  * [#276](https://github.com/babel/babili/pull/276) Remove helper, use the built-in t.isNodesEquivalent. ([@hzoo](https://github.com/hzoo))
* Use babel preset env
  * [#277](https://github.com/babel/babili/pull/277) compile to node 4. ([@hzoo](https://github.com/hzoo))

### Commiters: 6

- Boopathi Rajaa ([boopathi](https://github.com/boopathi))
- Gary Johnson ([garyjN7](https://github.com/garyjN7))
- Henry Zhu ([hzoo](https://github.com/hzoo))
- Juriy Zaytsev ([kangax](https://github.com/kangax))
- Shine Wang ([shinew](https://github.com/shinew))
- Vignesh Shanmugam ([vigneshshanmugam](https://github.com/vigneshshanmugam))

## Babili v0.0.8: Changelog for 2016-10-31

- babili: 0.0.7 => 0.0.8
- babel-preset-babili: 0.0.5 => 0.0.8
- babel-helper-to-multiple-sequence-expressions: 0.0.1 => 0.0.2
- babel-plugin-minify-dead-code-elimination: 0.0.4 => 0.1.0
- babel-plugin-minify-mangle-names: 0.0.3 => 0.0.4
- babel-plugin-minify-numeric-literals: 0.0.1 (new)
- babel-plugin-minify-simplify: 0.0.3 => 0.0.4
- babel-plugin-minify-type-constructors: 0.0.1 => 0.0.2
- babel-plugin-transform-regexp-constructors: 0.0.1 (new)

#### :rocket: New Feature
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

#### :bug: Bug Fix
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

#### :house: Internal
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
