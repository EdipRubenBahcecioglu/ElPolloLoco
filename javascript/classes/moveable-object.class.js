class MoveableObject extends DrawableObject { 
    speed = 0.15;
    speedY = 0; 
    speedX = 0;
    acceleration = 2.5; 
    energyChar = 100; 
    energyBoss = 100;
    lastHit = 0; 
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
    applyGravity() { 
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { 
                this.y -= this.speedY; 
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
            return this.y <= 170; 
        }
    }

    /**
     * This function checks if our object hits the ground
     * 
     * @returns true when our object hits the ground
     */
    objectHitGround() {
        if (this.y > 340) { 
            return true;
        }
        return false;
    }

    /**
     * This function lets the object move right
     * 
     */
    moveRight() {
        this.x += this.speed; 
    }

    /**
     * This function lets the object move left
     * 
     */
    moveLeft() {
        this.x -= this.speed; 
    }

    /**
     * This funcion lets the object sprint left
     * 
     */
    sprintLeft() {
        this.x -= 50.00; 
    }

    /**
     * This function lets the object sprint right
     * 
     */
    sprintRight() {
        this.x += 50.00; 
    }

    /**
     * This function lets the object jump
     * 
     */
    jump() {
        this.speedY = 30; 
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
        let i = this.currentImage % images.length 
        let path = images[i]; 
        this.img = this.imageCache[path]; 
        this.currentImage++; 
    }

    /**
     * This function checks if an object collides with another object based on coordinates and image size
     * 
     * @param {object} mo - moveable object  
     * @returns true in case of collision
     */
    isColliding(mo) {     
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; 
    }

    /**
     * This function checks which object has been collected and adjusts the variables accordingly
     * 
     * @param {string} collectedObject - which object gets collected 
     */
    collect(collectedObject) {
        if (collectedObject == 'coin') {
            this.updateCoinStatusbar();
        }
        if (collectedObject == 'bottle') {
            this.updateBottleStatusbar();
        }
        if (collectedObject == 'heart') {
            this.updateCharEnergyStatusbar();
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
        }
        if (hittenObject == 'boss') {
            this.bossGettingDamaged(takenDamage);
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
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * This function checks when the last movement took place
     * 
     * @param {number} minTimepassed - min timepassed in seconds
     * @param {number} maxTimepassed - max timepassed in seconds
     * @returns true when the last movement ist between minTimepassed and maxTimepassed
     */
    isSleeping(minTimepassed, maxTimepassed) {
        let timepassed = new Date().getTime() - this.lastMovement; 
        timepassed = timepassed / 1000; 
        return timepassed >= minTimepassed && timepassed < maxTimepassed;
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
}