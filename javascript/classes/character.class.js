class Character extends MoveableObject {

    height = 250;
    width = 100;
    x = 10;
    y = 170;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor(){
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png'); // Super kann 1x im Constructor verwendet werden, dannach nur noch this. (Wie Zeile 10)
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        setInterval(() =>{
            let i = this.currentImage % this.IMAGES_WALKING.length // % bedeutet -> i = 0, dann 1, dann 2, dann 3, dann 4, dann 5 und dann weil es keine weitern Bilder gibt, starten wir wieder bei 0 d.h. % ist eine verkürzte if Abfrage
            let path = this.IMAGES_WALKING[i]; // path = erstes Bild aus dem Array aus Zeile 8
            this.img = this.imageCache[path]; // Das Bild aus der übergeordneten Klasse wird mit dem geladenem Bild aus Zeile 28 ersetzt
            this.currentImage++; // Anschließend wird das nächste Bild geladen, indem mann die Variable currentImage um 1 erhöht
        }, 150); // Bilder ändern sich jede 150 Milisekunden
    }

    jump(){
    }
}