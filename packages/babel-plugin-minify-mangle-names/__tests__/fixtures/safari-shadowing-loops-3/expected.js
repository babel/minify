var a = function (b) {
  for (b = 0;;);

  for (b of x);

  for (x of b);

  for (b in x);

  for (x in b);

  for (;; b++);

  for (;; b = 1);

  for (let a;;);

  for (let a of x);

  for (const a of x);

  for (let a in x);

  for (const a in x);

  for (let [a, d] of x);

  for (const [a, d] of x);

  for (let [a, d] in x);

  for (const [a, d] in x);

  for (let {
    c: {
      b: {
        a: c
      }
    }
  } = x;;);

  for (;; () => {
    let b = 1;
  });
};