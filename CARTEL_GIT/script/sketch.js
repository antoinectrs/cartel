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
  lexical();
  myWidth = windowWidth;
  myHeight = windowHeight;
  setDimensionParams(myWidth, myHeight)
  video.width = myWidth;
  video.height = myHeight;
  body.appendChild(video);
  createCanvas(myWidth, myHeight);
  // Set text characteristics
  textFont(PARAMS.fontFam);
  textSize(20);
  textAlign(CENTER, CENTER);
  frameRate(fps);

  engine = Engine.create(
    { enableSleeping: true },
  )
  world = engine.world;
  // noGravity();
  const amp = 300;
  const margin = 50;
  addTextChain('TEST', [myWidth-margin,myHeight-100, myWidth-margin, -myHeight/4,margin,-myHeight/4,margin,  myHeight-100])
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
  background(255);
  // drawColision();
  if (PARAMS.posnet.model) {
    drawKeypoints();
    standardBloc();
    assignWordToLevel();
  }
  rectMode(CENTER);
}

function standardBloc() {
    for (var index = 0; index < PARAMS.textChain[0].length; index++) {
      PARAMS.textChain[0][index].show();
      if(PARAMS.textChain[0][index].isFixed==true)newSetRotation(index, PARAMS.pointArc[index].angle);
    }
}
function introBloc(variable) {
  textSize(variable);
  headTypeChain.show();
}
// PARAMS.wordRetriger[i]
function addTextChain(word, bezier) {
  let backLine = height / 3;
  let line = width - width / 2;
  // for (let i = 0; i < PARAMS.wordRetriger.length; i++) {
  for (let i = 0; i < 1; i++) {
    PARAMS.textChain.push([]);
    const results = getTextOnSpline(PARAMS.word[0], bezier, { debug: PARAMS.debugMode, maxChar: 180 })
    let index=0;
    results.forEach(({ x, y, angle, char ,tab}) => {
      if(tab!=true){
        PARAMS.textChain[i].push(new TextChain(x, y, PARAMS.font.bodyBox, PARAMS.font.bodyBox, char));
        PARAMS.pointArc.push({x, y, angle});
        newSetRotation(index,angle);
        index++
      }
    })
  }
}
function mouseClicked() {
  PARAMS.positionWord.init = false;
  sendLastLetterPosition(PARAMS.textChain, changeStateMachine());
}