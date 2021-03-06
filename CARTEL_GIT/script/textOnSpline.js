// https://stackoverflow.com/questions/8974364/how-can-i-draw-a-text-along-arc-path-with-html-5-canvas
function getTextOnSpline(textString, points, options = {}) {
    const Ribbon = {
        debug: true,
        maxChar: 20,
        startX: points[0],
        startY: points[1],
        control1X: points[2],
        control1Y: points[3],
        control2X: points[4],
        control2Y: points[5],
        endX: points[6],
        endY: points[7],
        ...options
    };
    if (Ribbon.debug) {
        push()
        stroke('red');
        bezier(...points)
        pop()
    }
    return FillRibbon(textString, Ribbon);
}
function FillRibbon(text, Ribbon) {
    var textCurve = [];
    var ribbon = text.substring(0, Ribbon.maxChar);
    var curveSample = 1000;
    xDist = 0;
    var i = 0;
    for (i = 0; i < curveSample; i++) {
        a = new bezier2(i / curveSample, Ribbon.startX, Ribbon.startY, Ribbon.control1X, Ribbon.control1Y, Ribbon.control2X, Ribbon.control2Y, Ribbon.endX, Ribbon.endY);
        b = new bezier2((i + 1) / curveSample, Ribbon.startX, Ribbon.startY, Ribbon.control1X, Ribbon.control1Y, Ribbon.control2X, Ribbon.control2Y, Ribbon.endX, Ribbon.endY);
        c = new _bezier(a, b);
        textCurve.push({
            bezier: a,
            curve: c.curve
        });
    }
    // letterPadding = drawingContext.measureText(" ").width /2;
    letterPadding = 40;
    w = ribbon.length;
    ww = Math.round(drawingContext.measureText(ribbon).width);
    totalPadding = (w - 1) * letterPadding;
    totalLength = ww + totalPadding;
    p = 0;
    cDist = textCurve[curveSample - 1].curve.cDist;

    z = (cDist / 2) - (totalLength / 2);

    for (i = 0; i < curveSample; i++) {
        if (textCurve[i].curve.cDist >= z) {
            p = i;
            break;
        }
    }

    const results = []
    for (i = 0; i < w; i++) {
        let tab=false;
        if(ribbon[i]==" "){
            tab=true;
        }
        results.push({
            char: ribbon[i],
            x: textCurve[p].bezier.point.x,
            y: textCurve[p].bezier.point.y,
            angle: textCurve[p].curve.rad,
            tab:tab,
        })
        x1 = drawingContext.measureText(ribbon[i]).width + letterPadding;
        x2 = 0;
        for (j = p; j < curveSample; j++) {
            x2 = x2 + textCurve[j].curve.dist;
            if (x2 >= x1) {
                p = j;
                break;
            }
        }
    }

    return results
    // textCurve()
} //end FillRibon

function _bezier(b1, b2) {
    //Final stage which takes p, p+1 and calculates the rotation, distance on the path and accumulates the total distance
    this.rad = Math.atan(b1.point.mY / b1.point.mX);
    this.b2 = b2;
    this.b1 = b1;
    dx = (b2.x - b1.x);
    dx2 = (b2.x - b1.x) * (b2.x - b1.x);
    this.dist = Math.sqrt(((b2.x - b1.x) * (b2.x - b1.x)) + ((b2.y - b1.y) * (b2.y - b1.y)));
    xDist = xDist + this.dist;
    this.curve = {
        rad: this.rad,
        dist: this.dist,
        cDist: xDist
    };
}

function bezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
    //calculates the tangent line to a point in the curve; later used to calculate the degrees of rotation at this point.
    this.mx = (3 * (1 - t) * (1 - t) * (control1X - startX)) + ((6 * (1 - t) * t) * (control2X - control1X)) + (3 * t * t * (endX - control2X));
    this.my = (3 * (1 - t) * (1 - t) * (control1Y - startY)) + ((6 * (1 - t) * t) * (control2Y - control1Y)) + (3 * t * t * (endY - control2Y));
}

function bezier2(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
    //Quadratic bezier curve plotter
    this.Bezier1 = new bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y);
    this.Bezier2 = new bezier1(t, control1X, control1Y, control2X, control2Y, endX, endY);
    this.x = ((1 - t) * this.Bezier1.x) + (t * this.Bezier2.x);
    this.y = ((1 - t) * this.Bezier1.y) + (t * this.Bezier2.y);
    this.slope = new bezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY);
    this.point = {
        t: t,
        x: this.x,
        y: this.y,
        mX: this.slope.mx,
        mY: this.slope.my
    };
}
function bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y) {
    //linear bezier curve plotter; used recursivly in the quadratic bezier curve calculation
    this.x = ((1 - t) * (1 - t) * startX) + (2 * (1 - t) * t * control1X) + (t * t * control2X);
    this.y = ((1 - t) * (1 - t) * startY) + (2 * (1 - t) * t * control1Y) + (t * t * control2Y);

}