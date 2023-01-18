// based off of https://openprocessing.org/sketch/1676105

let theShader, vert, frag;
let cols = 7;
let rows = 7;
let nc = rows * cols;
let c = 205;
let c_;

let arr = [];

function preload() {
    vert = loadStrings('shader.vert');
    frag = loadStrings('shader.frag');
}


function setup() {
    w = 600;
    createCanvas(w, w, WEBGL);
    pixelDensity(1);
    noStroke();
    theShader = createShader(vert.join('\n'), frag.join('\n').replace('%%n_val%%', nc));
    // frameRate(10);  
    createSliders();
}

function createSliders() {
    c_ = createDiv().parent(sliders);
    c_.class('valueDisplay');
    c = createSlider(0, 295, 205, 1).parent(sliders);
    c.class('Slider');
}

function draw() {
    theShader.setUniform('u_resolution', [width, height]);
    theShader.setUniform('u_t', frameCount);
    theShader.setUniform('u_color', c.value());


    arr = [];
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            let x = c * 90 + 30;
            let y = r * 90 + 30;
            arr.push(x);
            arr.push(y);
            arr.push(1);
        }
    }


    theShader.setUniform(`u_cir`, arr);
    shader(theShader);
    rect(0, 0, width, height);
    displayValues();
}

function displayValues() {
    c_.html("Color: " + c.value());
}

// function mouseClicked() {
//     saveCanvas();
// }
