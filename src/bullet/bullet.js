import * as collision_manager from "../collision_manager/collisionManager.js";
import {default as Vertex} from "../collision_manager/vertex.js";
export default class Bullet {
    constructor(xBegin, yBegin, caliber, color, type) {
        this.x = xBegin;
        this.y = yBegin;
        this.xBegin = xBegin;
        this.yBegin = yBegin;
        this.vx = 0;
        this.vy = 0;
        this.caliber = caliber;
        this.zoomBullet = caliber;
        this.isFire = false;
        this.color = color;
        this.type = type;
        this.coefSpeed = 30;
        this.r = caliber;
        this.damage = 5;
    }
    
    fire(xEnd, yEnd) {
        if (this.isFire) return;
        this.vx = (xEnd - this.x) / this.coefSpeed;
        this.vy = (yEnd - this.y) / this.coefSpeed;
        this.isFire = true;
    }

    update(x, y) {
        if (!this.isFire) {
            this.x = x;
            this.y = y;
        }
        this.x += this.vx;
        this.y += this.vy;
    }
     
    draw(context) {
        if (!this.isFire) return;
        context.beginPath();
        let grad = context.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.caliber);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "white");
        context.fillStyle = grad;
        context.arc(this.x, this.y, this.zoomBullet, 0, 2*Math.PI, false);
        context.fill();
        context.closePath();
    }

    get left()      { return this.x - this.r; }
    get right()     { return this.x + this.r; }
    get top()       { return this.y - this.r; }
    get bottom()    { return this.y + this.r; }

    get vertexes() {
        let vertexes = [new Vertex(this.left, this.y),new Vertex(this.x, this.top),new Vertex(this.right, this.y),
            new Vertex(this.x, this.bottom), new Vertex(this.x, this.y)];
        return vertexes;
    }

    intersects(object) { return  collision_manager.collisionFunction(this, object);}

    dist(x1, y1, x2, y2) {
        let o1 = y1 - y2; 
        let o2 = x1 - x2;
        return Math.sqrt(o1 * o1 + o2 * o2);
    }
}