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
let video,engine, attractor, wallBottom, wallLeft, wallTop, wallRight, boxes, menuCircle, amount, step, self,level;
let activePosition = [];
const skeleton = new Skeleton()
const smoother = new MediaPipeSmoothPose({
  lerpAmount: 0.33, // range [0-1], 0 is slowest
  dampAmount: 0.1, // range ~1-10 [0 is fastest]
});
const mediaPipe = new MediaPipeClient()
window.mediaPipe = mediaPipe;

function preload() {
  self = loadFont('../libraries/self.otf');
}
function setup() {
  pixelDensity(1);
  textFont(self);
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
      mass: 1,
    });
  });
  World.add(engine.world, boxes);
  // async wait seb to run the physic engine
  waitToRun();
  // CIRCLE MENU
  menuCircle = new MenuCircle;
  //ACTIVE POSITION ---------   LISSAGE DES VALEURS DE POSITION.JS
  for (let index = 0; index < position[0].length; index++) {
    activePosition.push(new ActivePosition());
    activePosition[index].setUpPosition(index,0);
    activePosition[index].setUpLetter(letterSplit[index]);
      // new ActivePosition(Math.ceil(position[0][index].x / simplify) * simplify, Math.ceil(position[0][index].y / simplify) * simplify, letterSplit[index]));
  }
}
function draw() {
  background(255, 180);
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
      } else {
        const v3 = activePosition[index].calculVector(boxes.bodies[index].position.x, boxes.bodies[index].position.y, activePosition[index].activeCount());
        Body.setPosition(boxes.bodies[index], { x: v3.x, y: v3.y });
        Body.setAngle(boxes.bodies[index], 0);
        // console.log(boxes.bodies[0].mass)
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
  //------ PHYSIC LETTERS -------
  stroke(0);
  strokeWeight(1);
  // fill(0);
  // for (let index = 0; index < boxes.bodies.length; index++) {
  for (let index = 0; index < activePosition.length; index++) {
    textSize(20);
    push();
    translate(boxes.bodies[index].position.x, boxes.bodies[index].position.y);
    // console.log(boxes.bodies[index].angle);
    rotate(boxes.bodies[index].angle)
    scale(-1, 1)
    // text('a', -6, 0);
    text(activePosition[index].letter, -6, 0);
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
    // if (amount >= 0) { amount += step; }
    // for (let index = 0; index < position[0].length; index++) {
    //   if (activePosition[index].touch == true) {
    //        // activePosition[index].showActualPoint();
    //        const v3 = activePosition[index].calculVector( boxes.bodies[index].position.x, boxes.bodies[index].position.y, amount);
    //        Body.setPosition(boxes.bodies[index], { x:  v3.x, y: v3.y });
    //        Body.setAngle(boxes.bodies[index], 0);
    //        // console.log(boxes.bodies[0].mass)
    //   }
    // }
  }
}

function mouseClicked() {
  amount = 1;
  // console.log("object");
}