let font,
    fontsize = 100;

let fc = 0;

let index = 0;
let sentences = ["hello world", "a great feat", "fold over"];
let shadows = ["hell  world", "a great  eat", " old over"];

let pg;

function preload() {
    font = loadFont("Merriweather-Regular.ttf");
}

function setup() {
    createCanvas(600, 600);
    background(252, 235, 159);
    textFont(font);
    textSize(fontsize);
    noCursor();

    pg = createGraphics(width + 1000, height + 1000);

    pg.textFont(font);
    pg.textSize(fontsize);
    pg.noStroke();
}

function draw() {
    background(252, 235, 159);
    pg.fill(126, 230, 219);
    fill(18, 150, 137);
    pg.text(shadows[index], mouseX +150, fc + 100);

    pgImage = pg.get();
    image(pgImage, mouseX-500, fc);
    text(sentences[index], mouseX -200, fc);

    fc += 3;

    if (fc > height) {
        pg.background(252, 235, 159);
        fc = 0;
        index = (index + 1) % shadows.length;
    }
}

// function mousePressed() {
//     saveCanvas();
// }
