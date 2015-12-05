'use strict';

module.exports = ({ Plugin, types: t }) => {
  const replaceVisitor = {
    ReferencedIdentifier(path) {
      const options = this.replacements[path.node.name];
      if (!options) {
        return;
      }

      if (options.member) {
        if (!path.parentPath.isMemberExpression()) {
          return;
        }
        const { property } = path.parentPath.node;
        if (!t.isIdentifier(property) || property.name !== options.member) {
          return;
        }
        path = path.parentPath;
      }

      path.replaceWith(options.node);
    },
  };

  return {
    visitor: {
      Program(path) {
        /**
           Replacements is an array of objects like this:
           {
             identifierName: 'console',
             member: 'log', // optional
             replacement: {
               type: 'identifier',
               value: '',
             },
           }
        **/

        if (!this.opts.replacements) {
          // No replacements. Bail.
          return;
        }

        const map = Object.create(null);
        this.opts.replacements.forEach(({identifierName, replacement, member}) => {
          if (path.scope.globals[identifierName]) {
            // Convert to a node, we only allow identifiers and literals as replacements
            if (!replacement.type.match(/literal|identifier/i)) {
              throw new Error(
                'Only literals and identifier are supported as replacements'
              );
            }

            const node = t[replacement.type](replacement.value);
            const options = {
              identifierName,
              node,
              member,
            };

            map[identifierName] = options;
          }
        });

        path.traverse(replaceVisitor, { replacements: map });
      },
    },
  };
};
