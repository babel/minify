jest.autoMockOff();

const gutil = require("gulp-util");
const babelCore = require("babel-core");
const babiliPreset = require("babel-preset-babili");

const unpad = require("../../../utils/unpad");
const gulpBabili = require("../src/index");

describe("gulp-babili", () => {
  it("should work with a good default", () => {
    return new Promise((resolve, reject) => {
      const stream = gulpBabili();

      const source = unpad(`
        function foo() {
          const a = 10;
          return a;
        }
      `);
      const expected = "function foo(){return 10}";

      stream.on("data", function (file) {
        expect(file.contents.toString()).toBe(expected);
        resolve();
      });
      stream.on("error", reject);

      stream.write(new gutil.File({
        path: "defaults.js",
        contents: new Buffer(source),
      }));
    });
  });

  it("should take options and pass them to babili", () => {
    return new Promise((resolve, reject) => {
      const stream = gulpBabili({
        mangle: {
          blacklist: {
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

      stream.on("data", function (file) {
        expect(file.contents.toString()).toBe(expected);
        resolve();
      });
      stream.on("error", reject);

      stream.write(new gutil.File({
        path: "options.js",
        contents: new Buffer(source)
      }));
    });
  });

  it("should take custom babel and babili", () => {
    return new Promise((resolve, reject) => {
      const babel = Object.assign({}, babelCore);

      let usedTransform = false;
      Object.defineProperty(babel, "transform", {
        get() {
          usedTransform = true;
          return babelCore.transform;
        }
      });

      let usedPreset = false;
      const babili = function (...args) {
        usedPreset = true;
        return babiliPreset(...args);
      };

      const stream = gulpBabili({}, {
        babel,
        babili,
      });

      stream.on("data", function () {
        expect(usedTransform).toBe(true);
        expect(usedPreset).toBe(true);
        resolve();
      });
      stream.on("error", reject);

      stream.write(new gutil.File({
        path: "custom-transformers.js",
        contents: new Buffer("foo()")
      }));
    });
  });

  describe("comments", () => {
    const source = unpad(`
      /**
       * @license
       * This is a test
       */
      foo();
      // this is another comment
      bar();
      /* YAC - yet another comment */
      baz();
    `);

    let file;

    beforeEach(() => {
      file = new gutil.File({
        path: "comments.js",
        contents: new Buffer(source)
      });
    });

    it("should remove comments by default except license and preserve", () => {
      return new Promise((resolve, reject) => {
        const stream = gulpBabili();
        stream.on("data", function (file) {
          expect(file.contents.toString()).toMatchSnapshot();
          resolve();
        });
        stream.on("error", reject);
        stream.write(file);
      });
    });

    it("should remove all comments when false", () => {
      return new Promise((resolve, reject) => {
        const stream = gulpBabili({}, {
          comments: false
        });
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
        const stream = gulpBabili({}, {
          comments(contents) {
            return contents.indexOf("YAC") !== -1;
          }
        });
        stream.on("data", () => {
          expect(file.contents.toString()).toMatchSnapshot();
          resolve();
        });
        stream.on("error", reject);
        stream.write(file);
      });
    });
  });
});
