function TextChain(x, y, w, h, letter) {
  var options = {
    friction: 0.5,
    restitution: 0.9
  };
  this.w = w;
  this.h = h;
  this.ratio = 0.75;
  // this.fSize= fSize;
  this.pos;
  this.body = Bodies.rectangle(x, y, w, h, options);
  World.add(world, this.body);

  this.show = function () {
    this.pos = this.body.position;
    var angle = this.body.angle;
    push();
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(0);
    // rect(0, 0, this.w, this.h);
    fill(0);
    scale(-1, 1);
    translate(-52.5 * this.ratio, -70 * this.ratio);
    text(letter, this.w, this.h)
    pop();
  };
}
