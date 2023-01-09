let screen;
let myShader;
let boxes = [];
let w;
let h;

function preload() {
  myShader = loadShader("shader.vert", "shader.frag");
}

function createBoxes() {
  for(let i=0; i<70; i++) {
    let newBox = {
      x: (random()-0.5)*w,
      y: (random()-0.5)*h,
      z: (random()-0.5)*1000-100,
      w: random()*50+10,
      h: random()*50+10,
      l: random()*100+10,
      show: true,
      drop: false,
    }
    boxes.push(newBox);
  }  
}

function drawBoxes(noise) {
  for(let i=0; i<boxes.length; i++) {
    let b = boxes[i];
    if(b.show){
      screen.push();
      screen.translate(b.x , b.y, b.z);
      // screen.rotateX(frameCount * 0.01);
      // screen.rotateY(frameCount * 0.005);
      if (b.drop) {
        screen.rotateX((random() - 0.5));
        screen.rotateY((random() - 0.5));
        screen.rotateZ((random() - 0.5));
       } else {
        screen.rotateX((random()-0.5)*noise);
        screen.rotateY((random()-0.5)*noise);
        screen.rotateZ((random()-0.5)*noise);
       }
      screen.box(b.w, b.h, b.l);
      screen.pop();
      
      if(noise>0.35 && random()<0.1){
        b.drop=true;
      }

      
    }
  }

      // if(noise>0.15) {
      //   let index = int(random()*boxes.length);
      //   boxes[index].show=false;
      // }
 
}

function setup() {
  // w = windowWidth;
  // h = windowHeight;
  
  w = 500;
  h = 600;
  createCanvas(w, h, WEBGL);
  screen = createGraphics(w, h, WEBGL);
  
  // screen.noStroke();
  screen.strokeWeight(2);
  screen.stroke(0);
  screen.fill(255);
  // frameRate(10);
  
  
  createBoxes();
  

  var button = createButton("generate").parent(sliders);
  button.mousePressed(resetSketch);
  
  // createLoop({duration:3, gif:true})
}

function resetSketch() {
  boxes = [];
  createBoxes();
}


function draw() {
  shader(myShader);
  screen.clear();
  screen.background(0, 0, 0);
  let noise = getNoiseValue();
  // console.log(noise);
  
  drawBoxes(noise);
  rect(-width/2, -height/2, width, height);
  screen.rect(-width/2, -height/2, width, height);

  myShader.setUniform('texture', screen);
  myShader.setUniform('noise', noise);
}


function getNoiseValue() { 
  let v = noise(millis()/100);
  const cutOff = 0.5;
  
  if(v < cutOff) {
    return 0;
  }
  
  v = pow((v-cutOff) * 1.1/(1-cutOff), 2);
  
  return v;
}



// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }