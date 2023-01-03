// based off of https://gorillasun.de/blog/making-of-gateway

let N = 24;
let divide = 6;
let radius = 100;
let rMax = 300;
let completionPercentages;
let rate = 0.001;

let N_;
let divide_;
let rate_;
let sliders = document.getElementById('sliders');



function setup() {
    w = 700;
    createCanvas(w, w);
    strokeWeight(4);
    strokeCap(SQUARE);
    frameRate(20);

    createSliders();
    resetSketch();
    
    var button = createButton("reset").parent(sliders);
    button.mousePressed(resetSketch);
    // noLoop();
}

function resetSketch() {
    N.elt.value = 24;    
    rate.elt.value = 0.001;
    divide.elt.value = 6;
    background(10, 59, 9);
    completionPercentages = [];
    for (let n = 0; n < N.value(); n++) {
        rateOffset = map(n, 0, N.value(), 0, 1);
        completionPercentages.push(rateOffset);
    }
}

function createSliders() {
    N_ = createElement('div').parent(sliders);
    N_.class('valueDisplay');
    N = createSlider(1, 50, 24, 1).parent(sliders);
    N.class('Slider');

    divide_ = createDiv().parent(sliders);
    divide_.class('valueDisplay');
    divide = createSlider(2, 20, 6, 1).parent(sliders);
    divide.class('Slider');

    rate_ = createDiv().parent(sliders);
    rate_.class('valueDisplay');
    rate = createSlider(0.0005, 0.1, 0.001, 0.0001).parent(sliders);
    rate.class('Slider');
}

shift = 0
function draw() {
    background(10, 59, 9, 15);
    translate(w / 2, w / 2);

    for (n = 0; n < N.value(); n++) {
        if (n % 2 == 0) {
            shift = PI / 2;
        } else {
            shift = 0;
        }

        if (n % 3 == 0) {
            stroke(32, 105, 36);
        } else if (n % 3 == 1) {
            stroke(62, 125, 60);
        } else {
            stroke(50, 105, 33);
        }


        for (a = shift; a < TAU + shift; a += TAU / divide.value()) {
            completionPercentages[n] += rate.value();
            if (completionPercentages[n] > 1) {
                completionPercentages[n] = 0;
            }

            radius = map(completionPercentages[n], 0, 1, 0, rMax);
            x = radius * cos(a);
            y = radius * sin(a);

            maxStrokeWeight = 15;
            maxStrokeLength = 100;

            d = dist(x, y, 0, 0);
            dWeight = map(d, 0, rMax, 0, 1);
            strokeWeight(dWeight * maxStrokeWeight);
            strokeLength = dWeight * maxStrokeLength;

            minDist = 90;
            if (d < minDist) {
                dWeight = map(d, 0, minDist, 0, 0.3);
                strokeWeight(dWeight * maxStrokeWeight);
                strokeLength = dWeight * maxStrokeLength;
            }

            point(x, y);

            // V shape
            {
                vRight = createVector(
                    radius * cos(a + TAU / divide.value()),
                    radius * sin(a + TAU / divide.value())
                );

                angleRight = atan2(vRight.x - x, vRight.y - y);

                vecRight = createVector(
                    x + strokeLength * sin(angleRight),
                    y + strokeLength * cos(angleRight)
                );

                line(x, y, vecRight.x, vecRight.y);

                vLeft = createVector(
                    radius * cos(a - TAU / divide.value()),
                    radius * sin(a - TAU / divide.value())
                );

                angleLeft = atan2(vLeft.x - x, vLeft.y - y);

                vecLeft = createVector(
                    x + strokeLength * sin(angleLeft),
                    y + strokeLength * cos(angleLeft)
                );

                line(x, y, vecLeft.x, vecLeft.y);
            }
        }
    }

    displayValues();

}

function displayValues() {
    N_.html("Layers: " + N.value());
    divide_.html("Petals: " + divide.value());
    rate_.html("Pulse: " + rate.value());
}



