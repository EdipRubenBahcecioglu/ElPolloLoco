class World {
    character = new Character();
    level = level1;
    ctx; // Innerhalb des Speilfelds legen wir in Zeile 22 fest, dass im 2D Format gespielt wird
    canvas; // = Spielfeld
    keyboard; // Spieltasten
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
        this.ctx = canvas.getContext('2d'); // Mithilfe von getContext haben wir die Möglichkeit innerhlab des Canvas ein 2D Format darstellen zu lassen bzw. zu zeichnen
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.throwBottle();
        this.stickStatusBarBossToEndboss();
        this.pushAudiosToArray();
        this.controllAudioVolume();
        this.checkBonusBottles();
    }

    /**
     * This function lets the character have access to the whole world object 
     * 
     */

    setWorld() {
        this.character.world = this; // This steht hier alleine d.h. dass die Variable world in der Char Klasse kann auf alle Variablen in der World Klasse zugreifen
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
     * This function checks if the character can get the bonus bottles after killing all normal enemys. Also the suitable sound is playing and variables getting updated. 
     * 
     */

    checkBonusBottles() { // Audio Sound Einfügen
        setInterval(() => {
            if (this.level.enemies.length == 0 && this.character.reachedBonus == false) {
                this.character.collectedBottles = this.character.collectedBottles + 3;
                if(this.character.collectedBottles > 5){
                    this.character.collectedBottles = 5;
                    this.statusBarBottle.setBottles(this.character.collectedBottles);
                }
                this.character.reachedBonus = true;
                this.bonusBottlesSound.play();
            }
        }, 1000 / 60);
    }

    /**
     * This function draws all object to map
     * 
     */

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Diese Funktion löscht Quasi den Inhalt des Canvas bevor er neu in Zeile 18 gezeichnet wird // Erste Parameter = X Achse, Zweite Parameter = Y Achse, Dritte Parameter Spielfeldbreite, Vierte Parameter = Spielfeldhöhe
        this.ctx.translate(this.camera_x, 0);
        this.drawMapBackground();
        this.ctx.translate(-this.camera_x, 0); // Wir setzten die Koordinaten für die nachfolgende Zeile fest, d.h. diese bewegt sich beim Charmoven mit und ist nicht an den bewegendem Maphintergrund fixiert // Kurz gefasst ... fixierte Objekte
        this.drawStickyBars();
        this.ctx.translate(this.camera_x, 0); // Die Koordinaten werden wieder freigegeben d.h. die nachfolgenden Objekte und Hintergründe ändern sich wenn der Char sich bewegt
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
        requestAnimationFrame(function () { // Mithilfe dieser Funktion wird die draw Funktion, sobald die einmal geladen wurde, zich mal pro Sekunde ausgeführt
            self.draw(); // Die Funktion requestAnimationFrame kennt das Programmierwort "this" nicht, daher müssen wir hier einen kleinen Umweg gehen und das Wort this in einer Variable festlegen
        });
    }

    /**
     * This function draws the background of map
     * 
     */

    drawMapBackground() {
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds); // Wir geben den Inhalt aus dem Array Zeile 13/14/15... an die Funktion weiter
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

    addObjectsToMap(objects) { // Object = Arrayinhalt aus Zeile 30 z.B. 
        objects.forEach(object => { // For Each ist eine Art For Schleife // Die Funktion addObjectsToMap wird so oft ausgeführt bis jedes einzelne Element aus dem Array ausgelesen wurde
            this.addToMap(object); // Wir geben den Parameter (Inhalt vom Array) an die nächste Funktion weiter
        });
    }

    /**
     * This function checks if an object should be flipped to the other direction
     * 
     * @param {object} mo - moveable object  
     */

    addToMap(mo) { // mo = Movable Objekt // Parameter aus Zeile 44
        if (mo.otherDirection) { // Wenn OtherDirection eine andere Richtung hat..
            this.flipImage(mo); // Zeile 59
        }
        mo.draw(this.ctx); // Funktion in der Klasse moveableObkekt wird ausgeführt und wir geben unser Spielfeld rein als Parameter
        mo.drawBorder(this.ctx); // Funktion in der Klasse moveableObkekt wird ausgeführt und wir geben unser Spielfeld rein als Parameter
        if (mo.otherDirection) { // Ab Zeile 64 bis 66 wird die Spiegelung wieder zurückgesetzt 
            this.flipImageBack(mo); // Zeile 66
        }
    }

    /**
     * This function flips the object to the other direction 
     * 
     * @param {object} mo - moveable object 
     */

    flipImage(mo) {
        this.ctx.save(); // Dann soll der aktuelle Context gespeichert wernden..
        this.ctx.translate(mo.width, 0); // Coce ab hier bis Zeile 61 spiegeln wir das Bild // Bild wird spiegelverkehrt eingefügt
        this.ctx.scale(-1, 1); // Wenn wir das Bild drehen, steht das Bild vom Objekt auf der X Achse etwas anders, daher positioniern wir hier das Bild wieder da wo es war
        mo.x = mo.x * -1; // X Koordinate wird umgedreht // Siehe Kommentar Zeile 60
    }

    /**
     * This function flips the object back to default
     * 
     * @param {object} mo - moveable object  
     */

    flipImageBack(mo) {
        mo.x = mo.x * -1; // X Koordinate wird umgedreht 
        this.ctx.restore(); // Die Spiegelung wird wieder zurückgesetzt
    }
}