function noGravity() {
  // if (frameCount % 50 == 0) {
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;
  // }
}
function changeGravity(keyPoint) {
  if (frameCount % 10 == 0) {
    const xMap = map(keyPoint.x, 0, myWidth, -PARAMS.physics.gravityForce, PARAMS.physics.gravityForce);
    const yMap = map(keyPoint.y, 0, myHeight, -PARAMS.physics.gravityForce, PARAMS.physics.gravityForce);
    engine.world.gravity.x = xMap;
    engine.world.gravity.y = yMap;
  }
}
function fallNobody() {
  if (frameCount % 50 == 0) {
    PARAMS.state.oneUser = false;
    console.log("isChanging!");
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1;
  }
}

function assignWordToLevel(){
  switch (PARAMS.state.stateMachine){
    case 1:customEase(1);
    case 2://customEase(1);
    default: 
  }
}
function customEase(WordMove) {
  if (PARAMS.state.stateMachine == 1) {
    if (PARAMS.positionWord.ease == 0) {
      setUpChain(WordMove);     
    }
    if (PARAMS.positionWord.ease <= 1) {
      PARAMS.positionWord.ease += 0.01;
      chainLenght();
    }else{
      setRotation (0);
      setRotation (1);
    }
  } else {
    PARAMS.positionWord.ease = 0;
  }
}
function setUpChain(WordMove) {
  console.log(PARAMS.separateWords[WordMove]);
  for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    const decay = (width / 2) - index * 100;
    PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.p0.LastPosition[index].position.x, PARAMS.positionWord.p0.LastPosition[index].position.y, decay, height / 2))
    var options2 = {
      bodyA: textChain[WordMove][index].body,
      pointB: { x: decay, y: height / 2 },
      // stiffness: 0.9,
      // friction: 0.9,
      length: PARAMS.positionWord.distCalcul[index],
    };
    PARAMS.positionWord.DynamicLenght.push(Constraint.create(options2));
    World.add(world, PARAMS.positionWord.DynamicLenght[index]);
  }
}
function chainLenght() {
  for (let index = 0; index < PARAMS.positionWord.DynamicLenght.length; index++) {
    const lerpLength = lerp(PARAMS.positionWord.distCalcul[index], 0, PARAMS.positionWord.ease);
    PARAMS.positionWord.DynamicLenght[index].length = lerpLength;
  }
}
function changeSizeIntro(headTypeChain, state, keyPoint) {
  // Matter.Body.scale(headTypeChain.body, 5, 5);
  if (PARAMS.state.intro) {
    headTypeChain.w = 100;
    headTypeChain.h = 100;
    headTypeChain.ratio = 2;

    PARAMS.state.variableFont = 100
    // console.log( headTypeChain.pos.x);
    // Matter.Body.scale(headTypeChain.body, 5, 5);
    // headTypeChain.pos.x=myWidth/2;
    // headTypeChain.pos.y=myHeight/2;
    // console.log(headTypeChain.pos);
    // headTypeChain.pos.x= keyPoint.x;
    // headTypeChain.pos.y=  engine.world.gravity.y
  } else {
    PARAMS.state.variableFont = 40;
    headTypeChain.w = 50;
    headTypeChain.h = 50;
    headTypeChain.ratio = 1;
  }

}
function drawColision() {
  const deph = 50;
  rect(myWidth / 2, myHeight + deph / 2, myWidth, deph);
  rect(myWidth / 2, -deph / 2, myWidth, deph)
  rect(-deph / 2, myHeight / 2, deph, myHeight)
  rect(myWidth + deph / 2, myHeight / 2, deph, myHeight)
}
function setRotation (index){
  Matter.Body.setAngle(world.bodies[index], 0)
}