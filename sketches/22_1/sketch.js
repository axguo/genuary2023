// based off of https://github.com/aferriss/p5jsShaderExamples/tree/gh-pages/4_image-effects/4-17_delay

let camShader;
let cam;

let shaderLayer;
let numLayers = 90;

let layers = [];

let index1 = 0;
let index2 = numLayers/3; // 30
let index3 = numLayers/3 * 2; // 60

function preload() {
  camShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(600, 600);
  noStroke();

  cam = createCapture(VIDEO);
  cam.size(600, 600);
  cam.hide();

  shaderLayer = createGraphics(600, 600, WEBGL);

  for (let i = 0; i < numLayers; i++){
    let l = createGraphics(600, 600);
    layers.push(l);
  }

}

function draw() {  
  // draw the camera on the current layer
  layers[index1].image(cam, 0, 0, width, height);

  // shader() sets the active shader with our shader
  shaderLayer.shader(camShader);

  // send the camera and the two other past frames into the camera feed
  camShader.setUniform('tex0', layers[index1]);
  camShader.setUniform('tex1', layers[index2]);
  camShader.setUniform('tex2', layers[index3]);

  shaderLayer.rect(0,0,width, height);
  image(shaderLayer, 0,0,width, height);

  // increase all indices by 1, resetting if it goes over layers.length
  // the index runs in a circle 0, 1, 2, ... 29, 30, 0, 1, 2, etc.
  // index1
  // index2 will be somewhere in the past
  // index3 will be even further into the past
  index1 = (index1 + 1)  % layers.length;
  index2 = (index2 + 1) % layers.length;
  index3 = (index3 + 1) % layers.length;
}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }