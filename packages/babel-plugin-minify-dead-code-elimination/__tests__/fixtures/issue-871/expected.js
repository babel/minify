async function example() {
  var foo, bar;

  try {
    [foo, bar] = await Promise.all([req(1), req(2)]);
  } catch (e) {}

  console.log(foo);
}