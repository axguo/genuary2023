let font,
  fontsize = 26;
let gap = 30;
let margin = 5;
let sentences = ["quiet poems watch the window", "join me at the edge of blue"];
let sentence;
let fc = 0;
let printed;

let swaps = {
  a: ["e"],
  b: ["q"], // dp
  d: ["p"], // ditto
  e: ["a"],
  m: ["w"], // uu
  n: ["u"],
  p: ["d"],
  q: ["b"],
  u: ["n", "r"],
  w: ["m"], //nn
  i: ["j"],
  j: ["i"],
};

function preload() {
  font = loadFont("Merriweather-Regular.ttf");
}

function setup() {
  createCanvas(510, 700);

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  frameRate(10);
  fill(0, 0, 0, 5);
  noStroke();
  background(255);
  
  sentence = sentences[int(random()*sentences.length)];
  printed = [sentence];

  var button = createButton("generate").parent(sliders);
  button.mousePressed(resetSketch);
}

function resetSketch() {
  background(255);
  sentence = sentences[int(random() * sentences.length)];
  printed = [sentence];
  fc = 0;
  loop();
}


function distort() {
  for (let i = 0; i < sentence.length; i++) {
    letter = sentence.charAt(i);
    if (letter in swaps && Math.random() < 0.025) {
      sentence = sentence.substring(0, i) + swaps[letter][0] + sentence.substring(i + 1);
    }
  }
}

function draw() {
  
  for (let y = 0; y < fc; y += 1) {
    
    if(y >= printed.length) {
      printed.push(sentence);
    }
    
    let s = printed[y];
    
    push();
    if (y % 2 == 1) {
      translate(width / 2, y * gap + 25);
      scale(1, -1, -1);
    } else {
      translate(width / 2, y * gap + 25 - fontsize / 3);
    }
    text(s, 0, 0);
    pop();
  }
  if (frameCount % 4 == 0) {
    fc += 1;
    distort();
    if (fc == 24) {
      noLoop();
    }
  }
  
}

// function mousePressed() {
//   saveCanvas();
// }
