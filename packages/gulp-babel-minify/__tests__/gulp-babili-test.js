jest.autoMockOff();

const File = require("vinyl");
const babelCore = require("@babel/core");
const minifyPreset = require("babel-preset-minify");

const unpad = require("unpad");
const gulpBabelMinify = require("../src/index");

describe("gulp-babel-minify", () => {
  it("should work with a good default", () => {
    return new Promise((resolve, reject) => {
      const stream = gulpBabelMinify();

      const source = unpad(`
        function foo() {
          const a = 10;
          return a;
        }
      `);
      const expected = "function foo(){return 10}";

      stream.on("data", function(file) {
        expect(file.contents.toString()).toBe(expected);
        resolve();
      });
      stream.on("error", reject);

      stream.write(
        new File({
          path: "defaults.js",
          contents: new Buffer(source)
        })
      );
    });
  });

  it("should take options and pass them to babel-minify", () => {
    return new Promise((resolve, reject) => {
      const stream = gulpBabelMinify({
        mangle: {
          exclude: {
            bar: true
          }
        }
      });

      const source = unpad(`
        function foo(bar, baz) {
          return bar + baz;
        }
      `);
      const expected = "function foo(bar,a){return bar+a}";

      stream.on("data", function(file) {
        expect(file.contents.toString()).toBe(expected);
        resolve();
      });
      stream.on("error", reject);

      stream.write(
        new File({
          path: "options.js",
          contents: new Buffer(source)
        })
      );
    });
  });

  it("should take custom babel and babel-minify", () => {
    return new Promise((resolve, reject) => {
      const babel = Object.assign({}, babelCore);

      let usedTransform = false;
      Object.defineProperty(babel, "transformSync", {
        get() {
          usedTransform = true;
          return babelCore.transformSync;
        }
      });

      let usedPreset = false;
      const minify = function(...args) {
        usedPreset = true;
        return minifyPreset(...args);
      };

      const stream = gulpBabelMinify(
        {},
        {
          babel,
          minifyPreset: minify
        }
      );

      stream.on("data", function() {
        expect(usedTransform).toBe(true);
        expect(usedPreset).toBe(true);
        resolve();
      });
      stream.on("error", reject);

      stream.write(
        new File({
          path: "custom-transformers.js",
          contents: new Buffer("foo()")
        })
      );
    });
  });

  describe("comments", () => {
    const source = unpad(
      `
      /**
       * @license
       * This is a test
       */
      function foo(){}
      // this is another comment
      bar();
      /* YAC - yet another comment */
      var a = baz();
    `
    );

    let file;

    beforeEach(() => {
      file = new File({
        path: "comments.js",
        contents: new Buffer(source)
      });
    });

    it("should remove comments by default except license and preserve", () => {
      return new Promise((resolve, reject) => {
        const stream = gulpBabelMinify();
        stream.on("data", function(file) {
          expect(file.contents.toString()).toMatchSnapshot();
          resolve();
        });
        stream.on("error", reject);
        stream.write(file);
      });
    });

    it("should remove all comments when false", () => {
      return new Promise((resolve, reject) => {
        const stream = gulpBabelMinify(
          {},
          {
            comments: false
          }
        );
        stream.on("data", () => {
          expect(file.contents.toString()).toMatchSnapshot();
          resolve();
        });
        stream.on("error", reject);
        stream.write(file);
      });
    });

    it("should take a custom function", () => {
      return new Promise((resolve, reject) => {
        const stream = gulpBabelMinify(
          {},
          {
            comments(contents) {
              return contents.indexOf("YAC") !== -1;
            }
          }
        );
        stream.on("data", () => {
          expect(file.contents.toString()).toMatchSnapshot();
          resolve();
        });
        stream.on("error", reject);
        stream.write(file);
      });
    });
  });

  it("should remove comments while doing DCE and simplify", () => {
    return new Promise((resolve, reject) => {
      const stream = gulpBabelMinify(
        {},
        {
          comments(contents) {
            return contents.indexOf("optimized") !== -1;
          }
        }
      );

      const source = unpad(`
        /**
         * @license
         * throw away
         */
        var a = function(){
          // Hell yeah
          function test(){
            // comments should be optimized away
            const flag = true;
            if (flag) {
              // comments
              foo();
            }
            // remove this also
            bar();
            // should remove this as well
            baz();
          }
          test();
        }
      `);

      stream.on("data", function(file) {
        expect(file.contents.toString()).toMatchSnapshot();
        resolve();
      });
      stream.on("error", reject);

      stream.write(
        new File({
          path: "options.js",
          contents: new Buffer(source)
        })
      );
    });
  });
});
