class MoveableObject extends DrawableObject { // Class = Eine Schablone, die uns verrät welche Felder bzw. Variablen enthalen sein sollen
    speed = 0.15;
    speedY = 0; // Wie schnell fällt unser Objekt nach unten/oben
    speedX = 0;
    acceleration = 2.5; // Wie schnell wird unser Obkejt beschleunigt z.B. wenn Char 1 sek in der Luft ist fällt er langsamer als wenn er 3 sek in der Luft ist
    energyChar = 100; // Leben vom Objekt z.B. Char und Chicken
    lastHit = 0; // Zeitpunkt,
    otherDirection = false;
    collectedCoins = 0;
    collectedBottles = 0;
    jumpOnEnemy = false;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    applyGravity() { // Funktion wenn ein Objekt fällt z.B. beim Sprung
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { // Wenn unser Objekt über dem Boden ist
                this.y -= this.speedY; //... dann soll die Y Achse verringert werden
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 170; // Unsere Bodenhöhe hat 160 px d.h. unser Objekt soll nicht weiter fallen als die Bodenhöhe // 160
        }
    }

    objectHitGround(){
        if(this.y > 350){
            return true;
        }
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

    jump() {
        this.speedY = 30; // soll das Objekt in der Y Achse nach oben springen mit einer Anfangsgeschwindigkeit von 30
    }

    // isColliding(z.B. Chicken), diese Funktion zeigt uns, ob ein Objekt mit einem anderen Objekt auf der Achse kolidiert 
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // Kollidierung von Rechts nach Links
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Kollidierung von Oben nach Unten
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Kollidierung von Links nach Rechts
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // Kollidierung von Unten nach Oben
    }

    isCollidingFromTop(mo){
        return this.y <  mo.y + mo.height; // Kollidierung von Oben nach Unten 170 + 250 - 30 (390) > 170
            // this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // Kollidierung von Rechts nach Links 10 + 100 - 20 (100) > 400
            // this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Kollidierung von Links nach Rechts 10 + 40 (50) < 400 + 50 (450)
            // this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // Kollidierung von Unten nach Oben 170 + 110 (280) < 170 + 80 (250)
    }

    // 140 < 90

    collect(collectedObject) {
        if (collectedObject == 'coin') {
            if (this.collectedCoins < 100) { 
                this.collectedCoins += 10;
            }
        }
        if (collectedObject == 'bottle') {
            if (this.collectedBottles < 5) {
                this.collectedBottles += 1;
            }
        }
        if (collectedObject == 'heart') {
            if (this.energyChar < 100) {
                this.energyChar += 25;
            }
        }
    }

    hit() {
        this.energyChar -= 5; // Wenn das Objekt mit etwas anderem kollidiert, wird vom Energy 5 Leben abgezogen
        if (this.energyChar < 0) {
            this.energyChar = 0;
        } else {
            this.lastHit = new Date().getTime(); // Das ist der Zeitpunk in Milisek seit dem 1.1.1970, wir benutzen diesen Zeitpunk einfach nur um eine Rechengrundlage zu haben
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Milisek // Ergebnis hier ca 1660949840826
        //console.log(timepassed);
        timepassed = timepassed / 1000; // Differenz in Sekunden // Ergebnis hier ca 1660949864
        //console.log(timepassed);
        return timepassed < 1; // Jede Sekunde nachdem der Char von einem Objekt berührt wurde, hört die Imagehurt-Animation auf
    }

    isDead() {
        return this.energyChar == 0;
    }

    getJumped(){
        if(this.jumpOnEnemy){
            return true;
        }
    }
}