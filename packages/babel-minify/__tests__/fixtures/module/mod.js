// comment 1
import Foo from "foo";

// comment 2
import pick from "lodash/pick";

export const items /* comment 3 */ = pick(Foo.all, [
  // comment 4
  "a",
  // comment 5
  "b",
  // comment 6
  "c"
]);

export default Foo(items);
