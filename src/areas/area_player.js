export default class AreaPlayer {
    constructor(x, y, width, height) {
        this.x = x; 
        this.y = y;
        this.w = width;
        this.h = height;
    }
    draw(context) {
        context.beginPath();
        context.strokeStyle = "green";
        context.lineWidth = "2";
        context.strokeRect(this.x, this.y, this.w, this.h);
        context.stroke();
        context.closePath();
    }
}