class ActivePosition{
    constructor(x,y){
        // console.log(position);
        this.position = {x,y};
        // this.level = 0;
        this.touch= false;
    }
    showActualPoint(){
        // console.log(this.position[this.level][0]);
        // for (let index = 0; index <  this.position[this.level].length; index++) {
            // translate(mouseX, 0)
            // if( this.touch==true){
                ellipse(this.position.x, this.position.y, 10);
            // }
           
         
        // }
    }
    checkDistance(x1,y1,x2,y2,threshold){
        // for (let inde1 = 0; index <  this.position[this.level].length; index++) {
           if( dist(x1,y1,x2,y2)<threshold){

            this.touch=true;
            // console.log(this.touch);
            //    ellipse(this.position[this.level][index].x, this.position[this.level][index].y, threshold);
        //    }
        }
        // console.log(dist(x1,y1,x2,y2));
        // console.log( this.touch);
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
