let shrooms = [];

function setup() {
    createCanvas(500, 700, WEBGL);
    frameRate(10);

    resetSketch();

    // saveButton();
    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    clear();
    // rotateX(-10);
    push();
    ambientLight(255, 255, 255);
    // pointLight(120, 120, 120, -100, -1000, -100);
    background(220);
    rotateX(80);
    normalMaterial();
    specularMaterial(0, 0, 0);
    plane(2500, 4500);
    pop();
    shrooms = [];
    for (let i = 0; i < 20; i++) {
        let x = random() * 500 + 120;
        let y = 0;
        let z = random() * 2000;

        let height = 100 + 100 * random();
        let h_split = 5;
        let diam = height / (5 + random() * 3);
        let cap = height / 1.5;
        let c_height = cap / 2;
        let c_split = random() * 5 + 3;
        let norm = true;

        shroom = createShroom(x, y, z, height, h_split, diam, cap, c_height, c_split, norm);
        shrooms.push(shroom);
    }
}

function saveToFile() {
    // Save the current canvas to file as png
    saveCanvas('mycanvas', 'png')
}

function saveButton() {
    // Create a button for saving the canvas
    removeBtn = createButton("Save Canvas");
    removeBtn.mousePressed(saveToFile);
}


function createShroom(x, y, z, height, h_split, diam, cap, c_height, c_split, norm) {

    let shroom = {
        x: x,
        y: y,
        z: z,
        h: height,
        stem_blocks: h_split,
        d: diam,
        cap: cap,
        cap_blocks: c_split,
        ch: c_height,
        growth: int(-random() * 15),
        w: 0
    }

    return shroom;
}

function drawShroom(shroom) {
    push();
    normalMaterial();
    specularMaterial(100);

    translate(shroom.x, shroom.y, shroom.z);

    let h = shroom.h / shroom.stem_blocks;
    let c = shroom.ch / shroom.cap_blocks;

    if (shroom.growth > 0 && shroom.growth < shroom.stem_blocks) {
        translate(0, h * shroom.growth, 0);
        cylinder(shroom.d + random() * 5, h);
        shroom.growth += 1;
    } else if (shroom.growth > 0 && shroom.growth < shroom.stem_blocks + shroom.cap_blocks) {
        let cap_growth = shroom.growth - shroom.stem_blocks;
        translate(0, h * shroom.stem_blocks + c * cap_growth, 0);
        shroom.w += random() * (c * 1.5);
        cylinder(shroom.cap - shroom.w, c);
        shroom.growth += 1;
    } else {
        shroom.growth += 1;
    }
    pop();
}

function draw() {
    // normalMaterial();
    specularMaterial(200);
    rotateX(-10);
    translate(-400, -400, 0);
    ambientLight(255);
    pointLight(255, 255, 255, -100, -100, -100);

    for (let i = 0; i < shrooms.length; i++) {
        drawShroom(shrooms[i]);
    }
}


function mushroom(x, y, z, height, h_split, diam, cap, c_height, c_split, norm) {
    push();
    if (norm) {
        normalMaterial();
    }
    specularMaterial(100);

    translate(x, y, z);

    h = height / h_split;
    c = c_height / c_split;

    for (let i = 0; i < h_split; i++) {
        translate(0, h, 0);
        cylinder(diam + random() * 5, h);
    }

    let m = 0;
    for (let j = 0; j < c_split; j++) {
        translate(0, c, 0);
        m += random() * (c * 1.5);
        cylinder(cap - m, c);
    }

    pop();


}