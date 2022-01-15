function LetterTemplate(path) {
  var pointsAsString = "";
  this.points = path;
  this.options = {
    friction: 0,
    // restitution: 1,
    restitution: 0.5
  };
}
function Letter(world, x, y, input) {
  //this.body = Bodies.circle(x, y, 30, input.options);
  console.log(PARAMS.font.bodyBox);
  this.body = Bodies.rectangle(x, y, PARAMS.font.bodyBox, PARAMS.font.bodyBox, input.options);
  //this.body = Bodies.trapezoid(x, y, 50, 50, 1, input.options);
  if (this.body) {
    World.add(world, this.body);
  }
  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    stroke(0);
    // strokeWeight(1)
    //noStroke();
    // fill(0);
    noFill();
    rect(0, 0, 50, 50);
    noStroke();
    fill(0);
    translate(0, -10);
    text(input, 0, 0);
    pop();
  }
}