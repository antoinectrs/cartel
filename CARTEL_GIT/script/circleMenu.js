class CircleMenu {
    constructor() {
        this.lastPosition = { x: 0, y: 0, };
        this.diametre = 30;
    }
    positionMove(x,y,somebody){
            this.lastPosition.x = x;
            this.lastPosition.y = y;
    }
    positionToCenter(){
        this.lastPosition.x = lerp( this.lastPosition.x, myWidth/2, 0.08);
        this.lastPosition.y = lerp( this.lastPosition.y, myHeight/2, 0.08);
    }
    show() {
       
        push();
        const variation = (sin(millis() / 1000));
        drawingContext.filter = 'contrast(1000%)  blur(' + (15 + (variation * 10)) + 'px)';
        // noFill();
        stroke(0);
        strokeWeight(13);
        ellipse( this.lastPosition .x,  this.lastPosition.y , 100 - variation *   this.diametre , 100 - variation *   this.diametre );
        pop();
    }
}