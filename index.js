
var app = {};
app.svg = document.getElementById("svg");
/*
var area = {
  width: 1000,
  height: 500
};
*/
var set = [
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
var rects = tiler.svg.setToRects(set);
rects.forEach(function(rect) {
  app.svg.appendChild(rect);
});