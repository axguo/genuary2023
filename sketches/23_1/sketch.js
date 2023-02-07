let m = 150;
let bar = 6;
let gap = 1;

let pg;
let pg2;
let msk;

function setup() {
  createCanvas(600, 300);
  strokeWeight(bar);
  strokeCap(SQUARE);
  noCursor();
  
  pg = createGraphics(100, 100);
  pg.noStroke();

  let x = 50;
  let y = 15;
  let s = 85;
  pg.fill(110, 13, 58);
  pg.beginShape();
  pg.vertex(x, y);
  pg.bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
  pg.bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
  pg.endShape(CLOSE);
}

function draw() {
  background(212, 180, 195);
  stroke(110, 13, 58);

  pgImage = pg.get();
  
  for(let x = 100; x < 500; x += bar+gap+0.9) {
    image(pgImage, x, 100, bar+gap, 60);
  }
  
  for(let x = 0; x < m; x += bar + gap) {
    let xstart = mouseX;
    let ystart = mouseY;
    
    // let xstart = frameCount/3;
    // let ystart = 130;
    line(xstart + x - m/2 , ystart - m/2, xstart + x - m/2, ystart + m/2);
  }
}
