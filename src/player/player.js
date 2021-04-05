import * as collision_manager from "../collision_manager/collisionManager.js";
import {default as Vertex} from "../collision_manager/vertex.js";

export default class Player {
    constructor(spriteMap, beginPositionX, beginPositionY) {
        this.x = beginPositionX; 
        this.y = beginPositionY;
        this.vx = 5; 
        this.vy = 3;
        this.spriteMap = spriteMap;
        this.scaleX = this.spriteMap.scaleX;
        this.scaleY = this.spriteMap.scaleY;
        this.w = this.spriteMap.widthOneSprite * this.scaleX; 
        this.h = this.spriteMap.heightOneSprite * this.scaleY;
        this.isWalks = false;
        this.direction = 1; //1 - down, 4 - left, 7 - right, 10 - up
        this.health = 100;
        this.underBunker = true;
    }

    moveUp(time) { 
        this.y -= this.vy; 
        if (!this.isWalks) this.direction = 10;
        else this.direction = Math.ceil(time / 100) % 2 === 0 ? 9 : 11;
    }
    moveDown(time) { 
        this.y += this.vy;
        if (!this.isWalks) this.direction = 1;
        else this.direction = Math.ceil(time / 100) % 2 === 0 ? 2 : 0;
    }
    moveRight(time) { 
        this.x += this.vx; 
        if (!this.isWalks) this.direction = 7;
        else this.direction = Math.ceil(time / 100) % 2 === 0 ? 8 : 6; 
    }
    moveLeft (time) { 
        this.x -= this.vx; 
        if (!this.isWalks) this.direction = 4;
        else this.direction = Math.ceil(time / 100) % 2 === 0 ? 5 : 3;
    }

    draw(context) {
        this.spriteMap.draw(context, this.direction, this.x, this.y, this.scaleX, this.scaleY);
    }

    get vertexes(){
        let vertexes = [ new Vertex(this.x, this.y), new Vertex(this.x + this.w, this.y), 
            new Vertex(this.x + this.w, this.y + this.h),
            new Vertex(this.x, this.y + this.h) ];
        return vertexes;
    }

    intersectsWithBunkers(objects) {
        for (let i = 0; i < objects.length; i++) {
            if (this.x + this.w > objects[i].x && this.x < objects[i].x + objects[i].w 
                && this.y <= objects[i].y + objects[i].h / 2) { 
                return "top";
            }
        } 
        return "none";
    }

    intersects(object) { return  collision_manager.collisionFunction(this, object);}
}