var a = function(a) {
  for (a = 0; ; );
  for (a of x);
  for (x of a);
  for (a in x);
  for (x in a);
  for (; ; a++);
  for (; ; a = 1);

  for (let b; ; );
  for (let b of x);
  for (const b of x);
  for (let b in x);
  for (const b in x);
  for (let [b, c] of x);
  for (const [b, c] of x);
  for (let [b, c] in x);
  for (const [b, c] in x);
  for (let { c: { b: { a } } } = x; ; );
  for (
    ;
    ;
    () => {
      let a = 1;
    }
  );
};
