
var tiler = {};

tiler.relateTiles = function(tile1, tile2) {
  return {
    conflicts: false,
    relationship: "disjoint"
  }
};

tiler.addTileToSet = function(set, tile) {
  var newset = [];
  for (var i=0; i<set.length; i++) {
    if (!tiler.relateTiles(tile, set[i])['conflicts']) {
      newset.push(set[i]);
    } else {
      return false;
    }
  }
  newset.push(tile);
  return newset;
};


//
// SVG
//

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

tiler.svg.setToRects = function(set) {
  var rects = [];
  set.forEach(function(tile) {
    rects.push(tiler.svg.tileToRect(tile));
  });
  return rects;
};