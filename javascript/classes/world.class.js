class World {
    character = new Character();
    level = level1;
    ctx; 
    canvas; 
    keyboard; 
    camera_x = 0;
    statusBarHealth = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarBoss(this.level.bosses[0].x, this.level.bosses[0].y);
    throwableObject = [];
    coinCollectSound = new Audio('audio/coin_collect2.mp3');
    bottleCollectSound = new Audio('audio/collect_bottle.mp3');
    bottleThrowSound = new Audio('audio/bottle_throw.mp3');
    bottleSplashSound = new Audio('audio/bottle_broke.mp3');
    throwSuccesSound = new Audio('audio/arriba.mp3');
    heartCollectSound = new Audio('audio/collect_heart.mp3');
    backgroundMusic = new Audio('audio/bg_music.mp3');
    gameWonSound = new Audio('audio/game_won_sound.mp3');
    gameLoseSound = new Audio('audio/game_lose_sound.mp3');
    bonusBottlesSound = new Audio('audio/bonus_bottle_sound.mp3');
    allAudioSounds = [];
    deadEnemys = 0;

    /**
     * Functions within the constructor are executed immediately
     * The canvasobject is drawn in 2d
     * 
     * @param {object} canvas - canvasobject
     * @param {object} keyboard - keyboardobject
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.throwBottle();
        this.stickStatusBarBossToEndboss();
        this.pushAudiosToArray();
        this.controllAudioVolume();
        this.checkBossPassCharacter();
    }

    /**
     * This function lets the character have access to the whole world object 
     * 
     */
    setWorld() {
        this.character.world = this; 
    }

    /**
     * This function push all available audios to an array
     * 
     */
    pushAudiosToArray() {
        this.allAudioSounds.push(this.coinCollectSound);
        this.allAudioSounds.push(this.bottleCollectSound);
        this.allAudioSounds.push(this.bottleThrowSound);
        this.allAudioSounds.push(this.bottleSplashSound);
        this.allAudioSounds.push(this.character.charHurtSound);
        this.allAudioSounds.push(this.throwSuccesSound);
        this.allAudioSounds.push(this.heartCollectSound);
        this.allAudioSounds.push(this.character.enterDangerZoneSound);
        this.allAudioSounds.push(this.character.charJumpSound);
        this.allAudioSounds.push(this.character.charSleepSound);
        this.allAudioSounds.push(this.backgroundMusic);
        this.allAudioSounds.push(this.gameLoseSound);
        this.allAudioSounds.push(this.gameWonSound);
        this.allAudioSounds.push(this.bonusBottlesSound);
    }

    /**
     * This function contolls the audio volume of all audios 
     * 
     */
    controllAudioVolume() {
        this.allAudioSounds.forEach((audio) => {
            audio.volume = 0.10;
        })
    }

    /**
     * This function clears the character object
     * 
     */
    clearCharacter() {
        this.character = [];
    }

    /**
     * This function checks if bottle is throwable and creates an throwable object and set the throw direction
     * 
     */
    throwBottle() {
        setInterval(() => {
            if (this.bottleIsThrowable()) {
                if (this.character.otherDirection == false) {
                    this.createNewThrowableObject(70, 100, 'right');
                } else {
                    this.createNewThrowableObject(30, 100, 'left');
                }
                this.updateThrowBottleVariablesAndSounds();
            }
        }, 100);
    }

    /**
     * This function checks if an bottle is throwable
     * 
     * @returns true when an bottle is throwable
     */
    bottleIsThrowable() {
        return this.character.collectedBottles > 0 && this.keyboard.attack && this.character.isAttacking == false
    }

    /**
     * This function plays sounds and update variables after a bottle throw
     * 
     */
    updateThrowBottleVariablesAndSounds() {
        this.bottleThrowSound.play();
        this.character.isAttacking = true;
        this.updateBottleStatusBar();
        this.character.lastMovement = new Date().getTime();
    }

    /**
     * This function updates the collected bottle variable after a bottle is thrown. Also the bottle statusbar is getting updated.
     * 
     */
    updateBottleStatusBar() {
        this.character.collectedBottles--;
        this.statusBarBottle.setBottles(this.character.collectedBottles);
    }

    /**
     * This function creates an throwable object and checks the fly direction
     * 
     * @param {number} bottleX - bottle x coordinate 
     * @param {number} bottleY - bottle y coordinate
     * @param {string} throwDirection - right or left 
     */
    createNewThrowableObject(bottleX, bottleY, throwDirection) {
        if (throwDirection == 'right') {
            let bottle = new ThrowableObject(this.character.x + bottleX, this.character.y + bottleY);
            this.throwableObject.push(bottle);
            bottle.bottleFlyDirection = 'right';
        }
        if (throwDirection == 'left') {
            let bottle = new ThrowableObject(this.character.x - bottleX, this.character.y + bottleY);
            bottle.bottleFlyDirection = 'left';
            this.throwableObject.push(bottle);
        }
    }

    /**
    * This function checks if boss passed character and update variables
    * 
    */
    checkBossPassCharacter() {
        setInterval(() => {
            let endboss = this.level.bosses[0];
            if (endboss.x < this.character.x) {
                endboss.otherDirection = true;
                this.character.passedBoss = true;
        } else {
                endboss.otherDirection = false;
                this.character.passedBoss = false;
            }
        }, 1000 / 60);
    }

    /**
     * This function sticks the endboss statusbar to the endboss
     * 
     */
    stickStatusBarBossToEndboss() {
        let statusbarBoss = this.statusBarEndboss;
        setInterval(() => {
            statusbarBoss.x = this.level.bosses[0].x;
            statusbarBoss.y = this.level.bosses[0].y;
        }, 1000 / 60);
    }

    /**
     * This function draws all object to map
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.ctx.translate(this.camera_x, 0);
        this.drawMapBackground();
        this.ctx.translate(-this.camera_x, 0); 
        this.drawStickyBars();
        this.ctx.translate(this.camera_x, 0); 
        this.drawMoveableCollectableThrowableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.repeatDrawFunction();
    }

    /**
     * This function repeats the draw function
     * 
     */
    repeatDrawFunction() {
        let self = this;
        requestAnimationFrame(function () { 
            self.draw(); 
        });
    }

    /**
     * This function draws the background of map
     * 
     */
    drawMapBackground() {
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds); 
    }

    /**
     * This function draws all sticky elements
     * 
     */
    drawStickyBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
    }

    /**
     * This function draws all collectable, moveable and throwable objects
     * 
     */
    drawMoveableCollectableThrowableObjects() {
        this.addToMap(this.statusBarEndboss);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bosses);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.heart);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
    }

    /**
     * This function add objects to map
     * 
     * @param {object} objects - which element is getting to draw 
     */
    addObjectsToMap(objects) { 
        objects.forEach(object => { 
            this.addToMap(object); 
        });
    }

    /**
     * This function checks if an object should be flipped to the other direction
     * 
     * @param {object} mo - moveable object  
     */
    addToMap(mo) { 
        if (mo.otherDirection) { 
            this.flipImage(mo); 
        }
        mo.draw(this.ctx); 
        mo.drawBorder(this.ctx); 
        if (mo.otherDirection) { 
            this.flipImageBack(mo); 
        }
    }

    /**
     * This function flips the object to the other direction 
     * 
     * @param {object} mo - moveable object 
     */
    flipImage(mo) {
        this.ctx.save(); 
        this.ctx.translate(mo.width, 0); 
        this.ctx.scale(-1, 1); 
        mo.x = mo.x * -1; 
    }

    /**
     * This function flips the object back to default
     * 
     * @param {object} mo - moveable object  
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1; 
        this.ctx.restore(); 
    }
}