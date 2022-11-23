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
    constructor(imagePath, x) { // Die Parameter werden den Parametern aus Zeile 13 world.class.js zugeorndet
        super().loadImage(imagePath); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        this.x = x; // Übergeordnete Klasse hat keinen festen X Wert daher 0
        this.y = 480 - this.height;
    }
}