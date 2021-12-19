function noGravity() {
  // if (frameCount % 50 == 0) {
    engine.world.gravity.x =0;
    engine.world.gravity.y =0;
  // }
}
function changeGravity (keyPoint){
    if (frameCount % 10 == 0) {
        const xMap = map(keyPoint.x, 0, myWidth, -PARAMS.physics.gravityForce, PARAMS.physics.gravityForce,);
        const yMap = map(keyPoint.y, 0, myHeight, -PARAMS.physics.gravityForce, PARAMS.physics.gravityForce,);
        engine.world.gravity.x =xMap;
        engine.world.gravity.y =yMap;
      }
}
function fallNobody() {
  if (frameCount % 50 == 0) {
    PARAMS.state.oneUser = false;
    console.log("isChanging!");
    engine.world.gravity.x =0;
    engine.world.gravity.y =1;
  }
}
function changeSizeIntro(headTypeChain,state,keyPoint) { 
  // Matter.Body.scale(headTypeChain.body, 5, 5);
  if(PARAMS.state.intro){
    headTypeChain.w=100;
    headTypeChain.h=100;
    headTypeChain.ratio=2;
   
    PARAMS.state.variableFont= 100
    // console.log( headTypeChain.pos.x);
     // Matter.Body.scale(headTypeChain.body, 5, 5);
    // headTypeChain.pos.x=myWidth/2;
    // headTypeChain.pos.y=myHeight/2;
    // console.log(headTypeChain.pos);
    // headTypeChain.pos.x= keyPoint.x;
    // headTypeChain.pos.y=  engine.world.gravity.y
  }else{
    PARAMS.state.variableFont= 40;
    headTypeChain.w=50;
    headTypeChain.h=50;
    headTypeChain.ratio=1;
  }

 }
