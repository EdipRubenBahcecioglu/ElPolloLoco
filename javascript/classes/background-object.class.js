class BackgroundObject extends MoveableObject{

    width = 720;
    height = 480;

    constructor(imagePath, x) { // Die Parameter werden den Parametern aus Zeile 13 world.class.js zugeorndet
        super().loadImage(imagePath); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        this.x = x; // Übergeordnete Klasse hat keinen festen X Wert daher 0
        this.y = 480 - this.height;
    }
}