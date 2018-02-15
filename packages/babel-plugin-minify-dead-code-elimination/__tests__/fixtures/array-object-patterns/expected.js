// https://github.com/babel/minify/issues/151
const me = lyfe => {
  const [swag] = lyfe;
  return swag;
};

const me2 = lyfe => {
  const [swag, yolo] = lyfe;
  return swag && yolo;
}; // https://github.com/babel/minify/issues/232


const a = {
  lol: input => {
    const [hello, world] = input.split("|");

    if (hello === "t" || hello === "top") {
      return "top";
    }

    return "bottom";
  }
};

function foo() {
  const {
    bar1,
    bar2
  } = baz();
  return bar1;
} // issue#617


function bar(arr) {
  let [a, b] = arr;
  console.log(a);
}

function baz() {
  return getPromise().then(arr => {
    let {
      a,
      b
    } = arr;
    console.log(a);
  });
} // extracting vars should ignore pattern


function quux() {}