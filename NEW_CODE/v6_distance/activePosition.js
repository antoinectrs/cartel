class ActivePosition{
    constructor(x,y){
        this.position = {x,y};
        this.touch= false;
    }
    showActualPoint(){
            if( this.touch==true){
                ellipse(this.position.x, this.position.y, 10);
            }
    }
    checkDistance(x1,y1,x2,y2,threshold){
           if( dist(x1,y1,x2,y2)<threshold){
            this.touch=true;
        }
    }
    calculVector(x,y,amount){
        const v0 = createVector(this.position.x, this.position.y);
        // const v0 = createVector(mouseX,mouseY);
        const v1 = createVector(x,y);
        line(width-v0.x, v0.y, width-v1.x, v1.y);
        return p5.Vector.lerp(v0, v1, amount);
      }
}
