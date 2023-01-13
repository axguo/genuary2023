let fbo;
let myShader;
let N = 25;
let N_;
let circles = [];
let bw = true;
let bw_;

function setup() {
    createCanvas(600, 700, WEBGL);
    blendMode(ADD);
    frameRate(20);
    fbo = createFramebuffer();
    myShader = createShader(vert, frag);
    createSliders();
    createCircles();
    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
    
}

function resetSketch() {
    N.elt.value = 50;
    bw.elt.value = 0;
    circles = [];
    createCircles();
}

function createSliders() {
    N_ = createElement('div').parent(sliders);
    N_.class('valueDisplay');
    N = createSlider(1, 200, 50, 1).parent(sliders);
    N.class('Slider');

    bw_ = createDiv().parent(sliders);
    bw_.class('valueDisplay');
    bw = createSlider(0, 1, 0, 1).parent(sliders);
    bw.class('Slider');
}

function createCircles() {
    for (let i = 0; i < 200; i++) {
        let x = (random() - 0.5) * (width - 300);
        let y = (random() - 0.5) * (height - 300);
        let r = random() * 400 + 50;
        let theta = random() * 2 * PI;

        let c = { x: x, y: y, r: r, theta: theta };
        circles.push(c);

        if (random() < 0.75) {
            let conc = int(random() * 5 + 2);
            let margin = random() * r / conc / 2 + 50;
            for (let j = 0; j < conc; j++) {
                let c = { x: x, y: y, r: r - j * margin, theta: theta };
                circles.push(c);
            }
        }
    }
}

function draw() {
    fbo.draw(() => {
        clear();
        push();
        background(0);
        noStroke();
        noLights();
        push();
        fill(1, 1, 1, 255);
        for (let i = 0; i < N.value(); i++) {
            let c = circles[i];
            push();
            translate(c.x, c.y);
            rotate(c.theta);
            fill(1, 1, 1, 255);
            circle(c.x, c.x, c.r);
            c.theta += 0.05;
            pop();
        }
        pop();
    })

    clear();
    push();
    noStroke();
    rectMode(CENTER);
    shader(myShader);
    _renderer.getTexture(fbo.depth).setInterpolation(
        _renderer.GL.NEAREST,
        _renderer.GL.NEAREST
    )
    myShader.setUniform('uImg', fbo.color);
    myShader.setUniform('uDepth', fbo.depth);
    if(bw.value()==0){
        myShader.setUniform('bw', true);
    } else {
        myShader.setUniform('bw', false);
    }
    
    rect(0, 0, width, -height);
    pop();

    displayValues();
}


function displayValues() {
    N_.html("Circles: " + N.value());
    bw_.html("Color: " + bw.value());
}

function mouseClicked() {
    saveCanvas();
}