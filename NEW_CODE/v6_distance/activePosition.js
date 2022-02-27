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

    // checkDistance(x,y,threshold){
    //     for (let index = 0; index <  this.position[this.level].length; index++) {
    //        if( dist(x, y, this.position[this.level][index].x, this.position[this.level][index].y)<threshold){
    //         this.touch=true;
    //         //    ellipse(this.position[this.level][index].x, this.position[this.level][index].y, threshold);
    //        }
    //     }
    // }
}
