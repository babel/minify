const other = Symbol("other");

module.exports = ({ types: t }) => {
  const undef = t.unaryExpression("void", t.numericLiteral(0));

  function defaultZero(cb) {
    return function(i = t.numericLiteral(0), ...args) {
      if (t.isNumericLiteral(i)) {
        return cb.call(this, this, i.value, ...args);
      }
    };
  }

  return {
    ArrayExpression: {
      members: {
        length() {
          return t.numericLiteral(this.elements.length);
        },
        [other](i) {
          if (typeof i === "number" || i.match(/^\d+$/)) {
            return this.elements[i] || undef;
          }
        }
      },
      calls: {
        concat(...args) {
          return t.arrayExpression(
            this.elements.concat(
              ...args.map(arg => {
                if (t.isArrayExpression(arg)) return arg.elements;
                return arg;
              })
            )
          );
        },
        join(sep = t.stringLiteral(",")) {
          if (!t.isStringLiteral(sep)) return;
          let bad = false;
          const str = this.elements
            .map(el => {
              if (!t.isLiteral(el)) {
                bad = true;
                return;
              }
              return el.value;
            })
            .join(sep.value);
          return bad ? undefined : t.stringLiteral(str);
        },
        push(...args) {
          return t.numericLiteral(this.elements.length + args.length);
        },
        shift() {
          if (this.elements.length === 0) {
            return undef;
          }
          return t.numericLiteral(this.elements.length - 1);
        },
        slice(start = t.numericLiteral(0), end) {
          if (!t.isNumericLiteral(start) || (end && !t.isNumericLiteral(end))) {
            return;
          }
          return t.arrayExpression(
            this.elements.slice(start.value, end && end.value)
          );
        },
        pop() {
          return this.elements[this.elements.length - 1] || undef;
        },
        reverse() {
          return t.arrayExpression(this.elements.reverse());
        },
        splice(start, end, ...args) {
          if (!t.isNumericLiteral(start) || (end && !t.isNumericLiteral(end))) {
            return;
          }
          if (end) {
            args.unshift(end.value);
          }
          return t.arrayExpression(
            this.elements.slice().splice(start.value, ...args)
          );
        }
      }
    },
    StringLiteral: {
      members: {
        length() {
          return t.numericLiteral(this.value.length);
        },
        [other](i) {
          if (typeof i === "number" || i.match(/^\d+$/)) {
            const ch = this.value[i];
            return ch ? t.stringLiteral(ch) : undef;
          }
        }
      },
      calls: {
        split(sep = undef) {
          let realSep = null;
          if (t.isStringLiteral(sep)) {
            realSep = sep.value;
          }
          if (t.isIdentifier(sep, { name: "undefined" })) {
            realSep = sep;
          }
          if (realSep !== null) {
            return t.arrayExpression(
              this.value.split(realSep).map(str => t.stringLiteral(str))
            );
          }
        },
        charAt: defaultZero(({ value }, i) => t.stringLiteral(value.charAt(i))),
        charCodeAt: defaultZero(({ value }, i) =>
          t.numericLiteral(value.charCodeAt(i))),
        codePointAt: defaultZero(({ value }, i) =>
          t.numericLiteral(value.codePointAt(i)))
      }
    }
  };
};
module.exports.other = other;
