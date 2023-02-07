let myShader;
let noise;
let pg;
let seed;

function preload() {
  myShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  frameRate(10);
  
  pg = createGraphics(5000,5000);
  
  pg.background(0);
  pg.fill(255, 221, 51);
  pg.noStroke();
  for(let i = 0; i < 1; i ++) {
    let x = Math.random() * 1000+1000;
    let y = Math.random() * 1000+1000;
    pg.circle(x, y, 3000);
  }
  
  noLoop();

  var button = createButton("generate").parent(sliders);
  button.mousePressed(resetSketch);
}

function resetSketch() {
  clear();
  drawSpheres();
}

function draw() {
    drawSpheres();
}


function drawSpheres() {
  background(0);
  shader(myShader);
  
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", pg);

  // Rotate our geometry on the X and Y axes
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.005);

  sphere(width / 10, 200, 200);
  for (let i=0; i< 30; i++){
    let x = (random()-0.5) * 400;
    let y = (random()-0.5) * 400;
    let z = (random()-0.5) * 1000 - 100;
    push();
    translate(x, y, z);
    let w = int(random() * 150);
    sphere(w, 200, 200);
    pop();
  }
  
}

