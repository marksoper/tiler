
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

tiler.conflict = function(t1, t2, m) {
  return false;
};

//
// incomplete
//
tiler.conflictTiles = function(t1, t2, margin) {
  if ((Math.abs(t1.x - t2.x) < margin) && (Math.abs(t1.y - t2.y) < margin)) {
    return false;
  }
  if ((Math.abs(t1.x + t1.height - t2.x) < margin) && (Math.abs(t1.y - t2.y) < margin)) {
    return false;
  }

};

tiler.relateTiles = function(t1, t2, m) {
  var relationship = {
    conflicts: false,
    intersects: tiler.intersect(t1, t2, m)
  };
  return relationship;
};

tiler.addTileToSet = function(set, tile, margin, over) {
  if (set.length === 0) {
    set.push(tile);
    return true;
  }
  var relationship;
  var accept = false;
  for (var i=0; i<set.length; i++) {
    relationship = tiler.relateTiles(tile, set[i], margin);
    if (relationship['intersects']) {
      accept = true;
      tile.z = over ? Math.max(tile.z, set[i].z + 1) : Math.min(tile.z, set[i].z - 1);
    }
  }
  if (accept) {
    set.push(tile);
    return true;
  } else {
    console.log("failed to add tile to set");
    return false;
  }
};


//
// SVG
//

tiler.svg = {};

tiler.svg.tileToRect = function(tile) {
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", tile.x);
  rect.setAttribute("y", tile.y);
  rect.setAttribute("z", tile.z);
  rect.setAttribute("height", tile.h);
  rect.setAttribute("width", tile.h);
  return rect;
};

tiler.svg.setToRects = function(set) {
  var rects = [];
  set.forEach(function(tile) {
    rects.push(tiler.svg.tileToRect(tile));
  });
  return rects;
};