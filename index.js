

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
for (var i=0; i<100; i++) {
  tile = {
    x: Math.floor(900*Math.random()),
    y: Math.floor(400*Math.random()),
    h: 100
  };
  tiles.push(tile);
  tiler.addTileToSet(set, tile, margin);
}
var rects = tiler.svg.setToRects(set);
rects.forEach(function(rect) {
  svg.appendChild(rect);
});