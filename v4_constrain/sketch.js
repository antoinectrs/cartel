let Engine, Composite, World, Vertices, Body, Bodies, Constraint;
Constraint = Matter.Constraint;
let font;
function preload() {
  Engine = Matter.Engine,
    Composite = Matter.Composite,
    World = Matter.World,
    Vertices = Matter.Vertices,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
  font = loadFont('assets/goudy.otf');
}
let PARAMS = {
  font: {
    spacing: 50,
  }
}
let bounds;
let engine;
let world;
let ground, ground2;
// var lut = "abcdefghijklmnopqrstuvwxyz";
var lut = "no";
// var lut = "Carte blanche à celles et ceux qui prennent soin de nous. Avec la complicité de l’artiste Frantiček Klossner, des étudiantes et des étudiants en Soins infirmiers donnent libre cours à leur créativité pour exprimer leurs expériences, émotions, espoirs et préoccupations. Leurs installations artistiques invitent à nous interroger sur les enjeux liés à la santé et aux soins aujourd’hui. Avec beaucoup d’authenticité, ces témoignages esthétiques rendent visible un engagement infirmier essentiel dans le contexte actuel.";
const textSplit = lut.split("");

var letterTemplates = {};
var bodies = [];
var bodiesMaxLength = 100;
var myWidth;
var myHeight;

var grav;
var theta;
// var fps = 15;
var fps = 30;

function setup() {
  myWidth = windowWidth;
  myHeight = windowHeight;
  createCanvas(myWidth, myHeight);

  // Set text characteristics
  textFont(font);
  textSize(35);
  textAlign(CENTER, CENTER);

  frameRate(fps);
  // ccapture_ctx = new Ccapture_context(fps);
  done = false;

  // let options = {
  //   bodyA : newBody[0].body,
  //   bodyB : newBody[1].body,
  //   length:50,
  //   stiffness:0.4
  // }

  engine = Engine.create();
  world = engine.world;
  // let  constraint = Constraint.create(options);
  const sendLetter = [];
  // create letter templates
  for (var i = 0; i < textSplit.length; i++) {
    if (textSplit[i] != " ") {
      
      sendLetter.push(textSplit[i].toLowerCase());
      // console.log(textSplit[i]);
    }
  }
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

  for (let i = 0; i < sendLetter.length; i++) {
    const spacing = PARAMS.font.spacing * i;
    setText(sendLetter[i], spacing);
  }
}

function bodiesUpdate() {
  if (bodies.length > bodiesMaxLength) {
    Composite.remove(world, bodies[0].body);
    bodies.splice(0, 1);
  }
}

var prevMouseX;
var prevMouseY;
/*
function mouseClicked() {
}
*/
function mousePressed(event) {
  prevMouseX = event.x;
  prevMouseY = event.y;
}

function mouseDragged() {
  //return mouseClicked();
  return false;
}

function setText(letter, spacing) {
  var newBody;
  // if (keyCode in letterToKeyMap) {
  // console.log(letterToKeyMap[keyCode]);
  newBody = new Letter(world, spacing + 100, 100, letter);
  if (newBody.body) {
    bodies.push(newBody);
    bodiesUpdate();
  }
  // }
  return false;
}

function draw() {
  background(255);

  for (var i = 0; i < bodies.length; i++) {
    bodies[i].show();
  }

  //ROTATE GRAVITY
  if (frameCount % 10 == 0) {
    grav += theta;
    if (grav > TWO_PI) {
      grav -= TWO_PI;
    }
    engine.world.gravity.x = cos(grav);
    engine.world.gravity.y = sin(grav);
  }

  noStroke(255);
  fill(170);
  rectMode(CENTER);

}