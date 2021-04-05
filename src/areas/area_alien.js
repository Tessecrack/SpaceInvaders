export default class AreaAlien { 
    constructor(x, y, width, height) {
        this.x = x; 
        this.y = y;
        this.w = width;
        this.h = height;
    }
    draw(context) {
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "yellow";
        context.strokeRect(this.x, this.y, this.w, this.h);
        context.stroke();
        context.closePath();
    }
}