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

let engine;
let attractor;
let boxes;
const skeleton = new Skeleton()
const smoother = new MediaPipeSmoothPose({
  lerpAmount: 0.33, // range [0-1], 0 is slowest
  dampAmount: 0.1, // range ~1-10 [0 is fastest]
});
const mediaPipe = new MediaPipeClient()
window.mediaPipe = mediaPipe;
let video;

function setup() {
  const canvas = createCanvas(800, 600);

  //------  VIDEO  ------
  video = createVideo()
  mediaPipe.addEventListener('setup', () => {
    const videoElem = mediaPipe.video
    video = new p5.MediaElement(videoElem)
    resizeCanvas(videoElem.width, videoElem.height)
  })
  mediaPipe.addEventListener('pose', (event) => {
    smoother.target(event.data.skeleton)

  })
  //------  VIDEO  ------

  // create an engine
  engine = Engine.create();

  // no gravity
  engine.world.gravity.scale = 0;

  attractor = Bodies.circle(400, 400, 100, {
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

  // add boxes
  // xx, yy, columns, rows, columnGap, rowGap
  boxes = Composites.stack(width / 2, 0, 3, 20, 3, 3, function (x, y) {
    return Bodies.circle(x, y, 10);
  });
  World.add(engine.world, boxes);
  // run the engine
  Engine.run(engine);
}

function draw() {
  // background(255, 20);
  push();
  background(255,2);
  // image(video, 0, 0)
  // image(video, 0, 0);
 
  const pose = smoother.smoothDamp() // or smoother.lerp()
  skeleton.update(pose)
  // skeleton.show(drawingContext, { color: 'red' })
  pop();
  if (mouseIsPressed) {
    // smoothly move the attractor body towards the mouse
    Body.translate(attractor, {
      x: (mouseX - attractor.position.x) * 0.25,
      y: (mouseY - attractor.position.y) * 0.25
    });
  }

  noStroke();
  strokeWeight(1);
  fill(0);
  drawBodies(boxes.bodies);



  // drawBody(attractor);
}
function mouseClicked(){
  
}