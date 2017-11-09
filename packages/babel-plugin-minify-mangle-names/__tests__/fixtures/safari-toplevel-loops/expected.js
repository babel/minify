var a;

for (a = 0;;);
for (a of x);
for (x of a);
for (a in x);
for (x in a);
for (;; a++);
for (;; a = 1);

for (let a;;);
for (let a of x);
for (const a of x);
for (let a in x);
for (const a in x);
for (let [a, b] of x);
for (const [a, b] of x);
for (let [a, b] in x);
for (const [a, b] in x);
for (let { c: { b: { a: b } } } = x;;);
for (;; () => {
  let b = 1;
});