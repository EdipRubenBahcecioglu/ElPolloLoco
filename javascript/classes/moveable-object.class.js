class MoveableObject extends DrawableObject { // Class = Eine Schablone, die uns verrät welche Felder bzw. Variablen enthalen sein sollen
    speed = 0.15;
    speedY = 0; // Wie schnell fällt unser Objekt nach unten/oben
    speedX = 0;
    acceleration = 2.5; // Wie schnell wird unser Obkejt beschleunigt z.B. wenn Char 1 sek in der Luft ist fällt er langsamer als wenn er 3 sek in der Luft ist
    energyChar = 100; // Leben vom Objekt z.B. Char und Chicken
    energyBoss = 100;
    lastHit = 0; // Zeitpunkt,
    lastMovement = 0;
    otherDirection = false;
    collectedCoins = 0;
    collectedBottles = 0;
    isAttacked = false;
    isAttacking = false;
    bossHurt = false;
    haveVision = false;
    wantToAttack = false;

    /**
     * Using offset we can define a collision between several objects much more precisely 
     * 
     */

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * This function chekcs if the object is above ground and if object is falling. When object is falling the y coordinate is getting lower.
     * 
     * 
     */

    applyGravity() { // Funktion wenn ein Objekt fällt z.B. beim Sprung
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { // Wenn unser Objekt über dem Boden ist
                this.y -= this.speedY; //... dann soll die Y Achse verringert werden
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * This function checks if our object is above the ground
     * 
     * @returns true when our object is above ground
     */

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y <= 170; // Unsere Bodenhöhe hat 160 px d.h. unser Objekt soll nicht weiter fallen als die Bodenhöhe // 160
        }
    }

    /**
     * This function checks if our object hits the ground
     * 
     * @returns true when our object hits the ground
     */

    objectHitGround() {
        if (this.y > 340) { // 350 war vorher
            return true;
        }
        return false;
    }

    /**
     * This function lets the object move right
     * 
     */

    moveRight() {
        this.x += this.speed; // Wenn Rechte Pfeiltaste betätigt wurde, soll die X Achse um die Speedvariable erhöht werden
    }

    /**
     * This function lets the object move left
     * 
     */

    moveLeft() {
        this.x -= this.speed; // Wenn linke Pfeiltaste betätigt wurde, soll die Y Achse um die Speedvariable verringert werden
    }

    /**
     * This funcion lets the object sprint left
     * 
     */

    sprintLeft() {
        this.x -= 25.00; // Wenn linke Pfeiltaste betätigt wurde, soll die Y Achse um die Speedvariable verringert werden
    }

    /**
     * This function lets the object sprint right
     * 
     */

    sprintRight() {
        this.x += 25.00; // Wenn Rechte Pfeiltaste betätigt wurde, soll die X Achse um die Speedvariable erhöht werden
    }

    /**
     * This function lets the object jump
     * 
     */

    jump() {
        this.speedY = 30; // soll das Objekt in der Y Achse nach oben springen mit einer Anfangsgeschwindigkeit von 30
    }

    /**
     * If object died the y coordinate will rise and object will leave map from botside 
     * 
     */

    leaveMap() {
        this.y += 10.0;
    }

    /**
     * This function iterates through an array of image paths and repeats this process
     * 
     * @param {array} images - array of image paths 
     */

    playAnimation(images) {
        let i = this.currentImage % images.length // % bedeutet -> i = 0, dann 1, dann 2, dann 3, dann 4, dann 5 und dann weil es keine weitern Bilder gibt, starten wir wieder bei 0 d.h. % ist eine verkürzte if Abfrage
        let path = images[i]; // path = erstes Bild aus dem Array aus Zeile 8
        this.img = this.imageCache[path]; // Das Bild aus der übergeordneten Klasse wird mit dem geladenem Bild aus Zeile 28 ersetzt
        this.currentImage++; // Anschließend wird das nächste Bild geladen, indem mann die Variable currentImage um 1 erhöht
    }

    /**
     * This function checks if an object collides with another object based on coordinates and image size
     * 
     * @param {object} mo - moveable object  
     * @returns true in case of collision
     */

    isColliding(mo) {     // isColliding(z.B. Chicken), diese Funktion zeigt uns, ob ein Objekt mit einem anderen Objekt auf der Achse kolidiert 
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // Kollidierung von Rechts nach Links
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Kollidierung von Oben nach Unten
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Kollidierung von Links nach Rechts
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // Kollidierung von Unten nach Oben
    }

    /**
     * This function checks which object has been collected and adjusts the variables accordingly
     * 
     * @param {string} collectedObject - which object gets collected 
     */

    collect(collectedObject) {
        if (collectedObject == 'coin') {
            this.updateCoinStatusbar();
            // this.updateStatusbarVariables(this.collectedCoins, 100, 10);
        }
        if (collectedObject == 'bottle') {
            this.updateBottleStatusbar();
            // this.updateStatusbarVariables(this.collectedBottles, 5, 1);
        }
        if (collectedObject == 'heart') {
            this.updateCharEnergyStatusbar();
            // this.updateStatusbarVariables(this.energyChar, 100, 25);
        }
    }

    /**
     * This function updates the coin statusbar after picking up a coin
     * 
     */

    updateCoinStatusbar() {
        if (this.collectedCoins < 100) {
            this.collectedCoins += 10;
        }
    }

    /**
     * This function updates the bottle statusbar after picking up a bottle
     * 
     */

    updateBottleStatusbar() {
        if (this.collectedBottles < 5) {
            this.collectedBottles += 1;
        }
    }

    /**
     * This function updates the character health statusbar after picking up a hearth
     * 
     */

    updateCharEnergyStatusbar() {
        if (this.energyChar < 100) {
            this.energyChar += 25;
        }
    }

    /**
     * This function checks which object gets hitten and reduce the energy by damage
     * 
     * @param {number} takenDamage 
     * @param {string} hittenObject 
     */

    hit(takenDamage, hittenObject) {
        if (hittenObject == 'character') {
            this.characterGettingDamaged(takenDamage);
            // this.objectGettingDamaged(takenDamage, this.energyChar);
        }
        if (hittenObject == 'boss') {
            this.bossGettingDamaged(takenDamage);
            // this.objectGettingDamaged(takenDamage, this.energyBoss);
        }
    }

    /**
     * This function reduce the energy of character by damage
     * 
     */

    characterGettingDamaged(takenDamage) {
        this.energyChar -= takenDamage;
        if (this.energyChar < 0) {
            this.energyChar = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function reduce the energy of boss by damage
     * 
     */

    bossGettingDamaged(takenDamage) {
        this.energyBoss -= takenDamage;
        if (this.energyBoss < 0) {
            this.energyBoss = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function checks if a collision has occurred in the past second
     * 
     * @returns true if a collision has occurred in the past second
     */

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Milisek // Ergebnis hier ca 1660949840826
        timepassed = timepassed / 1000; // Differenz in Sekunden // Ergebnis hier ca 1660949864
        return timepassed < 1; // Jede Sekunde nachdem der Char von einem Objekt berührt wurde, hört die Imagehurt-Animation auf
    }

    /**
     * This function checks when the last movement took place
     * 
     * @param {number} minTimepassed - min timepassed in seconds
     * @param {number} maxTimepassed - max timepassed in seconds
     * @returns true when the last movement ist between minTimepassed and maxTimepassed
     */

    isSleeping(minTimepassed, maxTimepassed) {
        let timepassed = new Date().getTime() - this.lastMovement; // Timepassed hier in Milisek.
        timepassed = timepassed / 1000; // Timepassed hier in Sek
        return timepassed >= minTimepassed && timepassed < maxTimepassed; // Wenn z.B. timepassed >= 2 Sek ist && timepassed < 4 Sek sind, dann wird true an die Funktion isSleeping returned
    }

    /**
     * This function returns an 0 of object energy 
     * 
     * @param {string} object - object which is dead 
     * @returns energy 0 of the object
     */

    isDead(object) {
        if (object == 'character') {
            return this.energyChar == 0;
        }
        if (object == 'boss') {
            return this.energyBoss == 0;
        }
    }

    /**
     * This function checks if an object gets attacked and returns true
     * 
     * @returns true if an object gets attacked
     */

    getAttacked() {
        if (this.isAttacked) {
            return true;
        }
    }

    // /**                                                                                  LEIDER NICHT FUNKTIONIERT (Zeile 163)
    // * This function changes the variables as soon as the character collects objects
    // * 
    // * @param {string} collectedObjekt - One of the three variables that influence the status bars  
    // * @param {number} maxAmount - max amount of the statusbar
    // * @param {number} riseAmount -  statusbar rise amount if something getting collected
    // */

    // updateStatusbarVariables(collectedObjekt, maxAmount, riseAmount) {
    //     if (collectedObjekt < maxAmount) {
    //         collectedObjekt + riseAmount;
    //     }
    // }

    // /** ////                                                                              LEIDER NICHT FUNKTIONIERT (Zeile 218)
    // * This function reduces the life of an object by the Damage
    // * 
    // * @param {number} takenDamage - how much damge the object gonna get 
    // * @param {string} energyOfobject - which object gets damaged
    // */

    // objectGettingDamaged(takenDamage, energyOfobject) {
    //     energyOfobject -= takenDamage; // Wenn das Objekt mit etwas anderem kollidiert, wird vom Energy 5 Leben abgezogen
    //     if (energyOfobject < 0) {
    //         energyOfobject = 0;
    //     } else {
    //         this.lastHit = new Date().getTime(); // Das ist der Zeitpunk in Milisek seit dem 1.1.1970, wir benutzen diesen Zeitpunk einfach nur um eine Rechengrundlage zu haben
    //     }
    // }
}