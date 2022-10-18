class Chicken extends MoveableObject { // Die Classe Chicken übernimmt alle Schablonen der Classe MoveableObject

    y = 335;
    x = 150 + Math.random() * 2500; // math.random ist immer zwischen 0 und 1 d.h. wir haben hier einen maximalen Zufallswert von 500 // Dadurch ist die x Achse immer zwischen 80 und 700
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
        setInterval(() =>{ // Mithilfe von setInterval können wir eine Funktion zich mal die Sekunde aufrufen
            this.moveLeft();
        }, 1000 / 60); // 1000: 60 = 60 FPS

        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        }, 200); // Bilder ändern sich jede 200 Milisekunden
    }
}