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
        m = b.length,
        n,
        o = d3_functor(c);

    function g() {
      j.push("M", f(a(k), h));
    }

    while (++l < m) {
      if (e.call(this, n = b[l], l)) {
        k.push([+o.call(this, n, l)]);
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