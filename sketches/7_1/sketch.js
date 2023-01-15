// based off https://www.openprocessing.org/sketch/157576

let num = 5000;
let noiseScale = 500;
let noiseStrength = 1;
let particles = [num];

function setup() {
    createCanvas(600, 700);
    noStroke();

    for (let i = 0; i < num; i++) {
        let loc = createVector(random(width * 1.2), random(height), 3);
        let angle = 0; //any value to initialize
        let dir = createVector(cos(angle), sin(angle));
        let speed = random(0.5, 2);
        particles[i] = new Particle(loc, dir, speed);
    }


    let button = createButton("generate").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    background(0);
    particles = [num];
    for (let i = 0; i < num; i++) {
        let loc = createVector(random(width * 1.2), random(height), 2);
        let angle = 0; //any value to initialize
        let dir = createVector(cos(angle), sin(angle));
        let speed = random(0.5, 2);
        particles[i] = new Particle(loc, dir, speed);
    }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {
    background(0, 10);
    for (let i = 0; i < particles.length; i++) {
        particles[i].run();
    }
}

class Particle {
    constructor(_loc, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;

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
        this.dir.x = sin(angle);
        this.dir.y = sin(angle);
        let vel = this.dir.copy();
        let d = 1; //direction change
        vel.mult(this.speed * d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
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
        }
    }
    update() {
        fill(255);
        ellipse(this.loc.x, this.loc.y, this.loc.z);
    }
}
