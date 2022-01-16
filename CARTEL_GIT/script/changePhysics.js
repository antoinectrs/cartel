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
    // console.log("isChanging!");
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1;
  }
}

function assignWordToLevel() {
  if (PARAMS.state.stateMachine == 1) {
    customEase(1);
  } else if (PARAMS.state.stateMachine > 1) {
    resetAnimation(PARAMS.state.stateMachine);
    customEase(PARAMS.state.stateMachine);
  }
  // switch (PARAMS.state.stateMachine) {
  //   case 1:
  //     // resetAnimation();
  //     customEase(1);
  //     break;
  //   case 2:
  //     resetAnimation();
  //     customEase(2);
  //     break;
  //   case 3:
  //     resetAnimation();
  //     customEase(3);
  //     break;
  //   case 4:
  //     resetAnimation();
  //     customEase(4);
  //     // console.log(PARAMS.state.stateMachine);
  //     break;
  //   // default:
  // }
}
function resetAnimation(WordMove) {
  if (PARAMS.positionWord.init == false) {
    PARAMS.positionWord.ease = 0;
    // removeChain(WordMove); ----need to fixed
    PARAMS.positionWord.init = true;
  }
}
function customEase(WordMove) {
  WordMove = WordMove - 1;
  // if (PARAMS.state.stateMachine == 1) {
  if (PARAMS.positionWord.ease == 0) {
    arcChain(WordMove);
    for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
      PARAMS.textChain[0][index + originStartWord(WordMove)].isFixed=true
    }
  }
  if (PARAMS.positionWord.ease <= 1) {
    drawKeypoints()
    PARAMS.positionWord.ease += 0.01;
    chainLenght();
    // for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    //   newSetRotation(index + originStartWord(WordMove), PARAMS.pointArc[index + originStartWord(WordMove)].angle);
    // }
  } else {
    // console.log(PARAMS.separateWords[WordMove]);
    // for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    //   newSetRotation(index + originStartWord(WordMove), PARAMS.pointArc[index + originStartWord(WordMove)].angle);
    // }
  }
}
function setUpChain(WordMove) {
  PARAMS.positionWord.DynamicLenght = [];
  for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    // for (let index = originStartWord(WordMove); index <PARAMS.separateWords[WordMove].length; index++) {
    const decay = (width / 2) - index * 100;
    PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.p0.LastPosition[index].position.x, PARAMS.positionWord.p0.LastPosition[index].position.y, decay, height / 2))

    var options2 = {
      bodyA: PARAMS.textChain[0][index + originStartWord(WordMove)].body,
      pointB: { x: decay, y: height / 2 },
      // stiffness: 0.9,
      // friction: 0.9,
      length: PARAMS.positionWord.distCalcul[index],
    };
    PARAMS.positionWord.DynamicLenght.push(Constraint.create(options2));
    console.log(PARAMS.textChain[0][index]);
    Composite.add(world, PARAMS.positionWord.DynamicLenght[index]);
  }
}
function arcChain(WordMove) {
  PARAMS.positionWord.DynamicLenght = [];
  for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    // for (let index = originStartWord(WordMove); index <PARAMS.separateWords[WordMove].length; index++) {
    const decay = (width / 2) - index * 100;
    PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.p0.LastPosition[index].position.x, PARAMS.positionWord.p0.LastPosition[index].position.y, PARAMS.pointArc[index + originStartWord(WordMove)].x, PARAMS.pointArc[index + originStartWord(WordMove)].y))

    var options2 = {
      bodyA: PARAMS.textChain[0][index + originStartWord(WordMove)].body,
      pointB: { x: PARAMS.pointArc[index + originStartWord(WordMove)].x, y: PARAMS.pointArc[index + originStartWord(WordMove)].y },
      // stiffness: 0.9,
      // friction: 0.9,
      length: PARAMS.positionWord.distCalcul[index + originStartWord(WordMove)],
    };
    PARAMS.positionWord.DynamicLenght.push(Constraint.create(options2));
    // console.log(PARAMS.textChain[0][index]);
    Composite.add(world, PARAMS.positionWord.DynamicLenght[index]);
  }
}
function removeChain(WordMove) {
  // console.log(PARAMS.positionWord.DynamicLenght[index],index);
  for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {

    Composite.remove(world, PARAMS.positionWord.DynamicLenght[index], true)
  }
}
function chainLenght() {
  for (let index = 0; index < PARAMS.positionWord.DynamicLenght.length; index++) {
    const lerpLength = lerp(PARAMS.positionWord.distCalcul[index], 0, PARAMS.positionWord.ease);
    PARAMS.positionWord.DynamicLenght[index].length = lerpLength;
  }
}
function changeSizeIntro(headTypeChain, state, keyPoint) {
  if (PARAMS.state.intro) {
    headTypeChain.w = 100;
    headTypeChain.h = 100;
    headTypeChain.ratio = 2;
    PARAMS.state.variableFont = 100
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
function setRotation(index) {

  Matter.Body.setAngle(world.bodies[index], 0)
}
function newSetRotation(index, angle) {
  Matter.Body.setAngle(world.bodies[index], angle)
}