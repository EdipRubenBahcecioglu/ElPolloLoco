class Coin extends MoveableObject{

    constructor(x, y, imagePathCoin){
        super().loadImage(imagePathCoin);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
    }
}    