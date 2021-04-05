export default class Aim {
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    draw(context) {
        context.beginPath();
        context.strokeStyle = "white";
        context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
    }
}