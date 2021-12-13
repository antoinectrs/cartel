let Engine, Composite, World, Vertices, Body, Bodies, Constraint;

var textChain = [];
let PARAMS = {
  fontFam: null,
  font: {
    spacing: 50,
  },
  word: [
    // "yes",
    // "no",
    "0123"
  ]
}
function preload() {
  Engine = Matter.Engine,
    Composite = Matter.Composite,
    World = Matter.World,
    Vertices = Matter.Vertices,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint;

  PARAMS.fontFam = loadFont('assets/goudy.otf');
  for (let index = 0; index < PARAMS.word.length; index++) {
    PARAMS.word[index][0] = PARAMS.word[index][0].split('');
  }
}

let bounds;
let engine;
let world;
let ground, ground2;


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
  textFont(PARAMS.fontFam);
  textSize(40);
  textAlign(CENTER, CENTER);

  frameRate(fps);
  done = false;

  engine = Engine.create();
  world = engine.world;
  // let  constraint = Constraint.create(options);
  const sendLetter = [];

  let prev = null;

  for (let i = 0; i < PARAMS.word.length; i++) {
    textChain.push([]);
    for (let index = 0; index < PARAMS.word[i].length; index++) {
      textChain[i].push(new TextChain(width / 2 + 10 * index, height / 2 - index * 10, 50, 50, PARAMS.word[i][index]));
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
}

function bodiesUpdate() {
  if (bodies.length > bodiesMaxLength) {
    Composite.remove(world, bodies[0].body);
    bodies.splice(0, 1);
  }
}
function setText(letter, spacing) {
  var newBody;
  newBody = new Letter(world, spacing + 100, 100, letter);
  if (newBody.body) {
    bodies.push(newBody);
    bodiesUpdate();
  }
  return false;
}

function draw() {
  stiffness: PARAMS.remap,
    background(255);

  // Engine.update(engine);
  for (let i = 0; i < textChain.length; i++) {
    for (var index = 0; index < textChain[i].length; index++) {
      textChain[i][index].show();
    }
  }
  // let radsToDegs =  round(textChain[0][0].body.angle * 180 / Math.PI);
  // if(radsToDegs%360==0){
  // console.log("turn");
  // }
  // console.log( radsToDegs);
  // const mouseMap = round(map(mouseX, 0, window.height, 0, 10));
  // console.log(mouseMap)
  //ROTATE GRAVITY
  if (frameCount % 10 == 0) {
    grav += theta;
    if (grav > TWO_PI) {
      grav -= TWO_PI;
    }
    engine.world.gravity.x = cos(grav);
    engine.world.gravity.y = sin(grav);
  }


  rectMode(CENTER);
}
function mouseClicked() {
  Matter.Body.rotate(textChain[0][0].body, 10)



}
function mouseMoved() {
  let mouseMap = round(map(mouseX, 0, window.height, 50, 200));

  var options2 = {
    bodyA: textChain[0][0].body,
    bodyB: textChain[0][1].body,
    stiffness: 0.9,
    friction: 0.2,
    length: mouseMap,
  };
  let constraint = Constraint.create(options2);
  World.add(world, constraint);

  // for (let i = 0; i < textChain.length; i++) {
  //   for (var index = 0; index < textChain[i].length; index++) {
  //     console.log(textChain[i][index].body);
  //     var options2 = {

  //       bodyA: textChain[i][index].body,
  //       bodyB: textChain[i][index].body,
  //       stiffness: 0.9,
  //       friction:0.2,
  //       length: mouseMap,
  //     }; 
  //     let constraint = Constraint.create(options2);
  //     World.add(world, constraint);
  //   }
  // }


}