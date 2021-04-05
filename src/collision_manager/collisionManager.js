export function collisionFunction(firstObject, secondObject) { //формула Хари
    return objectIntersectsObject(firstObject, secondObject)
        || objectIntersectsObject(secondObject, firstObject);
}

function objectIntersectsObject(firstObject, secondObject) {
    let vertexThis = firstObject.vertexes;
    let vertexOther = secondObject.vertexes;
    for (let i = 0; i < vertexThis.length; i++) {
        let x0 = vertexThis[i].x;
        let y0 = vertexThis[i].y;
        for (let j = 0; j < vertexOther.length; j++) {
            if (dist(vertexThis[i].x, vertexThis[i].y, vertexOther[j].x, vertexOther[j].y) <= 5) return true;
            let xA = vertexOther[j].x;
            let yA = vertexOther[j].y;
            let xB = vertexOther[j + 1 == vertexOther.length ? 0 : j + 1].x;
            let yB = vertexOther[j + 1 == vertexOther.length ? 0 : j + 1].y;
            let t = ((x0 - xA) * (xB - xA) + (y0 - yA) * (yB - yA)) / (Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
            if (t < 0) t = 0;
            if (t > 1) t = 1;
            let l = Math.sqrt(Math.pow(xA - x0 + (xB - xA)*t, 2) + Math.pow(yA - y0 + (yB - yA) * t, 2));
            if (l <= 2) return true;
        }
    }
    return false;
}

function dist(x1, y1, x2, y2) {
    let o1 = y1 - y2; 
    let o2 = x1 - x2;
    return Math.sqrt(o1*o1 + o2*o2);
}