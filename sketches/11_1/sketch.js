let margin = 50;

function setup() {
    createCanvas(600, 750);
    noLoop();
    
    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    drawSketch();
}

function draw() {
    drawSketch();
}

function drawSketch() {
    noStroke();
    background(196, 184, 179);
    fill(245, 233, 228);
    rect(margin, margin, width - 2 * margin, height - 2 * margin);


    fill(random() * 255, random() * 255, random() * 255);
    push();
    translate(245, 246);
    rotate(-0.6);
    rect(0, 0, 70, 250);
    pop();



    fill(random() * 255, random() * 255, random() * 255, 200);
    circle(160, 570, 250);

    fill(random() * 255, random() * 255, random() * 255, 200);
    triangle(377, 203, 569, 86, 497, 192);
    triangle(353, 214, 557, 516, 582, 340);
    triangle(394, 370, 414, 740, 565, 672);


    strokeWeight(20);
    strokeCap(SQUARE);
    stroke(random() * 255, random() * 255, random() * 255);

    fill(random() * 255, random() * 255, random() * 255, 200);
    for (let i = 0; i < 10; i++) {
        push();
        noStroke();
        translate(random() * width, random() * height);
        rotate(random() * 2 * PI);
        rect(0, 0, random() * 30, random() * 20);
        pop();
    }

    let x = 173;
    let y = 214;
    line(340, 596, 513, 382);
    strokeWeight(10);
    line(348, 634, 348 + x * 0.6, 634 - y * 0.6);
    line(370, 640, 370 + x * 0.6, 640 - y * 0.6);

    stroke(random() * 255, random() * 255, random() * 255);
    strokeWeight(30);
    line(76, 641, 259, 103);
    strokeWeight(10);
    line(136, 279, 221, 68);
    strokeWeight(20);
    line(192, 77, 95, 269);


    strokeWeight(10);
    stroke(random() * 255, random() * 255, random() * 255);
    line(140, 179, 460, 649);



    granulateChannels(30);

}

function granulateChannels(amount) {
    loadPixels();
    const d = pixelDensity();
    const pixelsCount = 4 * (width * d) * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        pixels[i] = pixels[i] + random(-amount, amount);
        pixels[i + 1] = pixels[i + 1] + random(-amount, amount);
        pixels[i + 2] = pixels[i + 2] + random(-amount, amount);
        // comment in, if you want to granulate the alpha value
        // pixels[i+3] = pixels[i+3] + random(-amount, amount);
    }
    updatePixels();
}

// function mouseClicked() {
//     console.log(mouseX, mouseY);
// }

// function mouseClicked() {
//     saveCanvas();
// }