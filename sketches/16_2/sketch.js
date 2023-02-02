let font,
    fontsize = 26;
let gap = 30;
let margin = 5;
let sentence = "quiet poems watch the window";
let fc = 0;

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
    fill(0, 0, 0, 2);
    noStroke();
    background(255);
}

function distort() {
    for (let i = 0; i < sentence.length; i++) {
        letter = sentence.charAt(i);
        if (letter in swaps && Math.random() < 0.1) {
            sentence = sentence.substring(0, i) + swaps[letter][0] + sentence.substring(i + 1);
        }
    }
}

function draw() {
    for (let y = 0; y < fc; y += 1) {
        push();

        if (y % 2 == 1) {
            translate(width / 2, y * gap + 25);
            scale(1, -1, -1);
        } else {
            translate(width / 2, y * gap + 25 - fontsize / 3);
        }

        text(sentence, 0, 0);
        pop();
    }
    if (frameCount % 15 == 0) {
        fc += 1;
        if (fc == 24) {
            noLoop();
        }
    }
    distort();
}

// function mousePressed() {
//     saveCanvas();
// }
