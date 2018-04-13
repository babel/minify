#!/usr/bin/env node
const babel = require("@babel/core");
const preset = require("../packages/babel-preset-minify");
const fs = require("fs");
const Table = require("cli-table");

const hop = (o, key) => Object.hasOwnProperty.call(o, key);

class Benchmark {
  constructor({
    now = () => process.hrtime(),
    diff = start => {
      const delta = process.hrtime(start);
      return delta[0] * 1e3 + delta[1] / 1e6;
    }
  } = {}) {
    this.events = {};
    this.visits = {};
    this.results = {};
    this.now = now;
    this.diff = diff;
  }
  push(name) {
    if (!hop(this.events, name)) {
      this.events[name] = [];
      this.visits[name] = 0;
    }
    this.events[name].push(this.now());
    this.visits[name]++;
  }
  pop(name) {
    if (hop(this.events, name) && this.events[name].length > 0) {
      const start = this.events[name].shift();
      const delta = this.diff(start);

      if (!hop(this.results, name)) {
        this.results[name] = {
          aggregate: 0,
          values: []
        };
      }

      this.results[name].aggregate += delta;
      this.results[name].values.push(delta);
    }
  }
}

run(process.argv[2]);

function run(file) {
  const b = new Benchmark();
  babel.transform(fs.readFileSync(file).toString(), {
    presets: [preset],
    wrapPluginVisitorMethod(pluginAlias, visitorType, callback) {
      return function(...args) {
        b.push(pluginAlias);
        callback.call(this, ...args);
        b.pop(pluginAlias);
      };
    }
  });

  const table = new Table({
    head: ["pluginAlias", "time(ms)", "# visits", "time/visit(ms)"],
    chars: {
      top: "",
      "top-mid": "",
      "top-left": "",
      "top-right": "",
      bottom: "",
      "bottom-mid": "",
      "bottom-left": "",
      "bottom-right": "",
      left: "",
      "left-mid": "",
      mid: "",
      "mid-mid": "",
      right: "",
      "right-mid": "",
      middle: " "
    },
    style: {
      "padding-left": 0,
      "padding-right": 0,
      head: ["bold"]
    }
  });

  const results = Object.keys(b.results)
    .map(name => [name, b.results[name].aggregate, b.visits[name]])
    .sort((a, b) => {
      if (a[1] < b[1]) return 1;
      if (a[1] > b[1]) return -1;
      return 0;
    })
    .map(arr => [
      arr[0],
      arr[1].toFixed(3),
      arr[2],
      (arr[1] / arr[2]).toFixed(3)
    ]);

  table.push(...results);
  console.log(table.toString());
}
