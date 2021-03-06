function noGravity() {
  // if (frameCount % 50 == 0) {
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;
  // }
}
function changeGravity(keyPoint) {
  if (frameCount % 10 == 0) {
    const xMap = map(keyPoint.x, 0, myWidth, -PARAMS.physics.gravityForce, PARAMS.physics.gravityForce);
    const yMap = map(keyPoint.y, myHeight/2, myHeight, -PARAMS.physics.gravityForce, PARAMS.physics.gravityForce);
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

function assignWordToLevel(state) {
  if (state == 1) {
    resetAnimation(1);
    customEase(1);
  } else if (state > 1) {
    resetAnimation(state);
    customEase(state);
  }
}
function resetAnimation(WordMove) {
  if (PARAMS.positionWord.init == false) {
    PARAMS.positionWord.ease = 0;
    // removeChain(WordMove); ----need to fixed
    PARAMS.positionWord.init = true;
    PARAMS.positionWord.finish= false;
  }
}
function customEase(WordMove) {
  WordMove = WordMove - 1;
  // if (PARAMS.state.stateMachine == 1) {
  if (PARAMS.positionWord.ease == 0) {
    arcChain(WordMove);
    for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
      PARAMS.textChain[0][index + originStartWord(WordMove)].isFixed=true;
    }
    // console.log(PARAMS.textChain[0]);
  }
  if (PARAMS.positionWord.ease < 1) {
    // drawKeypoints()
    PARAMS.positionWord.ease += 0.015;
    chainLenght();
  } else if(PARAMS.positionWord.finish==false) {
    // console.log("finish ");
    PARAMS.positionWord.finish=true;
    if(PARAMS.state.stateMachine==PARAMS.separateWords.length-1){
      console.log("finish");
      PARAMS.positionWord.readyToRotate=true;
    }
    // for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    //   newSetRotation(index + originStartWord(WordMove), PARAMS.pointArc[index + originStartWord(WordMove)].angle);
    // }
  }
}
function setUpChain(WordMove) {
  PARAMS.positionWord.DynamicLenght = [];
  for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    // console.log(index);
    // for (let index = originStartWord(WordMove); index <PARAMS.separateWords[WordMove].length; index++) {
    const decay = (width / 2) - index * 100;
    PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.LastPosition[index].position.x, PARAMS.positionWord.LastPosition[index].position.y, decay, height / 2))

    var options2 = {
      bodyA: PARAMS.textChain[0][index + originStartWord(WordMove)].body,
      pointB: { x: decay, y: height / 2 },

      length: PARAMS.positionWord.distCalcul[index],
    };
    PARAMS.positionWord.DynamicLenght.push(Constraint.create(options2));
    // console.log(PARAMS.textChain[0][index]);
    Composite.add(world, PARAMS.positionWord.DynamicLenght[index]);
  }
}
function arcChain(WordMove) {
  PARAMS.positionWord.DynamicLenght = [];
  for (let index = 0; index < PARAMS.separateWords[WordMove].length; index++) {
    const decayIndex = index+ originStartWord(WordMove)
    // for (let index = originStartWord(WordMove); index <PARAMS.separateWords[WordMove].length; index++) {
    // console.log(PARAMS.positionWord.LastPosition);
    PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.LastPosition[index].position.x, PARAMS.positionWord.LastPosition[index].position.y, PARAMS.pointArc[decayIndex].x, PARAMS.pointArc[decayIndex].y))
    // PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.LastPosition[index].position.x, 0, PARAMS.pointArc[decayIndex].x,0))
    var options2 = {
      bodyA: PARAMS.textChain[0][decayIndex].body,
      pointB: { x: PARAMS.pointArc[decayIndex].x, y: PARAMS.pointArc[decayIndex].y },
      length: PARAMS.positionWord.distCalcul[decayIndex],
    };
    PARAMS.positionWord.DynamicLenght.push(Constraint.create(options2));
    Composite.add(world, PARAMS.positionWord.DynamicLenght[index]);
    // Composite.remove(world, PARAMS.positionWord.DynamicLenght[index], true);
  }
}
function removeChain() {
  for (let index = 0; index < Composite.allConstraints(world).length; index++) {
    Composite.remove(world,Composite.allConstraints(world)[index]);
  }
  // console.log(PARAMS.separateWords);
  // console.log(PARAMS.positionWord.DynamicLenght[index],index);
  // for (let index = 0; index < PARAMS.positionWord.DynamicLenght.length; index++) {
  //   // console.log(PARAMS.positionWord.DynamicLenght[index]);
  //   Composite.remove(world, PARAMS.positionWord.DynamicLenght[index], true);
  //   // console.log(PARAMS.positionWord.DynamicLenght);
  // }
}
function removeAllBodies() {
  const before =  Composite.allBodies(world).length;
  for (let index = 0; index < Composite.allBodies(world).length; index++) {
    // Composite.remove(world,Composite.allConstraints(world)[index]);
    // console.log(Composite.type(world)[index]);
    // if(Composite.allBodies(world)[index].isStatic==false){
      // Composite.allBodies(world)[index]
      // console.log(indexs);
      Composite.remove(world,Composite.allBodies(world)[index]);
    // }
    // else{
    //       console.log(Composite.allBodies(world)[index]);
    // }
    // console.log("test",  Composite.allBodies(world).length);
  }
  console.log(before,  Composite.allBodies(world));
  const margin = 50;
  ground = Bodies.rectangle(myWidth / 2, myHeight + PARAMS.physics.bodyDeph / 2, myWidth, PARAMS.physics.bodyDeph, { isStatic: true });
  ground2 = Bodies.rectangle(-PARAMS.physics.bodyDeph / 2, myHeight / 2, PARAMS.physics.bodyDeph, myHeight, { isStatic: true });
  ground3 = Bodies.rectangle(myWidth / 2, -PARAMS.physics.bodyDeph / 2, myWidth, PARAMS.physics.bodyDeph, { isStatic: true });
  ground4 = Bodies.rectangle(myWidth + PARAMS.physics.bodyDeph / 2, myHeight / 2, PARAMS.physics.bodyDeph, myHeight, { isStatic: true });
  Composite.add(world, ground);
  Composite.add(world, ground2);
  Composite.add(world, ground3);
  Composite.add(world, ground4);  

}
function chainLenght() {
  for (let index = 0; index < PARAMS.positionWord.DynamicLenght.length; index++) {
    if( PARAMS.positionWord.ease<1 && PARAMS.positionWord.DynamicLenght[index].length!=0){
      const lerpLength = lerp(PARAMS.positionWord.distCalcul[index], 0, PARAMS.positionWord.ease);
      PARAMS.positionWord.DynamicLenght[index].length = lerpLength;
    }else{
      PARAMS.positionWord.DynamicLenght[index].length =0;
      console.log("in");
    }
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