// Benedikt Groß
// Example for matter-attractors an attractors plugin for matter.js
// https://github.com/liabru/matter-attractors

Matter.use('matter-attractors');

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;

const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;

let engine, attractor, wallBottom, wallLeft, wallTop, wallRight, boxes, menuCircle,amount,step;
let activePosition = [];
const skeleton = new Skeleton()
const smoother = new MediaPipeSmoothPose({
  lerpAmount: 0.33, // range [0-1], 0 is slowest
  dampAmount: 0.1, // range ~1-10 [0 is fastest]
});
const mediaPipe = new MediaPipeClient()
window.mediaPipe = mediaPipe;
let video;

function setup() {
  pixelDensity(1);
  angleMode(RADIANS);
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  //------  VIDEO  ------
  video = createVideo()
  mediaPipe.addEventListener('setup', () => {
    const videoElem = mediaPipe.video
    video = new p5.MediaElement(videoElem);
    resizeCanvas(window.innerWidth, window.innerHeight);
  })
  mediaPipe.addEventListener('pose', (event) => {
    smoother.target(event.data.skeleton)
  })
  //------  VIDEO  ------
  // create an engine
  engine = Engine.create();
  // no gravity
  engine.world.gravity.scale = 0;
  attractor = Bodies.circle(400, 400, 150, {
    isStatic: true,
    plugin: {
      attractors: [
        function (bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        }
      ]
    }
  });
  World.add(engine.world, attractor);
  wallBottom = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50 / 2, window.innerWidth, 50, { isStatic: true });
  wallRight = Bodies.rectangle(-50 / 2, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true });
  wallTop = Bodies.rectangle(window.innerWidth / 2, -50 / 2, window.innerWidth, 50, { isStatic: true });
  wallLeft = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50 / 2, window.innerHeight, { isStatic: true });
  World.add(engine.world, wallLeft);
  World.add(engine.world, wallBottom);
  World.add(engine.world, wallTop);
  World.add(engine.world, wallRight);
  // add boxes
  // xx, yy, columns, rows, columnGap, rowGap
  boxes = Composites.stack(width / 2, 0, 3, 40, 3, 3, function (x, y) {
    return Bodies.circle(x, y, 10, {
      mass: 2,
    });
  });
  // VECTOR SET UP
  step = -0.01;
  amount=1;

  World.add(engine.world, boxes);
  // run the engine
  waitToRun();
  // CIRCLE MENU
  menuCircle = new MenuCircle;
  //ACTIVE POSITION ---------   LISSAGE DES VALEURS DE POSITION.JS
  const simplify = 5;
  for (let index = 0; index < position[0].length; index++) {
    activePosition.push(new ActivePosition(Math.ceil(position[0][index].x / simplify) * simplify, Math.ceil(position[0][index].y / simplify) * simplify));
  }
}

function draw() {
  background(255);
  push();
  // image(video, 0, 0)
  //------ BODY DETECTION -------
  const pose = smoother.smoothDamp() // or smoother.lerp()
  skeleton.update(pose);
  if (pose !== undefined) {
    skeleton.show(drawingContext, { color: 'red' });
    Body.translate(attractor, {
      x: (pose.RIGHT_INDEX.x * width - attractor.position.x) * 0.25,
      y: (pose.RIGHT_INDEX.y * height - attractor.position.y) * 0.25,
    });
    //------ CIRCLE MENU -------
    menuCircle.positionMove(pose.RIGHT_INDEX.x * width, pose.RIGHT_INDEX.y * height);
    menuCircle.show();
    //------ CHECK DISTANCE TO POINT -------
    for (let index = 0; index < position[0].length; index++) {
      if (activePosition[index].touch == false) {
        activePosition[index].checkDistance(activePosition[index].position.x, activePosition[index].position.y, pose.RIGHT_INDEX.x * width, pose.RIGHT_INDEX.y * height, 100);
      }
      activePosition[index].showActualPoint();
    }
  } else {
    Body.translate(attractor, {
      x: (width / 2 - attractor.position.x) * 0.25,
      y: (height / 2 - attractor.position.y) * 0.25
    });
  }
  pop();
  //------ END BODY DETECTION -------
  stroke(0);
  strokeWeight(1);
  // fill(0);
  //------ PHYSIC LETTERS -------
  for (let index = 0; index < boxes.bodies.length; index++) {
    textSize(20);
    push();
    translate(boxes.bodies[index].position.x, boxes.bodies[index].position.y);
    // console.log(boxes.bodies[index].angle);
    rotate(boxes.bodies[index].angle)
    scale(-1, 1)
    text('a', -6, 0);
    pop();
  }
  // drawBodies(boxes.bodies);
  // drawBody(attractor);
  // drawBody(wallLeft);
  // drawBody(wallRight);
  // drawBody(wallTop);
  // drawBody(wallBottom);
  //------ END PHYSIC LETTERS -------


  // noLoop()
  if (mouseIsPressed) {
    // boxes.bodies[0].vertices[1].x += 10.2;
    // boxes.bodies[0].vertices[1].y -= 10.2;
    // Body.setVertices(boxes.bodies[0], boxes.bodies[0].vertices);
    // Body.translate( boxes.bodies[0], { x: 20, y: 20 });

    // boxes.bodies[0].isSleeping = true;
    // console.log(boxes.bodies.length);
    // console.log("boxes: " + boxes.bodies.length + " points " + activePosition.length);
    // for (let index = 0; index < boxes.bodies.length; index++) {
    //   boxes.bodies[index].isSleeping = true;
    // Body.translate( boxes.bodies[index], { x: 20, y: 20 });
    // }

    // console.log( boxes.bodies[0].position);
    if (amount > 0 ) {amount+=step;}
    const v3 = activePosition[0].calculVector(width-boxes.bodies[0].position.x,boxes.bodies[0].position.y,amount);
    // ellipse( width-v3.x, v3.y, 10)
    // const v3 = activePosition[0].calculVector(width-mouseX,mouseY,amount);
    // Body.translate( boxes.bodies[0], { x: width-v3.x, y: v3.y });
    Body.setPosition( boxes.bodies[0], { x: width-v3.x, y: v3.y });
    // console.log(amount.toFixed(1),"  ", v3.x.toFixed(0),);
    // console.log(boxes.bodies[0].mass)
  }else {
    // boxes.bodies[0].vertices[1].x =0;
    // boxes.bodies[0].vertices[1].y =0;
    // Body.setVertices(boxes.bodies[0], boxes.bodies[0].vertices);
    // console.log(  boxes.bodies[0].vertices[1].x);
  }
}

function mouseClicked() {
  amount=1;
  // console.log("object");
}