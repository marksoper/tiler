
var tiler = {};

tiler.svg = {};

tiler.svg.tileToRect = function(tile) {
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  ["x", "y", "height", "width"].forEach(function(attr) {
    if (tile[attr]) {
      rect.setAttribute(attr, tile[attr]);
    }
  });
  return rect;
};

