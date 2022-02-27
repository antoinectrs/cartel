class ActivePosition{
    constructor(){
        console.log(position);
        this.position = position;
        this.level = 0;
        this.touch= false;
    }
    showActualPoint(){
        // console.log(this.position[this.level][0]);
        for (let index = 0; index <  this.position[this.level].length; index++) {
            // translate(mouseX, 0)
            if( this.touch=true)
         ellipse(this.position[this.level][index].x, this.position[this.level][index].y, 10);
        }
    }
    checkDistance(x,y,threshold){
        for (let index = 0; index <  this.position[this.level].length; index++) {
           if( dist(x, y, this.position[this.level][index].x, this.position[this.level][index].y)<threshold){
            // this.touch=true;
               ellipse(this.position[this.level][index].x, this.position[this.level][index].y, threshold);
           }
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