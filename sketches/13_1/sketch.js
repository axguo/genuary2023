// based off of https://www.youtube.com/watch?v=YsGeMIpEcY4&t=17s

let v = [];
let cols = 180 * 8, rows = 45;

let t_D = 180 * 8 / cols;
let r_D = 1 / rows;

let opening;
let vDensity = 6.5;
let pAlign = 3.6;
let curve1 = 2;
let curve2 = 1.2;

let canvas;

function setup() {
    canvas = createCanvas(700, 700, WEBGL);

    colorMode(HSB);
    angleMode(DEGREES);
    noStroke();

    // frameRate(10);

    // noLoop();
}

function draw() {
    background(48, 29, 2);

    rotateX(-60);

    for (let r = 0; r <= rows; r++) {
        v.push([]);
        for (let theta = 0; theta <= cols; theta++) {
            let phi = (180 / map(frameCount % 30, 0, 29, 10, 1)) * Math.exp(-theta * t_D / (vDensity * 180));
            let petalCut = 0.5 + abs(asin(sin(2.25 * theta)) + 120 * sin(2.25 * theta)) / 360;
            let hangDown = curve1 * pow(r * r_D, 2) * pow(curve2 * r * r_D - 1, 2) * sin(phi);

            let pX = 260 * petalCut * (r * r_D * sin(phi) + hangDown * cos(phi)) * sin(theta * t_D);
            let pY = -260 * petalCut * (r * r_D * cos(phi) - hangDown * sin(phi));
            let pZ = 260 * petalCut * (r * r_D * sin(phi) + hangDown * cos(phi)) * cos(theta * t_D);
            let pos = createVector(pX, pY, pZ);
            v[r].push(pos);
        }
    }

    for (let r = 0; r < v.length; r++) {
        fill(320, r * r_D * 70, 90, 70);
        for (let theta = 0; theta < v[r].length; theta++) {
            if (r < v.length - 1 && theta < v[r].length - 1) {
                beginShape();
                vertex(v[r][theta].x, v[r][theta].y, v[r][theta].z);
                vertex(v[r + 1][theta].x, v[r + 1][theta].y, v[r + 1][theta].z);
                vertex(v[r + 1][theta + 1].x, v[r + 1][theta + 1].y, v[r + 1][theta + 1].z);
                vertex(v[r][theta + 1].x, v[r][theta + 1].y, v[r][theta + 1].z);
                endShape(CLOSE);
            }
        }
    }

    v = [];
}