// based off of example at https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/6_3d/6-3_vertexDisplacementFromTexture

let myShader;
let noises = [];
let amplitude = 1.2;
let a_;
let noise_idx = 1;
let i_;

function preload() {
  myShader = loadShader("shader.vert", "shader.frag");
  let noise1 = loadImage("noise_images/noise1.png");
  let noise2 = loadImage("noise_images/noise2.png");
  let noise3 = loadImage("noise_images/noise3.png");
  let noise4 = loadImage("noise_images/noise4.jpg");
  let noise5 = loadImage("noise_images/noise5.png");
  let noise6 = loadImage("noise_images/noise6.jpeg");
  let noise7 = loadImage("noise_images/noise7.png");
  let noise8 = loadImage("noise_images/noise8.jpg");
  
  noises.push(noise1);
  noises.push(noise2);
  noises.push(noise3);
  noises.push(noise4);
  noises.push(noise5);
  noises.push(noise6);
  noises.push(noise7);
  noises.push(noise8);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  createSliders();
}

function createSliders() {
    a_ = createDiv().parent(sliders);
    a_.class('valueDisplay');
    amplitude = createSlider(0.1, 2.5, 1.0, 0.1).parent(sliders);
    amplitude.class('Slider');

    i_ = createDiv().parent(sliders);
    i_.class('valueDisplay');
    noise_idx = createSlider(0, 7, 0, 1).parent(sliders);
    noise_idx.class('Slider');
}

function draw() {
  background(0);
  shader(myShader);

  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", noises[noise_idx.value()]);
  myShader.setUniform("uAmplitude", amplitude.value());

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);

  sphere(width / 5, 200, 200);
  displayValues();
}

function displayValues() {
    a_.html("Amplitude: " + amplitude.value());
    i_.html("Texture: " + noise_idx.value());
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function mouseClicked() {
//     saveCanvas();
// }