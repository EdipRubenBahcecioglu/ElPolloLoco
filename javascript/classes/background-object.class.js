class BackgroundObject extends MoveableObject{

    width = 720;
    height = 400;

    constructor(imagePath, x) { // Jede Classe hat ein Constructor. Innerhalb dieses Constructors werden die Sachen eingetragn, die sofort ausgeführt werden sollen
        super().loadImage(imagePath); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        this.x = x;
        this.y = 480 - this.height;
        console.log(imagePath);
    }
}