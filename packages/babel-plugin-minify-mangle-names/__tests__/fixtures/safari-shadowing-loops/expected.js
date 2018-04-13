function a(b) {
  {
    for (b = 0;;);

    for (b of x);

    for (x of b);

    for (b in x);

    for (x in b);

    for (;; b++);

    for (;; b = 1);

    for (let b;;);

    for (let b of x);

    for (const b of x);

    for (let b in x);

    for (const b in x);

    for (let [c, a] of x);

    for (const [c, a] of x);

    for (let [c, a] in x);

    for (const [c, a] in x);

    for (let {
      c: {
        b: {
          a: b
        }
      }
    } = x;;);

    for (;; () => {
      let b = 1;
    });
  }
}