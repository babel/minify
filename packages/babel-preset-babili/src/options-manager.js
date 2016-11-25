const isPlainObject = require("lodash.isplainobject");

/**
 * Options Manager
 *
 * Input Options: Object
 * Output: Array of plugins enabled with their options
 *
 * Handles multiple types of input option keys
 *
 * 1. boolean and object values
 * { mangle: true } // should enable mangler
 * { mangle: { blacklist: ["foo"] } } // should enabled mangler
 *                                    // and pass obj to mangle plugin
 *
 * 2. group
 * { unsafe: true } // should enable all plugins under unsafe
 * { unsafe: { flip: false } } // should disable flip-comparisons plugin
 *                             // and other plugins should take their defaults
 * { unsafe: { simplify: {multipass: true}}} // should pass obj to simplify
 *                                           // other plugins take defaults
 *
 * 3. same option passed on to multiple plugins
 * { keepFnames: false } // should be passed on to mangle & dce
 *                       // without disturbing their own options
 */

module.exports = {
  option,
  proxy,
  group,
  generate,
  resolveOptions,
  generateResult,
};

/**
 * Generate the plugin list from option tree and inputOpts
 */
function generate(optionTree, inputOpts) {
  return generateResult(
    resolveOptions(optionTree, inputOpts)
  );
}

/**
 * Generate plugin list from the resolvedOptionTree
 * where resolvedOptionTree = for every node, node.resolved = true;
 */
function generateResult(resolvedOpts) {
  const options = resolvedOpts.children;
  const result = [];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    switch (option.type) {
    case "option":
      if (option.resolvedValue) {
        result.push(option.resolvedValue);
      }
      break;
    case "group":
      result.push(...generateResult(option));
      break;
    }
  }

  return result;
}

/**
 * Traverses input @param{optionTree} and adds resolvedValue
 * calculated from @param{inputOpts} for each Node in the tree
 */
function resolveOptions(optionTree, inputOpts = {}) {
  const options = optionTree.children;

  // a queue to resolve proxies at the end after all options groups are resolved
  const proxiesToResolve = [];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    switch (option.type) {
    case "option":
      resolveTypeOption(option, inputOpts);
      break;

    case "group":
      resolveTypeGroup(option, inputOpts);
      break;

    case "proxy":
      if (!hop(inputOpts, option.name)) {
        break;
      }
      proxiesToResolve.push(option);
      break;

    default:
      throw new TypeError("Option type not supported - " + option.type);
    }
  }

  // resolve proxies
  for (let i = 0; i < proxiesToResolve.length; i++) {
    const proxy = proxiesToResolve[i];
    for (let j = 0; j < proxy.to.length; j++) {
      const option = proxy.to[j];
      switch (option.type) {
      case "option":
        resolveTypeProxyToOption(proxy, option, inputOpts);
        break;

      case "group":
      case "proxy":
        throw new Error(`proxy option cannot proxy to group/proxy. ${proxy.name} proxied to ${option.name}`);

      default:
        throw new Error("Unsupported option type ${option.name}");
      }
    }
  }

  // return the same tree after modifications
  return optionTree;
}

/**
 * Resolve the type - simple option using the @param{inputOpts}
 */
function resolveTypeOption(option, inputOpts) {
  option.resolved = true;

  // option does NOT exist in inputOpts
  if (!hop(inputOpts, option.name)) {
    // default value
    option.resolvedValue = option.defaultValue ? option.resolvingValue : null;
    return;
  }

  // Object
  // { mangle: { blacklist: ["foo", "bar"] } }
  if (isPlainObject(inputOpts[option.name])) {
    option.resolvedValue = [option.resolvingValue, inputOpts[option.name]];
    return;
  }

  // any other truthy value, just enables the plugin
  // { mangle: true }
  if (inputOpts[option.name]) {
    option.resolvedValue = option.resolvingValue;
    return;
  }

  // disabled
  option.resolvedValue = null;
}

/**
 * Resolve the group using @param{inputOpts}
 */
function resolveTypeGroup(option, inputOpts) {
  option.resolved = true;

  // option does NOT exist in inputOpts
  if (!hop(inputOpts, option.name)) {
    const newInputOpts = option
      .children
      .filter((opt) => opt.type !== "proxy")
      .reduce((acc, cur) => {
        let value;
        switch (option.defaultValue) {
        case "all": value = true; break;
        case "some": value = cur.defaultValue; break;
        case "none": value = false; break;
        default: throw new Error(`Unsupported defaultValue - ${option.defaultValue} for option ${option.name}`);
        }
        return Object.assign({}, acc, {
          [cur.name]: value,
        });
      }, {});

    // recurse
    resolveOptions(option, newInputOpts);
    return;
  }

  // has individual options for items in group
  // { unsafe: { flipComparisons: true } }
  if (isPlainObject(inputOpts[option.name])) {
    resolveOptions(option, inputOpts[option.name]);
    return;
  }

  // else
  // { unsafe: <true | false> }
  const newInputOpts = option
    .children
    .filter((opt) => opt.type !== "proxy")
    .reduce((acc, cur) => Object.assign({}, acc, {
      // if the input is truthy, enable all, else disable all
      [cur.name]: !!inputOpts[option.name]
    }), {});
  resolveOptions(option, newInputOpts);
}

/**
 * Resolve proxies and update the already resolved Options
 */
function resolveTypeProxyToOption(proxy, option, inputOpts) {
  if (!option.resolved) {
    throw new Error("Proxies cannot be applied before the original option is resolved");
  }

  // option is disabled
  if (!option.resolvedValue) {
    return;
  }

  // option doesn't contain any option on its own
  if (option.resolvedValue === option.resolvingValue) {
    option.resolvedValue = [option.resolvedValue, {
      [proxy.name]: inputOpts[proxy.name]
    }];
  }

  // option already has its own set of options to be passed to plugins
  else if (Array.isArray(option.resolvedValue) && option.resolvedValue.length === 2) {
    // proxies should not override
    if (!hop(option.resolvedValue[1], proxy.name)) {
      option.resolvedValue = [
        option.resolvingValue,
        Object.assign({}, option.resolvedValue[1], {
          [proxy.name]: inputOpts[proxy.name]
        })
      ];
    }
  }

  // plugin is invalid
  else {
    throw new Error(`Invalid resolved value for option ${option.name}`);
  }
}

// create an option of type simple option
function option(name, resolvingValue, defaultValue = true) {
  assertName(name);
  if (!resolvingValue) {
    // as plugins are truthy values
    throw new Error("Only truthy resolving values are supported");
  }
  return {
    type: "option",
    name,
    resolvingValue,
    defaultValue,
  };
}

// create an option of type proxy
function proxy(name, to) {
  assertName(name);
  assertArray(name, "to", to);
  return {
    type: "proxy",
    name,
    to,
  };
}

// create an option of type - group of options
function group(name, children, defaultValue = "some") {
  assertName(name);
  assertArray(name, "children", children);
  return {
    type: "group",
    name,
    children: children.filter((x) => !!x),
    defaultValue,
  };
}

function hop(o, key) {
  return Object.hasOwnProperty.call(o, key);
}

function assertArray(name, prop, arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`Expected ${prop} to be an array in option ${name}`);
  }
}

function assertName(name) {
  if (!name) {
    throw new Error("Invalid option name " + name);
  }
}
