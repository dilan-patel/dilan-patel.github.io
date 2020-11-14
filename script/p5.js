var columns, rows;
var scl = 20;
var w = 1600;
var h = 700;

var flying = 0;

var terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //canvas.position(0,0);
  //canvas.style('z-index', '1');
  columns = w / scl;
  rows = h / scl;

  for (var x = 0; x < columns; x++) {
    terrain[x] = [];

    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  flying -= 0.005;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < columns; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(80, 80, 150);
  stroke(255, 130, 230);
  fill(250, 0, 0, 50);
  rotateX(PI / 3);

  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < columns; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}