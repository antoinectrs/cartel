// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
}
// Create a new poseNet method with a single detection
const poseNet = ml5.poseNet(video, modelReady);
poseNet.on("pose", gotPoses);
// A function that gets called every time there's an update from the model
function gotPoses(results) {
  PARAMS.posnet.poses = results;
}
function modelReady() {
  poseNet.multiPose(video);
  PARAMS.posnet.model = true;
}
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
 
  // Loop through all the poses detected
  // if (PARAMS.posnet.poses.length >= 1) {
    // for (let j = 0; j < 5; j += 1) {
    // if (PARAMS.posnet.poses[0].pose.keypoints[0].score > 0.2) {
      //  if(distBeetweenStep(PARAMS.posnet.poses[0].pose.keypoints[0], PARAMS.pointArc[0])<200){
      if (distBeetweenStep(PARAMS.posnet.poses[0].pose.keypoints[10], PARAMS.pointArc[originStartWord(PARAMS.state.stateMachine - 1)]) < 300) {
        changeStep();
        // console.log(PARAMS.state.stateMachine);
        // console.log(PARAMS.pointArc[originStartWord(PARAMS.state.stateMachine-1)]);
      // }
      //  drawSkeleton();
      // customSkeleton();
      // console.log(PARAMS.posnet.poses[0].pose.keypoints[9]);
      // createBlurredEllipse(PARAMS.posnet.poses[0].pose.keypoints[9].position.x - 50,  PARAMS.posnet.poses[0].pose.keypoints[9].position.y - 50,0);
      // circle(PARAMS.posnet.poses[0].pose.keypoints[9].position.x, PARAMS.posnet.poses[0].pose.keypoints[9].position.y, 20);
      // drawMyHead(PARAMS.posnet.poses[0].pose.keypoints[0], 0, 10);
      // changeGravity(PARAMS.posnet.poses[0].pose.keypoints[0].position,0,j)
    // }
    // }
    PARAMS.state.oneUser = true;
  } 
}
function distBeetweenStep(keypoint, targetFix) {
  const noseToStep = dist(keypoint.position.x, 0, targetFix.x, 0);
  return noseToStep;
}
function drawMyHead(keypoint, i, j) {
  // circle(keypoint.position.x, keypoint.position.y, 20);
  console.log(keypoint);
  circle(keypoint.position.x, keypoint.position.y, 20);
  // text((i+1)*j+1, keypoint.position.x, keypoint.position.y);
}
// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < PARAMS.posnet.poses.length; i += 1) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < PARAMS.posnet.poses[i].skeleton.length; j += 1) {
      let partA = PARAMS.posnet.poses[i].skeleton[j][0];
      let partB = PARAMS.posnet.poses[i].skeleton[j][1];
      drawingContext.beginPath();
      drawingContext.moveTo(partA.position.x, partA.position.y);
      drawingContext.lineTo(partB.position.x, partB.position.y);
      drawingContext.stroke();
    }
  }
}
function customSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < PARAMS.posnet.poses.length; i += 1) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < PARAMS.posnet.poses[0].skeleton.length; j += 1) {
      // let partA = PARAMS.posnet.poses[0].skeleton[j][0];
      // let partB = PARAMS.posnet.poses[0].skeleton[j][1];
      // drawingContext.beginPath();
      // drawingContext.moveTo(partA.position.x, partA.position.y);
      // drawingContext.lineTo(partB.position.x, partB.position.y);
      // drawingContext.stroke();
      // console.log(PARAMS.posnet.poses[0].skeleton[j][0].part=="leftShoulder", j);
      // circle(partA.position.x, partA.position.y, 20);
    }
    // const target= PARAMS.posnet.poses[0];
    // console.log(target);
    // circle(target.position.x, target.position.y, 20);
  }
}
function createBlurredEllipse(changecolor) {
  push();
    const variation = (sin(millis() / 1000));
 drawingContext.filter = 'contrast(1000%)  blur('+(15+(variation*10))+'px)';
 // noFill();
 stroke(0);
  strokeWeight(13);
   ellipse(PARAMS.posnet.hand.x1 ,PARAMS.posnet.hand.y1, 100-variation*30, 100-variation*30);
  pop();

}
function changeEllipse(x,y) {
  PARAMS.posnet.hand.x1 = lerp( PARAMS.posnet.hand.x1, x, 0.03);
  PARAMS.posnet.hand.y1 = lerp( PARAMS.posnet.hand.y1, y, 0.03);
}