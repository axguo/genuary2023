let windows = 6;

let poem =
    "She’s a pendulum girl, swaying herself down the street hips first letting the body follow. Yesterday she cried all morning following a text from her boyfriend, wondering whether his lack of enthusiasm was a lack of understanding was a lack of love was a sign was the final straw from the universe telling her that she should think more about her future. The tea leaves seemed to corroborate her phone her heart her head. She’s a pendulum girl full of melancholy wishing it could sound like a melody, so today she swings out of her depression and down the street with a smile aimed at every tree. She trusts herself her heart her head and trusts that they’re telling her it will all work out and that love is abundant that everything is abundant that her mindset is abundant. She’s a pendulum girl, so tomorrow she goes back to ignoring her messages ignoring her pain ignoring her body just trying to survive. Where others find balance she has momentum has adventure has trial. Tomorrow is always another day for a pendulum girl.";

let pg;
let msk;
let rects = [];
let ww = 100;
let wh = 150;

var c1, c2;

function setup() {
    createCanvas(700, 550);
    noStroke();
    textSize(40);
    textAlign(CENTER, TOP);
    noCursor();
}

function draw() {
    background(255);

    fill(0);
    noStroke();
    text(poem, -frameCount % width, 0, width * 2, height);

    //draw on external canvas
    pg = createGraphics(width, height);
    //yellow+green foreground shapes
    pg.fill(0);
    pg.noStroke();
    pg.rect(0, 0, width, height);
    // c1 = color(0);
    // c2 = color(255);
    // setGradient(c1, c2);

    //punch a hole in the shapes
    msk = createGraphics(width, height);
    msk.background(0);
    msk.erase();
    msk.noStroke();

    stroke(0);
    noFill();
    // strokeWeight(5);
    if (windows > 0) {
        rect(mouseX - ww / 2, mouseY - wh / 2, ww, wh);
        msk.rect(mouseX - ww / 2, mouseY - wh / 2, ww, wh);
        strokeWeight(2);
        line(mouseX - ww / 2, mouseY, mouseX + ww / 2, mouseY);
        line(mouseX, mouseY - wh / 2, mouseX, mouseY + wh / 2);

    }
    strokeWeight(2);
    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];
        rect(r.x, r.y, ww, wh);
        msk.rect(r.x, r.y, ww, wh);
        line(r.x + ww / 2, r.y, r.x + ww / 2, r.y + wh);
        line(r.x, r.y + wh / 2, r.x + ww, r.y + wh / 2);
    }

    let mskImage = msk.get();

    pgImage = pg.get();
    pgImage.mask(mskImage);

    image(pgImage, 0, 0);
}

function mousePressed() {
    if (windows > 0) {
        let r = { x: mouseX - ww / 2, y: mouseY - wh / 2 };
        rects.push(r);
        windows -= 1;
    }
}

function setGradient(c1, c2) {
    noFill();
    for (var y = 0; y < height; y++) {
        var inter = map(y, 0, height, 0, 1);
        var c = lerpColor(c1, c2, inter);
        pg.stroke(c);
        pg.line(0, y, width, y);
    }
}
