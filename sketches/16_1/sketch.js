let font,
    fontsize = 26;
let gap = 20;
let margin = 5;
let sentence = "abide by quick jiving memories";
let l = 0;

function preload() {
    font = loadFont("Merriweather-Regular.ttf");
}

function setup() {
    createCanvas(510, 700);
    // Set text characteristics
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    frameRate(5);
    noStroke();
    // noLoop();
}

function draw() {
    background(142, 185, 191);
    for (let y = margin * 6; y < height - gap; y += gap) {
        push();

        if (l % 2 == 0) {
            translate(width / 2, y);
            scale(1, -1, -1);
        } else {
            translate(width / 2, y - fontsize / 3);
        }

        text(sentence, 0, 0);
        pop();
        l += 1;
    }
}

// function mousePressed() {
//     saveCanvas();
// }
