class BackgroundObject extends MoveableObject{

    width = 720;
    height = 480;

    /**
     * Functions within the constructor are executed immediately
     * We access the parent class and execute the function loadImage
     * All variables in the constructor are passed on when an object of the class is created for example new BackgroundObject() 
     * 
     * @param {string} imagePath - this is the path of the image what will be loaded
     * @param {number} x - x coordinate 
     */
    constructor(imagePath, x) { 
        super().loadImage(imagePath);
        this.x = x; 
        this.y = 480 - this.height;
    }
}