
var tiler = {};

tiler.intersect = function(t1, t2, m) {
  //
  // t1 and t2 intersect if both their x and y margin boundaries intersect
  //
  var dims = ["x", "y"];
  var intersects = {};
  dims.forEach(function(d) {
    intersects[d] = false;
    if ( ( (t2[d]+t2.h) > (t1[d]-m) ) && ( t2[d] < (t1[d]+t1.h+m) ) ) {
      intersects[d] = true;
    }
  });
  return dims.reduce(function(p, c) {
    return intersects[p] && intersects[c];
  });
};

tiler.conflictTiles = function(t1, t2, margin) {
  if ((Math.abs(t1.x - t2.x) < margin) && (Math.abs(t1.y - t2.y) < margin)) {
    return false;
  }
  if ((Math.abs(t1.x + t1.height - t2.x) < margin) && (Math.abs(t1.y - t2.y) < margin)) {
    return false;
  }

};

tiler.relateTiles = function(t1, t2) {
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