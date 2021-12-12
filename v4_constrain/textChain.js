function TextChain(x, y, w, h,letter) {
    var options = {
      friction: 0.5,
      restitution: 0.9
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  
    this.show = function() {
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      rectMode(CENTER);
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      strokeWeight(1);
      stroke(0);

    

      rect(0, 0, this.w, this.h);
      fill(0);
      translate(-50, -60);
      text(letter, this.w, this.h)
      
      pop();
    };
  }
  