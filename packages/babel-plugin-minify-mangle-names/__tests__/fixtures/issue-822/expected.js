function d3_svg_line(a) {
  var b = d3_geom_pointX,
      c = d3_geom_pointY,
      e = d3_true,
      f = d3_svg_lineLinear,
      g = f.key,
      h = 0.7;

  function i(c) {
    var g = [],
        j = [],
        k = -1,
        l = c.length,
        m,
        n = d3_functor(b);

    function o() {
      g.push("M", f(a(j), h));
    }

    while (++k < l) {
      if (e.call(this, m = c[k], k)) {
        j.push([+n.call(this, m, k)]);
      } else if (j.length) {
        o();
        j = [];
      }
    }

    if (j.length) o();
    return g.length ? g.join("") : null;
  }

  return i;
}