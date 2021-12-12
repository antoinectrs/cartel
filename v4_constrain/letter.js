function LetterTemplate(path) {
  var pointsAsString = "";
  // for (var j = 0; j < path.length; j++) {
  //   pointsAsString += path[j].x * 8 + " ";
  //   pointsAsString += path[j].y * 8 + " ";
  // }
  // this.vertices = Vertices.fromPath(pointsAsString);
  this.points = path;
  this.options = {
    friction: 0,
    // restitution: 1,
    restitution: 0.5
  };
}

function Letter(world, x, y, input) {
  // this.points = input.points;


  //this.body = Bodies.fromVertices(x, y, this.vertices);

  //this.body = Bodies.circle(x, y, 30, input.options);
  this.body = Bodies.rectangle(x, y, 50, 50, input.options);
  //this.body = Bodies.trapezoid(x, y, 50, 50, 1, input.options);
  //Body.setVertices(this.body, this.vertices);

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

    //ellipse(pos.x, pos.y, 30, 30);
    rect(0, 0, 50, 50);
    noStroke();
    fill(0);
    translate(0, -10);
    text(input, 0, 0);

    pop();
  }
}