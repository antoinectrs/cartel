function TextChain(x, y, w, h, letter) {
  var options = {
    friction: 10,
    restitution: 0
  };
  this.isFixed=false;
  this.w = w;
  this.h = h;
  this.ratio = 1.05;
  // this.fSize= fSize;
  this.pos;
  // this.body = Bodies.rectangle(x, y, w, h, options);
  this.body = Bodies.circle(x, y, w, options);

  this.textWorld = Composite.add(world, this.body);

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
    ellipse(0,0, this.w);
    // rect(0, 0, this.w, this.h);
    fill(0);
    scale(-1, 1);
    translate(-14 * this.ratio, -17 * this.ratio);
    text(letter, this.w, this.h)
    pop();
  };
}
