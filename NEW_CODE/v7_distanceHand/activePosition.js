class ActivePosition {
    constructor(x, y, lett) {
        this.position;
        this.letter;
        this.touch = false;
        this.amount = 1;
        this.step = -0.01;
    }
    setUpPosition(index,level) {
        const simplify = 5;
        const x = Math.ceil(position[level][index].x / simplify) * simplify;
        const y = Math.ceil(position[level][index].y / simplify) * simplify;
        this.position = { x, y };
    }
    setUpLetter(lett) {
        this.letter = lett;
    }
    showActualPoint() {
        if (this.touch == true) {
            ellipse(this.position.x, this.position.y, 10);
        }
    }
    checkDistance(x1, y1, x2, y2, threshold) {
        if (dist(x1, y1, x2, y2) < threshold) {
            this.touch = true;
        }
    }
    calculVector(x, y, amount) {
        const v0 = createVector(this.position.x, this.position.y);
        const v1 = createVector(x, y);
        // line(width-v0.x, v0.y, width-v1.x, v1.y);
        return p5.Vector.lerp(v0, v1, amount);
    }
    activeCount() {
        if (this.amount >= 0) {
            this.amount += this.step;
            return this.amount;
        }
    }
}
