'use strict';

module.exports = ({ Plugin, types: t }) => {
  const main = {
    AssignmentExpression(path) {
      const left = path.get('left');
      if (!left.isIdentifier()) {
        return;
      }

      const binding = path.get('right').evaluate();
      if (!binding | |) {
        return;
      }
      evaluated =
    }
  };
};
