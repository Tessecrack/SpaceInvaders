export default class ItemBar { 
    constructor(x, y, w, h, faceRobot) {
        this.x = x; 
        this.y = y; 
        this.w = w; 
        this.h = h;
        this.faceRobot = faceRobot;
        this.health = 0; 
        this.countOfKill = 0;
        this.countOfBunkers = 0;
        this.time = 0;
    }

    update(health, countOfKill, countOfBunkers, time) {
        this.health         = health;
        this.countOfKill    = countOfKill;
        this.countOfBunkers = countOfBunkers;
        this.time           = time;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "black";
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
        context.stroke();
        context.fill();
        context.closePath();
        
        context.beginPath();
        context.font = "32pt Impact";
        context.lineWidth = "1";
        context.fillStyle = "green";
        context.fillText("Bunkers: " + this.countOfBunkers, 0, this.y + this.h/2 + 20, 1500);
        context.fillStyle = "#00cccc";
        context.fillText("Health: " + this.health, this.w/4, this.y + this.h/2 + 20, 1500);
        context.fillStyle = "red";
        context.fillText("Killed: " + this.countOfKill, this.w/2 + this.w/8, this.y + this.h/2 + 20, 1500);
        context.fillStyle = "darkmagenta";
        context.fillText("Time: " + this.time, this.w - this.w/6, this.y + this.h/2 + 20, 1500);
        context.closePath();
        this.faceRobot.draw(context, 0, this.w/2 - this.faceRobot.w/2, this.y);
    }
}