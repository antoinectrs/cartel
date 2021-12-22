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
let textChain = [];
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
  for (let index = 0; index < PARAMS.word.length; index++) {
    PARAMS.word[index][0] = PARAMS.word[index][0].split('');
  }
}
var video = document.createElement("video");
var body = document.getElementsByTagName("body")[0];
function setup() {
  myWidth = windowWidth;
  myHeight = windowHeight;
  video.width = myWidth;
  video.height = myHeight;
  body.appendChild(video);
  createCanvas(myWidth, myHeight);
  // Set text characteristics
  textFont(PARAMS.fontFam);
  textSize(40);
  textAlign(CENTER, CENTER);

  frameRate(fps);

  engine = Engine.create();
  world = engine.world;
  noGravity();
  // let  constraint = Constraint.create(options);
  const sendLetter = [];
  // writeChaine();
  writeLetter();
  // create ground
  ground = Bodies.rectangle(myWidth / 2, myHeight, myWidth, 10, { isStatic: true });
  ground2 = Bodies.rectangle(0, myHeight / 2, 10, myHeight, { isStatic: true });
  ground3 = Bodies.rectangle(myWidth / 2, 0, myWidth, 10, { isStatic: true });
  ground4 = Bodies.rectangle(myWidth, myHeight / 2, 10, myHeight, { isStatic: true });

  World.add(world, ground);
  World.add(world, ground2);
  World.add(world, ground3);
  World.add(world, ground4);
  Engine.run(engine);
  grav = HALF_PI;
  theta = QUARTER_PI * 0.125;
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
  drawKeypoints();
  // Engine.update(engine);
  textSize(40);
  if( PARAMS.posnet.model){
    standardBloc();
    // introBloc(PARAMS.state.variableFont);
  }
  rectMode(CENTER);
}
function mouseClicked() {
  PARAMS.state.intro= !PARAMS.state.intro
  changeSizeIntro(headTypeChain,PARAMS.state.intro); 
}

function standardBloc(){
    for (let i = 0; i < textChain.length; i++) {
      for (var index = 0; index < textChain[i].length; index++) {
        textChain[i][index].show();
      }
  }
}
function introBloc(variable){
  textSize(variable);
  headTypeChain.show();
}
function writeChaine(){
  for (let i = 0; i < PARAMS.word.length; i++) {
    textChain.push([]);
    for (let index = 0; index < PARAMS.word[i].length; index++) {
      // textChain[i].push(new TextChain(width / 2 + 300 * index, height / 2 - index * 300, 50, 50, PARAMS.word[i][index]));
      textChain[i].push(new TextChain(width / 2 + 300 * index, height / 2 - index * 300, 50, 50, PARAMS.word[i][index]));
      if (textChain[i][index] != textChain[i][0]) {
        var options2 = {
          bodyA: textChain[i][index].body,
          bodyB: textChain[i][index - 1].body,
          stiffness: 0.9,
          friction: 0.2,
          length: 60,
        };
        let constraint = Constraint.create(options2);
        World.add(world, constraint);
      }
    }
    //
    headTypeChain = new TextChain(width/2, height-300, PARAMS.font.bodyBox, PARAMS.font.bodyBox,PARAMS.headType); 
    var options2 = {
      bodyA: headTypeChain.body,
      bodyB: headTypeChain.body,
      stiffness: 0.9,
      friction: 0.2,
      length: 60,
    };
    let constraint = Constraint.create(options2);
    World.add(world, constraint);
  }
}
function writeLetter(){
  let backLine=height/3;
  let line = width-width/2;
  for (let i = 0; i < PARAMS.word.length; i++) {
    textChain.push([]);  
    // for (let index = 0; index < PARAMS.word[i].length; index++) {
      // textChain[i].push(new TextChain(width / 2 + 300 * index, height / 2 - index * 300, 50, 50, PARAMS.word[i][index]));
      if(i%10==0){
        backLine+=50;
        line=  width-width/2;
      }else{
        line -=2;
      }
      textChain[i].push(new TextChain(line, backLine, PARAMS.font.bodyBox,  PARAMS.font.bodyBox, PARAMS.word[i][0]));
      // console.log(width-i*10)
    // }
  }
}