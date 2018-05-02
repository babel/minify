function d3_svg_line(a) {
  var c = d3_geom_pointX,
      d = d3_geom_pointY,
      e = d3_true,
      f = d3_svg_lineLinear,
      g = f.key,
      h = 0.7;

  function b(b) {
    var j = [],
        k = [],
        l = -1,
        i = b.length,
        m,
        d = d3_functor(c);

    function g() {
      j.push("M", f(a(k), h));
    }

    while (++l < i) {
      if (e.call(this, m = b[l], l)) {
        k.push([+d.call(this, m, l)]);
      } else if (k.length) {
        g();
        k = [];
      }
    }

    if (k.length) g();
    return j.length ? j.join("") : null;
  }

  return b;
}