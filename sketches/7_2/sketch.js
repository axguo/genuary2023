// based off https://www.openprocessing.org/sketch/157576

let num = 7000;
let noiseScale = 200;
let noiseStrength = 1;
let particles = [num];

let c1;
let c2;
let c3;
let c4;
let c5;

let colors;

function setup() {
    createCanvas(500, 650);
    noStroke();

    resetSketch();

    let button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    background(255);
    c3 = color(149, 146, 228);
    c5 = color(241, 194, 127);
    c4 = color(79, 173, 240);
    c2 = color(234, 120, 143);
    c1 = color(94, 149, 236);

    colors = [c1, c2, c3, c4, c5];
    particles = [num];
    for (let i = 0; i < num; i++) {
        let loc = createVector(random(width * 1.2), random(height), 3);
        let step = int(loc.y / height * 5) * 100;
        let angle = 0; //any value to initialize
        let dir = createVector(cos(angle), sin(angle));
        let speed = random(0.5, 2);
        let c = colors[int(random() * 5)];
        particles[i] = new Particle(loc, dir, speed, step);
    }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {
    background(255, 10);
    for (let i = 0; i < particles.length; i++) {
        particles[i].run();
    }
}

class Particle {
    constructor(_loc, _dir, _speed, _step) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
        this.step = _step;

    }
    run() {
        this.move();
        this.checkEdges();
        this.update();
    }
    move() {
        let angle =
            noise(
                this.loc.x / noiseScale,
                this.loc.y / noiseScale,
                frameCount / noiseScale
            ) *
            TWO_PI *
            noiseStrength; //0-2PI
        this.dir.x = sin(angle) + cos(angle);
        this.dir.y = 2 * cos(angle) - sin(angle);
        this.dir.normalize();
        let vel = this.dir.copy();
        let d = 1; //direction change
        vel.mult(this.speed * d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
        this.step += 1;
    }
    checkEdges() {
        if (
            this.loc.x < 0 ||
            this.loc.x > width ||
            this.loc.y < 0 ||
            this.loc.y > height
        ) {
            this.loc.x = random(width * 1.2);
            this.loc.y = random(height);
            this.step = 0;
        }
    }
    update() {

        fill(colors[int(this.step / 100) % 5]);
        ellipse(this.loc.x, this.loc.y, this.loc.z);
    }
}
