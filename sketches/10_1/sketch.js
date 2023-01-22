let grid = [];
let balls = []
let waveTypes = ['sine', 'triangle', 'square'];
let pent = [1, 3, 5, 8, 10, 12];
let colors = ["#f72585", "#7209b7", "#4cc9f0", "#80ed99", "#ffea00", "#ff7b00", "#d81159"]

function setup() {
  createCanvas(400, 400, WEBGL);
  
//   for(let i=-4; i<5; i++) {
//     let row = [];
//     let ball_row = [];
//     for(let j=-4; j<5; j++) { 
//       let env = new p5.Env();
//       env.setADSR(0.05, 0.1, 0.5, 1);
//       env.setRange(1.2, 0);
      
//       let w = new p5.Oscillator();
//       w.start();
      
//       let ind = ((i+4) * 9 + (j + 4))%6;
//       let p = pent[ind];
//       let c = colors[ind];
      
//       f = 440 * Math.pow(2, (p / 12) - 1.5);
      
//       w.freq(f);
//       w.setType('sine');
//       w.amp(env);
//       let z = random()*200 + 50;
//       let sound = {
//         x: i*20,
//         y: j*20,
//         on: false,
//         wave: w,
//         height: z,
//         z: z,
//         length: 30,
//         curr: 0,
//         color: c,
//         range: int(random()*150) + 50,
//         env: env
//       }
      
//       let b = {
//         h: -random()*1000-300
//       }
      
//       row.push(sound);
//       ball_row.push(b);
//     }
//     grid.push(row);
//     balls.push(ball_row);
//   }
var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    grid = [];
    balls = [];
    for(let i=-4; i<5; i++) {
    let row = [];
    let ball_row = [];
    for(let j=-4; j<5; j++) { 
      let env = new p5.Env();
      env.setADSR(0.05, 0.1, 0.5, 1);
      env.setRange(1.2, 0);
      
      let w = new p5.Oscillator();
      w.start();
      
      let ind = ((i+4) * 9 + (j + 4))%6;
      let p = pent[ind];
      let c = colors[ind];
      
      f = 440 * Math.pow(2, (p / 12) - 1.5);
      
      w.freq(f);
      w.setType('sine');
      w.amp(env);
      let z = random()*200 + 50;
      let sound = {
        x: i*20,
        y: j*20,
        on: false,
        wave: w,
        height: z,
        z: z,
        length: 30,
        curr: 0,
        color: c,
        range: int(random()*150) + 50,
        env: env
      }
      
      let b = {
        h: -random()*1000-300
      }
      
      row.push(sound);
      ball_row.push(b);
    }
    grid.push(row);
    balls.push(ball_row);
  }
}

function draw() {
  // noStroke();
  background(0);
  rotateX(-0.9);
  rotateY(frameCount/500);
  ambientLight(200, 200, 200);
  pointLight(255, 255, 255, 200,-400, 900);
  
  if(grid.length != 0) {
    for(let i=0; i<9; i++) {
    for(let j=0; j<9; j++) {
      let sound = grid[i][j];
      let ball = balls[i][j];
      
      push();
      translate(sound.x, 100, sound.y);
      if(sound.on) {
        fill(sound.color);
      } else {
        fill(255);
      }
      ambientMaterial(200);
      
      sound.height = sound.z + abs(map(frameCount%(sound.range*3), 0, sound.range*3, -sound.range/2, sound.range/2));
      box(20,sound.height,20);
      pop();
      
      push();
      noStroke();
      fill(sound.color);
      
      ambientMaterial(150);
      translate(sound.x, ball.h, sound.y);
      sphere(4);
      pop();
      
      ball.h += 1;
      if(ball.h > - sound.height/2 + 100 && !sound.on) {
        sound.on = true;
        sound.env.play();
        sound.curr = sound.length;
      }
      
      if(ball.h > - sound.height/2 + 100 + 9 && sound.on) {
        ball.h = -random()*1000-300;
      }
      
      if(sound.curr > 0) {
        sound.curr -= 1;
      } else {
        sound.on = false;
      }
    }
  }
  }
  
  
}