let inc = [];
let strokes = [];
let as = [];
let bs = [];
let fc = 0;


function setup() {
    createCanvas(600, 500);
    noFill();
    frameRate(10);
    for (let i = 0; i < 15; i++) {
        inc.push(random() * 4 + random());
        strokes.push(random() + 0.5);
        strokes.push(1.2);
        as.push(random() * 2 + 3);
        bs.push(random() * 5 + 2);
    }

    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    inc = [];
    strokes = [];
    as = [];
    bs = [];
    fc = 0;

    for (let i = 0; i < 15; i++) {
        inc.push(random() * 4 + random());
        strokes.push(random() + 0.5);
        strokes.push(1.2);
        as.push(random() * 2 + 3);
        bs.push(random() * 5 + 2);
    }
}
function draw() {
    background(245, 241, 237);

    for (let r = 0; r < 15; r += 1) {
        beginShape();
        for (let i = 0; i < fc; i += inc[r]) {
            let t = i;

            let a = as[r];
            let b = bs[r];

            let x = a * t - b * sin(t) + 550 - fc * a;
            let y = a - b * cos(t) + 20 + r * 30 + noise(t) * 55;

            curveVertex(x, y);
        }
        strokeWeight(strokes[r]);
        endShape();
    }
    fc += 1;
}


// function mouseClicked() {
//     saveCanvas();
// }