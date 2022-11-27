class Coin extends MoveableObject{

    /**
     * Functions within the constructor are executed immediately
     * The function within the constructor loads the coin image and sets the coordinates and imagesize for the draw function
     * 
     * @param {number} x - x position of coin
     * @param {number} y - y position of coin
     * @param {string} imagePathCoin - image path of coin  
     */
    constructor(x, y, imagePathCoin){
        super().loadImage(imagePathCoin);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
    }
}    