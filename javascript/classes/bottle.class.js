class Bottle extends MoveableObject{

    /**
     * Functions within the constructor are executed immediately
     * We access the parent class and execute the function loadImage
     * All variables in the constructor are passed on when an object of the class is created for example new Bottle()
     * 
     * @param {number} x - x coordinate 
     * @param {number} y - y coordinate
     * @param {string} imgPathBottle - this is the path of the image what will be loaded
     */
    constructor(x, y, imgPathBottle){
        super().loadImage(imgPathBottle);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
    }
}