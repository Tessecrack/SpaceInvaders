import {default as Alien} from './alien.js'

export default class SquadAliens { 
    constructor(enemyTypes, countOfMonsters, colorBullet, zoneX, zoneY, zoneWidth, zoneHeight){
        this.enemyTypes = enemyTypes;
        this.countOfTypes = enemyTypes.length;
        this.countOfMonsters = countOfMonsters;
        this.colorBullet = colorBullet;
        this.zoneX = zoneX;
        this.zoneY = zoneY;
        this.zoneWidth = zoneWidth; 
        this.zoneHeight = zoneHeight;
        this.listOfMonsters = this._setListOfMonster();
        this.isWin = false;
        this.directionRight = true;
    }

    _setListOfMonster() {
        let list = [];
        let beginPositionY = 0;
        for (let typeMonster = 0; typeMonster < this.countOfTypes; typeMonster++)
        {
            let beginPositionX = this.zoneWidth / 2 - ((this.enemyTypes[typeMonster].w/2) * this.countOfMonsters);
            for (let numberMoster = 0; numberMoster < this.countOfMonsters; numberMoster++)
            {
                let enemy = new Alien(beginPositionX + this.enemyTypes[typeMonster].w * numberMoster,
                    beginPositionY,
                    this.enemyTypes[typeMonster].spriteMap, 
                    this.enemyTypes[typeMonster].vx,
                    this.enemyTypes[typeMonster].vy, 
                    this.enemyTypes[typeMonster].health);
                list.push(enemy);
            }
            beginPositionY += this.enemyTypes[typeMonster].h;
        }
        return list;
    }

    move(time) {
        let vx = 1; 
        let vy = 0.01;
        if (Math.ceil(time / 1000) % 2 == 0) {
            for (let i = this.listOfMonsters.length - 1; i >= 0; i--) {
                if (this.listOfMonsters[i].x + this.listOfMonsters[i].w >= this.zoneWidth) {
                    this.directionRight = false;
                }
                if (this.listOfMonsters[i].x <= 0) {
                    this.directionRight = true;
                }
                if (this.listOfMonsters[i].y + this.listOfMonsters[i].h >= this.zoneHeight) {
                    this.isWin = true;
                }
            }
            vx = this.directionRight ? vx : -vx;
            for(let i = 0; i < this.listOfMonsters.length; i++) {
                this.listOfMonsters[i].move(vx, vy);
            }
        } else {
            for (let i = 0; i < this.listOfMonsters.length; i++) {
                this.listOfMonsters[i].move(0, 0);
            }
        }
    }

    draw(context, time) {

        for (let i = 0; i < this.listOfMonsters.length; i++) {
            this.listOfMonsters[i].draw(context, time);
        }
    }
}
