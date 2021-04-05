import * as collision_manager from "../collision_manager/collisionManager.js";
import {default as Vertex} from "../collision_manager/vertex.js";

export default class Bunker {
    constructor(spriteMap, beginPositionX, beginPositionY) {
        this.spriteMap = spriteMap; 
        this.x = beginPositionX;
        this.y = beginPositionY;
        this.w = this.spriteMap.w;
        this.h = this.spriteMap.h;
    }

    draw(context) {
        this.spriteMap.draw(context, 0, this.x, this.y, this.spriteMap.scaleX, this.spriteMap.scaleY);
    }
    get vertexes() {
        let vertexes = [
            new Vertex(this.x, this.y), 
            new Vertex(this.x + this.w, this.y),
            new Vertex(this.x + this.w, this.y + this.h),
            new Vertex(this.x, this.y + this.h)
        ];
        return vertexes;
    }
    intersects(object) { return  collision_manager.collisionFunction(this, object);}
}