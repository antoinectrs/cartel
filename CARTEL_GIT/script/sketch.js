let Engine, Composite, World, Vertices, Body, Bodies, Constraint;

let bounds;
let engine;
let world;
let ground, ground2;

let letterTemplates = {};
let bodies = [];
let bodiesMaxLength = 100;
let myWidth;
let myHeight;

let grav;
let theta;
// let fps = 15;
let fps = 30;
// let textChain = [];
let headTypeChain;
function preload() {
  Engine = Matter.Engine,
    Composite = Matter.Composite,
    World = Matter.World,
    Vertices = Matter.Vertices,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint;

  PARAMS.fontFam = loadFont('assets/proto.otf');
  setUpWord();

}
var video = document.createElement("video");
var body = document.getElementsByTagName("body")[0];
function setup() {
  myWidth = windowWidth;
  myHeight = windowHeight;
  setDimensionParams(myWidth, myHeight)
  video.width = myWidth;
  video.height = myHeight;
  body.appendChild(video);
  createCanvas(myWidth, myHeight);
  // Set text characteristics
  textFont(PARAMS.fontFam);
  textSize(40);
  textAlign(CENTER, CENTER);
  frameRate(fps);

  engine = Engine.create(
    // {enableSleeping: true },
  ) 
  world = engine.world;
  // noGravity();
  const sendLetter = [];
  writeLetter();
  ground = Bodies.rectangle(myWidth / 2, myHeight + PARAMS.physics.bodyDeph / 2, myWidth, PARAMS.physics.bodyDeph, { isStatic: true });
  ground2 = Bodies.rectangle(-PARAMS.physics.bodyDeph / 2, myHeight / 2, PARAMS.physics.bodyDeph, myHeight, { isStatic: true });
  ground3 = Bodies.rectangle(myWidth / 2, -PARAMS.physics.bodyDeph / 2, myWidth, PARAMS.physics.bodyDeph, { isStatic: true });
  ground4 = Bodies.rectangle(myWidth + PARAMS.physics.bodyDeph / 2, myHeight / 2, PARAMS.physics.bodyDeph, myHeight, { isStatic: true });
  Composite.add(world, ground);
  Composite.add(world, ground2);
  Composite.add(world, ground3);
  Composite.add(world, ground4);
  Engine.run(engine);
  grav = HALF_PI;
  theta = QUARTER_PI * 0.125;
  // pixelDensity(0.3);
}
function bodiesUpdate() {
  if (bodies.length > bodiesMaxLength) {
    Composite.remove(world, bodies[0].body);
    bodies.splice(0, 1);
  }
}
function setText(letter, spacing) {
  var newBody;
  if (newBody.body) {
    bodies.push(newBody);
    bodiesUpdate();
  }
  return false;
}

function draw() {
  stiffness: PARAMS.remap,
    background(255);
  // drawKeypoints();
  drawColision();
  textSize(40);
  // image(capture, 0, 0, 320, 240);
  // image(video,0,0,myWidth,myHeight);
  if (PARAMS.posnet.model) {
    standardBloc();
    assignWordToLevel();
  }
  rectMode(CENTER);
}

function standardBloc() {
  for (let i = 0; i < PARAMS.textChain.length; i++) {
    for (var index = 0; index < PARAMS.textChain[i].length; index++) {
      PARAMS.textChain[i][index].show();
      // console.log(PARAMS.textChain[i][index]);
    }
  }
  // console.log(world.bodies.length-4)
  // console.log(world.bodies)
}
function introBloc(variable) {
  textSize(variable);
  headTypeChain.show();
}
function writeChaine() {
  // for (let i = 0; i < PARAMS.word.length; i++) {
  PARAMS.textChain.push([]);

  for (let index = 0; index < PARAMS.word[0].length; index++) {
    // PARAMS.textChain[i].push(new TextChain(width / 2 + 300 * index, height / 2 - index * 300, 50, 50, PARAMS.word[i][index]));
    PARAMS.textChain[0].push(new TextChain(width / 2 + 300 * index, height / 2 - index * 300, 50, 50, PARAMS.word[0][index]));
  }
}
function writeLetter() {
  let backLine = height / 3;
  let line = width - width / 2;
  for (let i = 0; i < PARAMS.wordRetriger.length; i++) {
    PARAMS.textChain.push([]);
    for (let index = 0; index < PARAMS.wordRetriger[i].length; index++) {
      if (index % 20 == 0 && index != 0) {
        backLine += 20;
        line = width - width / 2;
      } else {
        line -= 2;
      }
      PARAMS.textChain[i].push(new TextChain(line, backLine, PARAMS.font.bodyBox, PARAMS.font.bodyBox, PARAMS.wordRetriger[i][index]));
    }
  }
  // console.log(textChain);
}
function mouseClicked() {
  PARAMS.positionWord.init = false;
  sendLastLetterPosition(PARAMS.textChain, changeStateMachine());
}