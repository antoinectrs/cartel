class CircleMenu {
    constructor() {
        this.lastPosition = { x: 0, y: 0, };
        this.diametre = 30;

        this.w = 40;
        this.h = 40;
        this.r = 100;
        // this.currentChar;
        this.totalAngle;
        this.theta;
        this.str = "bla bla bla bla bla bla bla bla";
    }
    positionMove(x, y, somebody) {
        this.lastPosition.x = x;
        this.lastPosition.y = y;
    }
    positionToCenter() {
        this.lastPosition.x = lerp(this.lastPosition.x, myWidth / 2, 0.08);
        this.lastPosition.y = lerp(this.lastPosition.y, myHeight / 2, 0.08);
    }
    // show() {
    //     push();
    //     const variation = (sin(millis() / 1000));
    //     drawingContext.filter = 'contrast(1000%)  blur(' + (15 + (variation * 10)) + 'px)';
    //     // noFill();
    //     stroke(0);
    //     strokeWeight(13);
    //     ellipse(this.lastPosition.x, this.lastPosition.y, 100 - variation * this.diametre, 100 - variation * this.diametre);
    //     pop();
    // }
    show() {
        textAlign(CENTER);
        textSize(44.5)
        translate(this.lastPosition.x, this.lastPosition.y);
        // Draw a a circle with radius r
        noFill();
        noStroke();
        ellipse(0, 0, this.r * 2, this.r * 2);
        // current distance around the circle
        let arcLength = 0;
        // total number of radians that the text will consume
        let totalAngle = textWidth(this.str) / this.r;
        // iterate over each individual character in the String
        rotate(1.9);
        for (let i = 0; i < 60; i++) {
            let currentChar = this.str.charAt(i);
            this.w = textWidth(currentChar);
            arcLength += this.w / 2;
            theta = arcLength / this.r - totalAngle / 2;
            push();
            rotate(theta);
            translate(0, -this.r);
            fill(0);
            text(currentChar, 0, 0);
            pop();
            arcLength += this.w / 2;
        }
        this.drawAxis();
    }
    drawAxis() {
        stroke(255, 0, 0);
        line(0, 0, 20, 0);
        stroke(0, 255, 0);
        line(0, 0, 0, 20);
      }
}

