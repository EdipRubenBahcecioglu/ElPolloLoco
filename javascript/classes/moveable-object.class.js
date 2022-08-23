class MoveableObject extends DrawableObject { // Class = Eine Schablone, die uns verrät welche Felder bzw. Variablen enthalen sein sollen
    speed = 0.15;
    speedY = 0; // Wie schnell fällt unser Objekt nach unten/oben
    acceleration = 2.5; // Wie schnell wird unser Obkejt beschleunigt z.B. wenn Char 1 sek in der Luft ist fällt er langsamer als wenn er 3 sek in der Luft ist
    energy = 100; // Leben vom Objekt z.B. Char und Chicken
    lastHit = 0; // Zeitpunkt, 

    applyGravity() { // Funktion wenn ein Objekt fällt z.B. beim Sprung
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { // Wenn unser Objekt über dem Boden ist
                this.y -= this.speedY; //... dann soll die Y Achse verringert werden
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 170; // Unsere Bodenhöhe hat 160 px d.h. unser Objekt soll nicht weiter fallen als die Bodenhöhe // 160
    }

moveRight() {
    this.x += this.speed; // Wenn Rechte Pfeiltaste betätigt wurde, soll die X Achse um die Speedvariable erhöht werden
}

moveLeft() {
        this.x -= this.speed; // Wenn linke Pfeiltaste betätigt wurde, soll die Y Achse um die Speedvariable verringert werden
}

playAnimation(images) {
    let i = this.currentImage % images.length // % bedeutet -> i = 0, dann 1, dann 2, dann 3, dann 4, dann 5 und dann weil es keine weitern Bilder gibt, starten wir wieder bei 0 d.h. % ist eine verkürzte if Abfrage
    let path = images[i]; // path = erstes Bild aus dem Array aus Zeile 8
    this.img = this.imageCache[path]; // Das Bild aus der übergeordneten Klasse wird mit dem geladenem Bild aus Zeile 28 ersetzt
    this.currentImage++; // Anschließend wird das nächste Bild geladen, indem mann die Variable currentImage um 1 erhöht
}

jump(){
    this.speedY = 30; // soll das Objekt in der Y Achse nach oben springen mit einer Anfangsgeschwindigkeit von 30 
}

// isColliding(z.B. Chicken), diese Funktion zeigt uns, ob ein Objekt mit einem anderen Objekt auf der Achse kolidiert 
isColliding(mo){
    return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
}

hit(){
    this.energy -= 5; // Wenn das Objekt mit etwas anderem kollidiert, wird vom Energy 5 Leben abgezogen
    if(this.energy < 0){
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime(); // Das ist der Zeitpunk in Milisek seit dem 1.1.1970, wir benutzen diesen Zeitpunk einfach nur um eine Rechengrundlage zu haben
    }
}

isHurt(){
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in Milisek // Ergebnis hier ca 1660949840826
    //console.log(timepassed);
    timepassed = timepassed / 1000; // Differenz in Sekunden // Ergebnis hier ca 1660949864
    //console.log(timepassed);
    return timepassed < 1; // Jede Sekunde nachdem der Char von einem Objekt berührt wurde, hört die Imagehurt-Animation auf
}

isDead(){
     return this.energy == 0;
}
}