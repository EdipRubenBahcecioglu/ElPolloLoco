class Heart extends MoveableObject{

    /**
     * Functions within the constructor are executed immediately
     * The function within the constructor loads the heart image and sets the coordinates and imagesize for the draw function
     * 
     * @param {number} x 
     * @param {number} y 
     */

    constructor(x, y){
        super().loadImage('img/heart/heart.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
    }
}    