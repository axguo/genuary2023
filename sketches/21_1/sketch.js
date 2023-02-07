let px = 6;
let borderSize = 15;
let marginSize = 30;

let colors = [];

let border;
let margin;

function setup() {
    createCanvas(500, 750);
    noStroke();
    noLoop();
    imageMode(CENTER);


    colors.push(color(165, 36, 44));
    colors.push(color(192, 150, 128));
    colors.push(color(183, 98, 65));
    colors.push(color(135, 33, 33));


    border = createGraphics(borderSize, borderSize);
    border.noStroke();
    margin = createGraphics(marginSize, marginSize);
    margin.noStroke();
    setupRug();
    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    setupRug();
    drawRug();
}

function setupRug() {
    for (let x = 0; x < borderSize; x += 3) {
        for (let y = 0; y < borderSize; y += 3) {
            if (Math.random() < 0.7) {
                border.fill(88, 69, 63);
                border.rect(x, y, 3);
            } else {
                border.fill(165, 36, 44);
                border.rect(x, y, 3);
            }
        }
    }

    for (let x = 0; x < marginSize; x += px) {
        for (let y = 0; y < marginSize; y += px) {
            margin.fill(colors[int(Math.random() * colors.length)]);
            margin.rect(x, y, px);
        }
    }
}

function draw() {
    drawRug();
}

function drawRug() {
    background(255);
    background(125, 90, 120);

    for (let x = 0; x <= width / 2 + px; x += px) {
        for (let y = 0; y <= height / 2 + px; y += px) {
            if (Math.random() < 0.45) {
                fill(colors[int(Math.random() * colors.length)]);
            }
            else {
                fill(30, 27, 33);
            }
            rect(x, y, px);
            rect(width - x, y, px);
            rect(width - x, height - y, px);
            rect(x, height - y, px);
        }
    }



    marginImage = margin.get();
    let m = borderSize;
    for (let x = m + 2 * px; x < width - m; x += borderSize) {
        image(marginImage, x, marginSize / 2 + m);

        push();
        rotate(PI);
        image(marginImage, -x, -height + marginSize / 2 + m);
        pop();
    }
    for (let y = m + 15; y < height - m; y += marginSize) {
        push();
        rotate(-PI / 2);
        image(marginImage, -y, marginSize / 2 + m);
        pop();

        push();
        rotate(PI / 2);
        image(marginImage, y, -width + marginSize / 2 + m);
        pop();
    }

    borderImage = border.get();
    for (let x = 0; x < width; x += borderSize) {
        image(borderImage, x, borderSize / 2);

        push();
        rotate(PI);
        image(borderImage, -x, -height + borderSize / 2);
        pop();
    }
    for (let y = 0; y < height; y += borderSize) {
        push();
        rotate(-PI / 2);
        image(borderImage, -y, borderSize / 2);
        pop();

        push();
        rotate(PI / 2);
        image(borderImage, y, -width + borderSize / 2);
        pop();
    }


    m = borderSize + marginSize;
    for (let x = m + px; x < width - m; x += borderSize) {
        image(borderImage, x, borderSize / 2 + m);

        push();
        rotate(PI);
        image(borderImage, -x, -height + borderSize / 2 + m);
        pop();
    }
    for (let y = m + px; y < height - m; y += borderSize) {
        push();
        rotate(-PI / 2);
        image(borderImage, -y, borderSize / 2 + m);
        pop();

        push();
        rotate(PI / 2);
        image(borderImage, y, -width + borderSize / 2 + m);
        pop();
    }
}
