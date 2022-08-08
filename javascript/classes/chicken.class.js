class Chicken extends MoveableObject { // Die Classe Chicken übernimmt alle Schablonen der Classe MoveableObject

    constructor(){ // Jede Classe hat ein Constructor. Innerhalb dieses Constructors werden die Sachen eingetragn, die sofort ausgeführt werden sollen
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        
        this.x = 80 + Math.random() * 200; // math.random ist immer zwischen 0 und 1 d.h. wir haben hier einen maximalen Zufallswert von 500 // Dadurch ist die x Achse immer zwischen 200 und 700
    } // Mit this.x greifen wir auf den X Wert der übergeordneten Classe zu 
}