let dandy = [];
let r = 50;
let wind;
let g;
let blow = false;
let pressed = 0;
let p = false;

function setup() {
    createCanvas(600, 600, WEBGL);
    dandy.push(createDandelion(0, 0, 0));
    angleMode(DEGREES)
    stroke(255, 255, 255, 0);
    fill(255, 255, 255, 10);
    g = createVector(0, 0.01, 0);

    myButton = createButton('*** make a wish ***').parent(sliders)
        .mousePressed(() => { p = true; })
        .mouseReleased(() => { p = false; });

    var button = createButton("reset").parent(sliders);
    button.mousePressed(resetSketch);
}

function resetSketch() {
    dandy = [createDandelion(0, 0, 0)];
}

function draw() {
    rotateX(10);
    rotateY(20);
    if (p) {
        blow = true;
        pressed += 1;
    } else {
        pressed = 0;
        blow = false;
    }
    background(0);

    if (blow) {
        wind = createVector(80 * noise(frameCount / 100), 50 * (noise(frameCount / 130) - 0.75), 0);
    } else { wind = createVector(noise(frameCount / 100) * 30, noise(frameCount) - 1, 1); }

    for (let i = 0; i < dandy.length; i++) {
        for (let j = 0; j < dandy[i].length; j++) {
            let p = dandy[i][j];
            p.run();
        }

    }
    strokeWeight(1);
    sphere(15, 10, 10);
    strokeWeight(3);
    line(0, 0, 0, 0, 100, 0);

}



function createDandelion(x, y, z) {
    let d = []
    for (let phi = 0; phi < 360; phi += 20) {
        for (let theta = 0; theta < 180; theta += 20) {
            let loc = createVector(x, y, z);
            let angle = [theta, phi];
            let dir = createVector(0, 0, 0);
            let speed = random(0.2, 2);
            let p = new Puff(loc, angle, dir, speed);
            d.push(p)
        }
    }
    return d;
}

class Puff {
    //   location: x,y on screen
    //   orientation: direction the puff points
    //   direction: dir of movement
    //   speed: speed of movement
    constructor(_loc, _or, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.or = _or;
        this.speed = _speed;
        this.blow = false;
        this.lean = 0;
        this.rot = random(1);

    }

    run() {
        if (blow && random() < 0.01) {
            this.blow = true;
        }
        if (this.blow) {
            this.move();
        }
        this.update();
    }

    move() {
        let theta = this.or[0];
        let phi = this.or[1];

        if (blow) {
            wind = createVector(200 * random() + 10, 100 * (random() - 0.75), 0);
            this.dir = wind.copy();
        }
        this.dir.mult(0.9);
        let vel = this.dir.copy();
        // vel.add(g);
        vel.normalize();
        let d = 1; //direction change
        vel.mult(this.speed * d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
    }

    update() {
        push();
        strokeWeight(1);
        stroke(255, 255, 255, 0);
        fill(255, 255, 255, 10);
        translate(this.loc.x, this.loc.y, this.loc.z);
        let theta = this.or[0];
        let phi = this.or[1];
        let px = r * sin(phi) * sin(theta);
        let py = -r * cos(phi);
        let pz = r * sin(phi) * cos(theta);


        console.log(blow && !this.blow);
        if (blow && !this.blow) {
            this.lean = 2 * pressed * noise(frameCount / 100);
        }
        if (this.lean > 0) {
            this.lean -= 1;
        }

        let or = createVector(px + this.lean, py, pz);

        or.normalize();
        or.mult(r);

        if (blow) {
            this.speed += 0.01;
        }

        if (this.blow && this.speed > 0.5) {
            this.speed -= 0.005;
        }

        if (this.blow) {
            line(or.x / 2, or.y / 2, or.z / 2, or.x, or.y, or.z);
            this.or[0] += this.rot;
            this.or[1] += this.rot;
        } else {
            line(or.x / 8, or.y / 8, or.z / 8, or.x, or.y, or.z);
        }

        translate(or.x, or.y, or.z);
        sphere(2);
        pop();
    }
}