let N = 20;
let divide = 8;
let divide_;
let radius = 300;
let rMax = 350;
let completionPercentages;
let rate = 0.04;


function setup() {
    w = 600;
    createCanvas(w, w);
    strokeWeight(4);
    frameRate(10);
    noStroke();

    // saveButton();
    createSliders();
    var button = createButton("reset").parent(sliders);
    button.mousePressed(resetSketch);
    resetSketch();
}

function resetSketch() {
    divide.elt.value = 8;
    background(255);
    completionPercentages = [];
    for (let n = 0; n < N; n++) {
        rateOffset = map(n, 0, N, 0, 1);
        completionPercentages.push(rateOffset);
    }
}

function createSliders() {
    divide_ = createDiv().parent(sliders);
    divide_.class('valueDisplay');
    divide = createSlider(2, 20, 6, 1).parent(sliders);
    divide.class('Slider');
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


shift = 0
function draw() {
    background(255, 255, 255, 80);
    translate(w / 2, w / 2);

    for (n = 0; n < N; n++) {
        if (n % 2 == 0) {
            shift = PI / 2;
        } else {
            shift = 0;
        }

        completionPercentages[n] += rate;
        if (completionPercentages[n] > 1) {
            completionPercentages[n] = 0;
            completionPercentages.push(0);
        }
        for (a = shift; a < TAU + shift; a += TAU / divide.value()) {
            radius = map(completionPercentages[n], 0, 1, 0, rMax);
            x = radius * cos(a);
            y = radius * sin(a);

            maxStrokeWeight = 15;
            maxStrokeLength = 200;

            d = dist(x, y, 0, 0);
            dWeight = map(d, 0, rMax, 0, 1);

            strokeLength = dWeight * maxStrokeLength;
            fill(dWeight * maxStrokeWeight * 30);
            // fill(252, 127, 3, dWeight*maxStrokeWeight);
            ellipse(x, y, strokeLength);
        }
    }

    displayValues();
}

function displayValues() {
    divide_.html("Divisions: " + divide.value());
}