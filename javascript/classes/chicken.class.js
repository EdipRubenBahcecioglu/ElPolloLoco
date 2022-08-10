class Chicken extends MoveableObject { // Die Classe Chicken übernimmt alle Schablonen der Classe MoveableObject

    y = 335;
    x = 80 + Math.random() * 500; // math.random ist immer zwischen 0 und 1 d.h. wir haben hier einen maximalen Zufallswert von 500 // Dadurch ist die x Achse immer zwischen 80 und 700
    height = 80;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];



    constructor(){ // Jede Classe hat ein Constructor. Innerhalb dieses Constructors werden die Sachen eingetragn, die sofort ausgeführt werden sollen
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.25; // Die Speedvariable aus der übergeordneten Klaasse ist hier bei jedem Chicken unterschiedlich also mindestens 0.15 + max 0.25 drauf = max Speed 0.40
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() =>{
            let i = this.currentImage % this.IMAGES_WALKING.length // % bedeutet -> i = 0, dann 1, dann 2, dann 3, dann 4, dann 5 und dann weil es keine weitern Bilder gibt, starten wir wieder bei 0 d.h. % ist eine verkürzte if Abfrage
            let path = this.IMAGES_WALKING[i]; // path = erstes Bild aus dem Array aus Zeile 8
            this.img = this.imageCache[path]; // Das Bild aus der übergeordneten Klasse wird mit dem geladenem Bild aus Zeile 28 ersetzt
            this.currentImage++; // Anschließend wird das nächste Bild geladen, indem mann die Variable currentImage um 1 erhöht
        }, 150); // Bilder ändern sich jede 150 Milisekunden
    }
}

