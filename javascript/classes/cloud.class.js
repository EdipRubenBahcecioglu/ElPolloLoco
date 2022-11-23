class Cloud extends MoveableObject {
    y = 2; // In der Übergeordneten Klasse MoveableObject ist zwar das y enthalten, wird jedoch hier überschrieben
    width = 500;
    height = 250;

    /**
     * Functions within the constructor are executed immediately
     * 
     */

    constructor() { // Jede Classe hat ein Constructor. Innerhalb dieses Constructors werden die Sachen eingetragn, die sofort ausgeführt werden sollen
        super().loadImage('../img/5_background/layers/4_clouds/1.png'); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        this.x = Math.random() * 500; // Mit this.x greifen wir auf den x Wert der Übergeordneten Klasse zu // Math.Random ist immer eine zufällige Zahl zwischen 0 und 1
        this.objectMoveLeft();
    }

    /**
     * This function makes the object move left
     * 
     */

    objectMoveLeft() { // WIRD DIESE FUNKTION ÜBERHAUPT BENÖTIGT ?? CHECKEN
        this.moveLeft();
        }
    } 