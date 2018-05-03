function d3_svg_line(projection) {
  var x = d3_geom_pointX,
    y = d3_geom_pointY,
    defined = d3_true,
    interpolate = d3_svg_lineLinear,
    interpolateKey = interpolate.key,
    tension = 0.7;

  function line(data) {
    var segments = [],
      points = [],
      i = -1,
      n = data.length,
      d,
      fx = d3_functor(x);
    function segment() {
      segments.push("M", interpolate(projection(points), tension));
    }
    while (++i < n) {
      if (defined.call(this, (d = data[i]), i)) {
        points.push([+fx.call(this, d, i)]);
      } else if (points.length) {
        segment();
        points = [];
      }
    }
    if (points.length) segment();
    return segments.length ? segments.join("") : null;
  }

  return line;
}
