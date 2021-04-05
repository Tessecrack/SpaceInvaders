import * as collision_manager from "../collision_manager/collisionManager.js";
import {default as Vertex} from "../collision_manager/vertex.js";

 export default class Alien {
    constructor(x = 0, y = 0, spriteMap, vx, vy, health) {
        this.x = x; 
        this.y = y;
        this.spriteMap = spriteMap;
        this.vx = vx;
        this.vy = vy;
        this.scaleX = this.spriteMap.scaleX;
        this.scaleY = this.spriteMap.scaleY;
        this.direction = 1;
        this.w = this.spriteMap.widthOneSprite * this.scaleX; 
        this.h = this.spriteMap.heightOneSprite * this.scaleY;
        this.bullet;
        this.health = health;

        this._timeAnimation = 0;
        this.isDamage = false;
    }

    get vertexes(){
        let vertexes = [ new Vertex(this.x, this.y), new Vertex(this.x + this.w, this.y), 
            new Vertex(this.x + this.w, this.y + this.h),
            new Vertex(this.x, this.y + this.h) ];
        return vertexes;
    }


    move(vx, vy) {
        this.x += vx;
        this.y += vy;
    }

    draw(context, time) {
        let roundTime = Math.ceil(time / 1000);
        if (roundTime > this._timeAnimation) {
            let countOfDirections = (this.spriteMap.countOfPositionsHeight * this.spriteMap.countOfPositionsWidth) - 1;
            this.direction = (this.direction >= countOfDirections) ? 0 : this.direction + 1;
            this._timeAnimation = roundTime;
        }
        this.spriteMap.draw(context, this.direction, this.x, this.y);
        if (this.isDamage) this.drawDamage(context);
        this.isDamage = false;
    }

    drawDamage(context) {
        context.beginPath();
        context.lineWidth = "5";
        context.strokeStyle = "#ff3333";
        context.strokeRect(this.x, this.y, this.w, this.h);
        context.stroke();
        context.closePath();
    }
    intersects(object) { return  collision_manager.collisionFunction(this, object);}
}
