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
function stickText() {
  if (PARAMS.state.stateMachine == 1) {
    // if( PARAMS.positionWord.ease<0.4){PARAMS.positionWord.ease += 0.0001;}
    // else

    if (PARAMS.positionWord.ease == 0) {
      setUpChain();
    }
    if (PARAMS.positionWord.ease <= 1) {
      PARAMS.positionWord.ease += 0.01;
      // setUpChain();
      chainLenght();
      // console.log(debug)
    }
  } else {
    PARAMS.positionWord.ease = 0;
  }
}
function setUpChain() {
  for (let index = 0; index < 1; index++) {
    const decay = (width / 2) + index * 100;
    // console.log(PARAMS.positionWord.p0.LastPosition[0].position.x)
    // let distCalcul = ;
    PARAMS.positionWord.distCalcul.push(dist(PARAMS.positionWord.p0.LastPosition[0].position.x, PARAMS.positionWord.p0.LastPosition[0].position.y, decay, height / 2))
    // const lerpLength = lerp(PARAMS.positionWord.distCalcul[index], 0, PARAMS.positionWord.ease);
    // console.log("distCalcul", distCalcul,"lerpLength ",lerpLength)

    var options2 = {
      bodyA: textChain[index][0].body,
      // pointB: { x: decay, y: height / 2 },
      pointB: { x: decay, y: height / 2 },
      // stiffness: 0.9,
      // friction: 0.9,
      length:PARAMS.positionWord.distCalcul[index],
    };
   
    // PARAMS.positionWord.DynamicLenght.push(Constraint.create(options2));
    PARAMS.positionWord.constraint = Constraint.create(options2);
  

    // textChain[index][0].textWorld = World.add(world, constraint);
    // console.log( PARAMS.positionWord.DynamicLenght[index]);
    // textWorld
    // textChain[index][0].textWorld
    // console.log(textChain[index][0].textWorld.constraints.length);
    // PARAMS.positionWord.DynamicLenght[index]=0;
    // World.add(world, PARAMS.positionWord.DynamicLenght[index])
    World.add(world,PARAMS.positionWord.constraint);
    // constraint.length=10 
    // console.log(constraint.l ength)
    // console.log(textChain[0][0].textWorld.constraints.length);
  }
}
function chainLenght() {
 
  // console.log(PARAMS.positionWord.constraint);
 const lerpLength = lerp(PARAMS.positionWord.distCalcul[0], 0, PARAMS.positionWord.ease);
 PARAMS.positionWord.constraint.length=lerpLength;
//  PARAMS.positionWord.DynamicLenght[0]=lerpLength;
//  PARAMS.positionWord.DynamicLenght[0]=0;
//  console.log(PARAMS.positionWord.DynamicLenght[0]);

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