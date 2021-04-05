import {default as Sprite} from './sprite.js'

export default class SpriteMap {
    constructor(sourceImage, countOfPositionsWidth, countOfPositionsHeight, scaleX, scaleY) {
        this.sourceImage = sourceImage;
        this.countOfPositionsWidth = countOfPositionsWidth;
        this.countOfPositionsHeight = countOfPositionsHeight;
        this.widthOneSprite = sourceImage.width / countOfPositionsWidth;
        this.heightOneSprite = sourceImage.height / countOfPositionsHeight;
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.w = this.widthOneSprite * this.scaleX;
        this.h = this.heightOneSprite * this.scaleY;

        this.positions = this._positions();
    }

    _positions() {
        let listOfSprites = [];
        for (let y = 0; y < this.sourceImage.height; y += this.heightOneSprite) 
        {
            for (let x = 0; x < this.sourceImage.width; x += this.widthOneSprite)
            {
                listOfSprites.push(new Sprite(x, y, this.widthOneSprite, this.heightOneSprite));
            }
        }
        return listOfSprites;
    }

    draw(context, numberPosition, x, y) {
        context.drawImage(this.sourceImage, 
            this.positions[numberPosition].x, 
            this.positions[numberPosition].y, 
            this.widthOneSprite, 
            this.heightOneSprite, 
            x, y, this.widthOneSprite * this.scaleX, this.heightOneSprite * this.scaleY);
    }
}