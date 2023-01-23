let tile_size = 150;
let t;
let w = 600;
let h = 600;
let tW = 100;
let tH = 100;
let f = 0;

function setup() {
    createCanvas(w + tW, h);
    background(255);
    t = createGraphics(tW, tH);
    frameRate(5);

    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
    t.fill(235, 150, 47, 150);
}

function resetSketch() {
    f = 0;
    t.fill(random() * 255, random() * 255, random() * 255, 150);
}
function draw() {
    clear();
    t.clear();
    // t.background(100, 100, 100, 10);
    // t.noStroke();
    // t.ellipse(t.width / 2, t.height / 2, 50, 50);
    // t.ellipse(t.width / 2, t.height / 2, 50+frameCount, 50+frameCount);


    for (let i = 0; i < 8; i++) {
        t.push();
        t.translate((f) % tW, (f) % tW);
        t.rotate(TWO_PI * i / 8);
        t.strokeWeight(random() * 2);
        t.triangle(0, 0, random() * 30, random() * 30, random() * 30, random() * 30);
        t.pop();
    }

    f += 3;


    for (let i = -tile_size; i < w; i += tile_size / 2) {
        for (let j = -tile_size; j < h; j += tile_size / 2) {
            image(t, i + tW, j, tile_size, tile_size);
        }
    }
    strokeWeight(2);
    rect(1, 1, tW, tH);
    image(t, 0, 0);
}


// function mouseClicked() {
//     saveCanvas();
// }