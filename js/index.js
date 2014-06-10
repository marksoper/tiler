

svg = document.getElementById("svg");
/*
var area = {
  width: 1000,
  height: 500
};
*/
/*
var tiles = [
  {
    x: 100,
    y: 100,
    width: 200,
    height: 100
  },
  {
    x: 300,
    y: 300,
    width: 200,
    height: 100
  }
];
*/
var tiles = [];
var set= [];
var tile;
var margin = 5;
for (var i=0; i<800; i++) {
  tile = {
    x: Math.floor(960*Math.random()),
    y: Math.floor(460*Math.random()),
    h: 40,
    z: 0
  };
  tiles.push(tile);
  tiler.addTileToSet(set, tile, margin, true);
}
var rects = tiler.svg.setToRects(set);
rects.forEach(function(rect) {
  svg.appendChild(rect);
});