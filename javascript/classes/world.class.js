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
    charHurtSound = new Audio('audio/char_hurt.mp3');
    throwSuccesSound = new Audio('audio/arriba.mp3');
    heartCollectSound = new Audio('audio/collect_heart.mp3');
    enterDangerZoneSound = new Audio('audio/danger_zone.mp3');
    allAudioSounds = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Mithilfe von getContext haben wir die Möglichkeit innerhlab des Canvas ein 2D Format darstellen zu lassen bzw. zu zeichnen
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkAllCollisions();
        this.throwBottle();
        this.removeObject();
        this.checkCharacterinDangerZone();
        this.stickStatusBarBossToEndboss();
        this.pushAudiosToArray();
        this.controllAudioVolume();
    }

    checkAllCollisions() {
        this.checkEnemyCollisions();
        this.checkBossCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkHeartCollisions();
        this.checkCollisionsFromTop();
        this.checkBottleHitEnemy();
        this.checkBottleHitEndboss();
        this.checkCharacterMiss();
        this.checkBossPassCharacter();
    }

    setWorld() {
        this.character.world = this; // This steht hier alleine d.h. dass die Variable world in der Char Klasse kann auf alle Variablen in der World Klasse zugreifen
    }

    pushAudiosToArray(){
        this.allAudioSounds.push(this.coinCollectSound);
        this.allAudioSounds.push(this.bottleCollectSound);
        this.allAudioSounds.push(this.bottleThrowSound);
        this.allAudioSounds.push(this.bottleSplashSound);
        this.allAudioSounds.push(this.charHurtSound);
        this.allAudioSounds.push(this.throwSuccesSound);
        this.allAudioSounds.push(this.heartCollectSound);
        this.allAudioSounds.push(this.enterDangerZoneSound);
        this.allAudioSounds.push(this.character.charJumpSound);
        this.allAudioSounds.push(this.character.charSleepSound);
        // this.allAudioSounds.push(this.backgroundMusic);
    }

    controllAudioVolume(){
        this.allAudioSounds.forEach((audio) =>{
            audio.volume = 0.03;
        })
    }

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

    bottleIsThrowable(){
        return this.character.collectedBottles > 0 && this.keyboard.attack && this.character.isAttacking == false
    }

    updateThrowBottleVariablesAndSounds(){
        this.bottleThrowSound.play();
        this.character.isAttacking = true;
        this.updateBottleStatusBar();
        this.character.lastMovement = new Date().getTime();
    }

    updateCharacterVariablesAndSounds(enemy){
        this.throwSuccesSound.play();
        enemy.isAttacked = true;
        this.character.speedY += 25;
        this.character.y = 150;
        this.character.isAttacking = false;
    }

    updateBottleStatusBar() {
        this.character.collectedBottles--;
        this.statusBarBottle.setBottles(this.character.collectedBottles);
    }

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

    checkCharacterMiss() {
        setInterval(() => {
            for (let x = 0; x < this.throwableObject.length; x++) {
                const missedBottle = this.throwableObject[x];
                if (missedBottle.objectHitGround()) {
                    this.removeObject(x, missedBottle, 'bottle', 300);
                    this.bottleSplashSound.play();
                }
            }
        }, 1000 / 60);
    }

    checkEnemyCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => { // Für jedes Element aus dem Arrayinhalt Enemy aus level1.js wird geprüft...
                if (this.characterCanBeHurt(enemy)) {
                    this.charHurtSound.play();
                    this.character.hit('5', 'character');
                    this.statusBarHealth.setPercentage(this.character.energyChar); // Wenn under Char gehittet wird, dann aktualisieren wir die Statusbar, indem wir dem Lebensparameter an die Funktion setPercentage aus der Klasse Statusbar übergeben
                }
            })
        }, 200);
    }

    characterCanBeHurt(enemy){
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isAttacked;
    }

    checkBossCollisions() {
        setInterval(() => {
            this.level.bosses.forEach((endboss) => { // Für jedes Element aus dem Arrayinhalt Enemy aus level1.js wird geprüft...
                if (this.character.isColliding(endboss)) {
                    this.charHurtSound.play();
                    this.character.hit('10', 'character');
                    this.statusBarHealth.setPercentage(this.character.energyChar); // Wenn under Char gehittet wird, dann aktualisieren wir die Statusbar, indem wir dem Lebensparameter an die Funktion setPercentage aus der Klasse Statusbar übergeben
                }
            })
        }, 200);
    }

    checkCollisionsFromTop() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.characterJumpedOnEnemy(enemy)) {
                    this.updateCharacterVariablesAndSounds(enemy);
                    this.removeObject(index, enemy, 'enemy', 400);
                }
            });
        }, 1000 / 60);
    }

    characterJumpedOnEnemy(enemy){
        return this.character.isColliding(enemy) && !enemy.isDead() && this.character.isAboveGround() && this.character.speedY <= 0
    }

    checkCoinCollisions() {
        setInterval(() => {
            this.level.coin.forEach((coin, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                if (this.character.isColliding(coin)) {
                    this.objectGettingCollected('coin' , index, level1.coin, this.coinCollectSound);
                }
            })
        }, 50);
    }

    checkBottleCollisions() {
        setInterval(() => {
            if (this.character.collectedBottles < 5) {
                this.level.bottle.forEach((bottle, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                    if (this.character.isColliding(bottle)) {
                        this.objectGettingCollected('bottle' , index, level1.bottle, this.bottleCollectSound);
                    }
                })
            }
        }, 50);
    }

    checkHeartCollisions() {
        setInterval(() => {
            if (this.character.energyChar < 100) {
                this.level.heart.forEach((heart, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                    if (this.character.isColliding(heart)) {
                        this.objectGettingCollected('heart' , index, level1.heart, this.heartCollectSound);
                    }
                })
            }
        }, 50);
    }

    objectGettingCollected(collectedObject, indexOfObject, objectInLevel, collectSound){
        this.character.collect(collectedObject);
        collectSound.play();
        objectInLevel.splice(indexOfObject, 1);
        if(collectedObject == 'coin'){
            this.statusBarCoin.setCoins(this.character.collectedCoins);
        } else if(collectedObject == 'bottle'){
            this.statusBarBottle.setBottles(this.character.collectedBottles);
        } else if(collectedObject == 'heart'){
            this.statusBarHealth.setPercentage(this.character.energyChar);
        }
    }

    checkBottleHitEnemy() {
        setInterval(() => {
            if (this.throwableObject.length > 0) {
                this.level.enemies.forEach((enemie) => {
                    for (let b = 0; b < this.throwableObject.length; b++) {
                        let throwedBottle = this.throwableObject[b];
                        if (throwedBottle.isColliding(enemie)) {
                            this.throwSuccesSound.play();
                            enemie.isAttacked = true;
                        } else
                            if (throwedBottle.bottleSplashed) {
                                this.removeObject(b, throwedBottle, 'bottle', 300);
                                this.character.isAttacking = false;
                            }
                    }
                })
            }
        }, 1000 / 60); // 100
    }

    checkBottleHitEndboss() {
        setInterval(() => {
            if (this.throwableObject.length > 0) {
                this.level.bosses.forEach((boss) => {
                    if (boss.bossHurt == false) {
                        for (let x = 0; x < this.throwableObject.length; x++) {
                            const throwedBottle = this.throwableObject[x];
                            if (throwedBottle.isColliding(boss)) {
                                this.throwSuccesSound.play();
                                boss.bossHurt = true;
                                boss.hit('10', 'boss');
                                this.statusBarEndboss.setPercentage(boss.energyBoss, boss.x, boss.y);
                                throwedBottle.bottleGettingSplashed();
                                this.removeObject(x, throwedBottle, 'bottle', 75);
                            }
                            if (throwedBottle.bottleSplashed == true) {
                                setTimeout(() => {
                                    boss.bossHurt = false;
                                }, 350);
                                this.character.isAttacking = false;
                            }
                        }
                    }
                })
            }
        }, 1000 / 60);
    }

    removeObject(indexOfObject, object, array, timeoutTime) {
        if (array == 'bottle') {
            this.removeBottleObject(indexOfObject, object, timeoutTime);
        }
        if (array == 'enemy') {
            this.removeEnemyObject(indexOfObject, object, timeoutTime);
        }
    }

    removeBottleObject(indexOfObject, object, timeoutTime){
        setTimeout((() => {
            if (this.throwableObject[indexOfObject] === object) {
                this.throwableObject.splice(indexOfObject, 1);
            }
        }), timeoutTime);
    }

    removeEnemyObject(indexOfObject, object, timeoutTime){
        setTimeout((() => {
            if (this.level.enemies[indexOfObject] === object) {
                this.level.enemies.splice(indexOfObject, 1);
            }
        }), timeoutTime);
    }

    checkCharacterinDangerZone(){
        setInterval(()=>{
            let endboss = this.level.bosses[0];
            if(this.characterIsInDangerZone(endboss)){
                endboss.haveVision = true;
                this.statusBarEndboss.move = false;
                this.enterDangerZoneSound.play();
            } else{
                endboss.haveVision = false;
                this.statusBarEndboss.move = true;
            }
        }, 1000 / 60);
    }

    characterIsInDangerZone(endboss){
        return endboss.x - this.character.x < 500 && endboss.bossWillAttack == false || endboss.isDead('boss');
    }

    checkBossPassCharacter(){
        setInterval(()=>{
            let endboss = this.level.bosses[0];
            if(endboss.x < this.character.x){
                endboss.otherDirection = true;
                this.character.passedBoss = true;
            } else {
                endboss.otherDirection = false;
                this.character.passedBoss = false;
            }
        }, 1000 / 60);
    }

    stickStatusBarBossToEndboss(){
        let statusbarBoss = this.statusBarEndboss;
        setInterval(()=>{
            statusbarBoss.x = this.level.bosses[0].x;
            statusbarBoss.y = this.level.bosses[0].y;
        }, 1000 / 60);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Diese Funktion löscht Quasi den Inhalt des Canvas bevor er neu in Zeile 18 gezeichnet wird // Erste Parameter = X Achse, Zweite Parameter = Y Achse, Dritte Parameter Spielfeldbreite, Vierte Parameter = Spielfeldhöhe
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds); // Wir geben den Inhalt aus dem Array Zeile 13/14/15... an die Funktion weiter
        this.ctx.translate(-this.camera_x, 0); // Wir setzten die Koordinaten für die nachfolgende Zeile fest, d.h. diese bewegt sich beim Charmoven mit und ist nicht an den bewegendem Maphintergrund fixiert // Kurz gefasst ... fixierte Objekte
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0); // Die Koordinaten werden wieder freigegeben d.h. die nachfolgenden Objekte und Hintergründe ändern sich wenn der Char sich bewegt
        this.addToMap(this.statusBarEndboss); 
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bosses);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.heart);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () { // Mithilfe dieser Funktion wird die draw Funktion, sobald die einmal geladen wurde, zich mal pro Sekunde ausgeführt
            self.draw(); // Die Funktion requestAnimationFrame kennt das Programmierwort "this" nicht, daher müssen wir hier einen kleinen Umweg gehen und das Wort this in einer Variable festlegen
        });
    }

    addObjectsToMap(objects) { // Object = Arrayinhalt aus Zeile 30 z.B. 
        objects.forEach(object => { // For Each ist eine Art For Schleife // Die Funktion addObjectsToMap wird so oft ausgeführt bis jedes einzelne Element aus dem Array ausgelesen wurde
            this.addToMap(object); // Wir geben den Parameter (Inhalt vom Array) an die nächste Funktion weiter
        });
    }

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

    flipImage(mo) {
        this.ctx.save(); // Dann soll der aktuelle Context gespeichert wernden..
        this.ctx.translate(mo.width, 0); // Coce ab hier bis Zeile 61 spiegeln wir das Bild // Bild wird spiegelverkehrt eingefügt
        this.ctx.scale(-1, 1); // Wenn wir das Bild drehen, steht das Bild vom Objekt auf der X Achse etwas anders, daher positioniern wir hier das Bild wieder da wo es war
        mo.x = mo.x * -1; // X Koordinate wird umgedreht // Siehe Kommentar Zeile 60
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1; // X Koordinate wird umgedreht 
        this.ctx.restore(); // Die Spiegelung wird wieder zurückgesetzt
    }
}