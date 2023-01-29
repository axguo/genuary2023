let fc = 0;

function setup() {
    createCanvas(500, 500);
    noFill();
    background(217, 164, 126);
    stroke(9, 112, 104);
    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    background(217, 164, 126);
    fc = 0;
}

function draw() {
    let a = 0, b = 0, r;
    beginShape();
    while (a < fc) {
        r = a * .3;

        let x = 250 + r * cos(a) + r * sin(b) / 10;
        let y = 250 + r * sin(a);
        curveVertex(x, y);

        a += 0.3;
        b += 0.01;
    }
    endShape();
    fc += 1;
}