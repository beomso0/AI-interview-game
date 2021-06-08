let t = 0;

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(255,10);
  push();
  translate(width/2,height/2);
  fill(255, 155, 125);
  ellipse(0,0,20,20);
  fill(166, 255, 222);
  let eX1 = 20 * cos(2*PI*t);
  let eY1 = 20 * sin(2*PI*t);
  ellipse(eX1, eY1, 20);
  fill(138, 210, 255);
  let eX2 = 40 * sin(2*PI*t);
  let eY2 = 40 * cos(2*PI*t);
  ellipse(eX2, eY2, 20);
  pop();
  t = t + 0.01;
}