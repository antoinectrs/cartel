// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
 
      if (distBeetweenStep(PARAMS.posnet.poses[0].pose.keypoints[10], PARAMS.pointArc[originStartWord(PARAMS.state.stateMachine - 1)]) < 600) {
        changeStep();

    PARAMS.state.oneUser = true;
  } 
}
function distBeetweenStep(keypoint, targetFix) {
  const noseToStep = dist(keypoint.position.x, 0, targetFix.x, 0);
  // const noseToStep = dist(keypoint.position.x, keypoint.position.y, targetFix.x,targetFix.y, 0);
  return noseToStep;
}

function createBlurredEllipse(changecolor) {
  push();
    const variation = (sin(millis() / 1000));
 drawingContext.filter = 'contrast(1000%)  blur('+(15+(variation*10))+'px)';
 // noFill();
 stroke(0);
  strokeWeight(13);
   ellipse(PARAMS.posnet.hand.x1 ,PARAMS.posnet.hand.y1-200, 100-variation*30, 100-variation*30);
  pop();
}
function changeEllipse(x,y) {
  PARAMS.posnet.hand.x1 = lerp( PARAMS.posnet.hand.x1, x, 0.08);
  PARAMS.posnet.hand.y1 = lerp( PARAMS.posnet.hand.y1, y, 0.08);

  // PARAMS.posnet.headColider.position.x= PARAMS.posnet.hand.x1;
  // PARAMS.posnet.headColider.position.y= PARAMS.posnet.hand.y1-200;
  // ellipse(PARAMS.posnet.headColider.position.x,PARAMS.posnet.headColider.position.y,100)
  // console.log();

  // PARAMS.posnet.hand.x1 = x;
  // PARAMS.posnet.hand.y1 = y;
}