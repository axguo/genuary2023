let n = 50;
let d = 900;
let inner_d = 60;
let pent = [1, 3, 5, 8, 10, 12];
let cam;
let fc = 0;
let prevPressed = false;

let font,
    fontsize = 10;

let nodes = [];
let words = [];
let lines = [];

let poems = [
    "a whispered story...",
    "sounds of a hearbeat",
    "too many letters",
    "too many characters",
    "too many memories",
    "tug at this red string",
    "see where it leads",
    "a web is a trap",
    "the web is a trap",
    "so then why is this so lovely?",
    "dusty lights",
    "old journals",
    "old flames",
    "magpie bridge",
    "heavenly river",
    "two hearts united",
    "jade rabbit",
    "elixir for you",
];

function preload() {
    font = loadFont("Merriweather-Regular.ttf");
}

function setup() {
    createCanvas(800, 800, WEBGL);
    cam = createCamera();
    // noLoop();
    createNodes();
    // frameRate(5);
    var button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    clear();
    background(43, 84, 207);
    for (let i = 0; i < words.length; i++) {
        words[i].sound.stop();
    }
    nodes = [];
    words = [];
    lines = [];
    createNodes();
    fc = 0;
}

function createNodes() {
    for (let i = 0; i < n; i++) {
        let x = (random() - 0.5) * d;
        let y = (random() - 0.5) * d;
        let z = (random() - 0.5) * d;

        let node = {
            x: x,
            y: y,
            z: z,
            connected: false,
        };

        nodes.push(node);
    }
}

function drawScene() {
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, 10, 10);

    ambientLight(255);
    pointLight(255, 255, 255, 0, 0, 0);
    pointLight(255, 255, 255, 0, 0, 1000);

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];

        push();
        translate(node.x, node.y, node.z);
        noStroke();

        ambientMaterial(50);
        noStroke();

        if (node.connected) {
            emissiveMaterial(255, 242, 0);
        } else {
            fill(0, 49, 148);
            // sphere(3);
        }

        sphere(3);
        pop();
    }
    drawWords();
    drawLines();
}

function drawWords() {
    text("a whispered story...", 0, 0, 0);

    for (let i = 0; i < words.length; i++) {
        w = words[i];
        let x = w.x;
        let y = w.y;
        let z = w.z;

        let phi = Math.atan(Math.sqrt(x * x + y * y) / z);
        let theta = Math.atan(y / x);

        push();
        translate(w.x, w.y, w.z);
        rotateY(phi);
        rotateX(theta);
        text(w.text, 0, 0, 0);
        pop();

        if (w.sound.getAmp() > 0) {
            w.sound.amp(w.sound.getAmp() - 0.005);
        }
    }
}

function drawLines() {
    // console.log(lines.length);
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        stroke(255, 255, 255, 0);
        strokeWeight(0.1);
        line(l.x1, l.y1, l.z1, l.x2, l.y2, l.z2);
    }
}

function connectNodes() {
    ind1 = int(random() * n);
    ind2 = int(random() * n);
    n1 = nodes[ind1];
    n2 = nodes[ind2];

    n1.connected = true;
    n2.connected = true;

    let l = { x1: n1.x, y1: n1.y, z1: n1.z, x2: n2.x, y2: n2.y, z2: n2.z };
    // console.log(l);
    lines.push(l);

    let x = (n1.x + n2.x) / 2;
    let y = (n1.y + n2.y) / 2;
    let z = (n1.z + n2.z) / 2;

    let env = new p5.Env();
    env.setADSR(0.05, 0.1, 2, 1);
    env.setRange(1.2, 0);

    let w = new p5.Oscillator();
    w.start();

    let ind = int(random() * pent.length);
    let p = pent[ind];

    f = 440 * Math.pow(2, p / 12 - 1.5);

    w.freq(f);
    w.setType("sine");
    w.amp(1);
    // w.amp(env);
    // env.play();

    let text = poems[int(Math.random() * poems.length)];

    let t = { text: text, x: x, y: y, z: z, sound: w };
    words.push(t);
}

function draw() {
    background(43, 84, 207);
    // background(0);
    // rotateX(0.001 * frameCount);
    if (!mouseIsPressed) {
        if (prevPressed) {
            prevPressed = false;
            fc -= 0.5;
        } else {
            fc += 0.5;
        }
    } else {
        prevPressed = true;
    }

    rotateY(0.001 * fc);
    orbitControl();

    drawScene();
    if (frameCount % 60 == 0) {
        connectNodes();
    }

    // console.log(cam.eyeX);
}
