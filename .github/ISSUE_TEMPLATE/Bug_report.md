---
name: "\U0001F41B Bug Report"
about: Incorrect Output or something is not working as expected

---

<!---
Thanks for filing an issue 😄! Before you submit, please read the following:

Search open/closed issues before submitting since someone might have asked the same thing before!

If you have a support request or question please submit them to the #minify channel on babeljs slack: https://babeljs.slack.com/messages/minify

Also have a look at the Debugging guidelines: https://github.com/babel/minify/blob/master/docs/debugging.md
-->

**Describe the bug**

<!-- A clear and concise description of what the bug is. -->

**To Reproduce**

Minimal code to reproduce the bug

```js
```

**Actual Output**

If there is no Error thrown,

<!-- Provide the pretty Printed output of the minified code. -->

```js
```

**Expected Output**

<!-- What should have been the expected output? Provide a pretty printed version of the expected output -->

```js
```

**Stack Trace**

If applicable,

<!--
Please provide the full stack trace of the error thrown
-->

```

```

**Configuration**

How are you using babel-minify?

<!--
babel-minify can be used in different ways with different tools. The following are some of the options

* babel-preset-minify in babelrc
* babel-minify Node API (or) CLI
* gulp-babel-minify
* rollup-plugin-babel-minify
* babel-minify-webpack-plugin
* etc...

State how you're using babel-minify.
-->

`babel-minify CLI`

babel-minify version: `0.4.1`

babel version : `7.0.0-beta.46`

babel-minify-config:

```json5
{
  removeConsole: true,
  keepFnNames: true
}
```

babelrc:

<!--
If you're using babel-preset-minify directly with other plugins or presets - all running through a single babel transformation pipeline, provide the babel configuration
-->

```json5
{
  plugins: [],
  presets: []
}
```

**Possible solution**

<!-- If you have suggestions on a fix/reason for the bug, add them here -->

**Additional context**

<!-- Add any other context about the problem here. -->
