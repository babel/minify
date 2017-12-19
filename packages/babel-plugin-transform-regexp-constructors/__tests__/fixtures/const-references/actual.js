const foo = "ab+";
const bar = "c\\w";
const flags = "g";
const ret = new RegExp(foo + bar + "d", flags);
