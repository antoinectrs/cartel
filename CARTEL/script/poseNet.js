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
  console.log(PARAMS.posnet.model);
}
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  if (PARAMS.posnet.poses.length == 1) {
    for (let j = 0; j < 5; j += 1) {
      let keypoint = PARAMS.posnet.poses[0].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        drawMyHead(keypoint, 0, j);
        changeGravity(keypoint.position,0,j)
      }
    }
    PARAMS.state.oneUser = true;
  } else if(PARAMS.state.oneUser) {
    fallNobody();
  }
}
function drawMyHead(keypoint, i, j) {
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
      ctx.beginPath();
      ctx.moveTo(partA.position.x, partA.position.y);
      ctx.lineTo(partB.position.x, partB.position.y);
      ctx.stroke();
    }
  }
}
