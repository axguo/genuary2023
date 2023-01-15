let rw = 25;
let rh = 100;

let h = 100;
let w = 40;

let margin = 50;
let rects = [];

function setup() {
  createCanvas(600, 400);
  background(255);
  noFill();
  // noLoop();
  createRect();
  frameRate(10);
  var button = createButton("generate").parent(sliders);
  button.mousePressed(resetSketch);
}

function resetSketch() {
    rects = [];
    createRect();
}

function createRect() {
  for(let j=margin; j<height-margin-rh; j+=rh-60){
    for(let i=margin+(random()-0.5)*10; i<width-margin-rw; i+=rw+(random()-0.5)*10){

      let r = {
        x1:i, 
        y1: j+(random()-0.5)*10,
        x2:rw, 
        y2:rh
      }
      rects.push(r);
    }
  }
}

function draw() {
  clear();
  for(let i=0; i<rects.length; i++){
    let r=rects[i];
    drawRect(r.x1, r.y1, r.x2, r.y2);
  }
}

function drawRect(x, y, w, h) {
  for(let j=0; j<h; j+=2) {
    stroke(14, 107, 39, 200+random()*50);
    line(x, y+j, x+w, y+j);
  }
}

// function mouseClicked() {
//     saveCanvas();
// }