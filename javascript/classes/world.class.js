class World {
    character = new Character();
    level = level1;
    ctx; // Innerhalb des Speilfelds legen wir in Zeile 22 fest, dass im 2D Format gespielt wird
    canvas; // = Spielfeld
    keyboard; // Spieltasten
    camera_x  = 0;
    statusBarHealth = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d'); // Mithilfe von getContext haben wir die Möglichkeit innerhlab des Canvas ein 2D Format darstellen zu lassen bzw. zu zeichnen
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkCoinCollisions();
        this.checkBottleGroundCollisions();
        this.checkHeartCollisions();
        this.throwBottle();
    }

    setWorld(){
        this.character.world = this; // This steht hier alleine d.h. dass die Variable world in der Char Klasse kann auf alle Variablen in der World Klasse zugreifen 
    }

    throwBottle(){
        setInterval(() =>{
            if(this.character.collectedBottles > 0 && this.keyboard.attack){
                let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.character.collectedBottles --;
                this.statusBarBottle.setBottles(this.character.collectedBottles);
        }},100)}



    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) =>{ // Für jedes Element aus dem Arrayinhalt Enemy aus level1.js wird geprüft...
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy); // Wenn under Char gehittet wird, dann aktualisieren wir die Statusbar, indem wir dem Lebensparameter an die Funktion setPercentage aus der Klasse Statusbar übergeben
                }
            })
        }, 200); // Diese Funktion wird jede 0,2 Sekunde ausgefürt
    }

    checkCoinCollisions(){
        setInterval(() => {
            this.level.coin.forEach((coin, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                if(this.character.isColliding(coin)){
                    this.character.collect('coin');
                    level1.coin.splice(index, 1);
                    this.statusBarCoin.setCoins(this.character.collectedCoins);
                }
            })
        }, 200);
    }

    checkBottleGroundCollisions(){
        setInterval(() => {
            if(this.character.collectedBottles < 5){
            this.level.bottle.forEach((bottle, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                if(this.character.isColliding(bottle)){
                    this.character.collect('bottle');
                    level1.bottle.splice(index, 1);
                    this.statusBarBottle.setBottles(this.character.collectedBottles);
                }
            })
        }}, 200);
    }

    checkHeartCollisions(){
        setInterval(() => {
            if(this.character.energy < 100){
            this.level.heart.forEach((heart, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                if(this.character.isColliding(heart)){
                    this.character.collect('heart');
                    this.character.energy = this.character.energy + 50;
                    level1.heart.splice(index, 1);
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            })
        }}, 200);
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Diese Funktion löscht Quasi den Inhalt des Canvas bevor er neu in Zeile 18 gezeichnet wird // Erste Parameter = X Achse, Zweite Parameter = Y Achse, Dritte Parameter Spielfeldbreite, Vierte Parameter = Spielfeldhöhe
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds); // Wir geben den Inhalt aus dem Array Zeile 13/14/15... an die Funktion weiter
        this.ctx.translate(-this.camera_x, 0); // Wir setzten die Koordinaten für die nachfolgende Zeile fest, d.h. diese bewegt sich beim Charmoven mit und ist nicht an den bewegendem Maphintergrund fixiert // Kurz gefasst ... fixierte Objekte
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0); // Die Koordinaten werden wieder freigegeben d.h. die nachfolgenden Objekte und Hintergründe ändern sich wenn der Char sich bewegt 
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.heart);
        this.addObjectsToMap(this.throwableObject); 
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() { // Mithilfe dieser Funktion wird die draw Funktion, sobald die einmal geladen wurde, zich mal pro Sekunde ausgeführt
            self.draw(); // Die Funktion requestAnimationFrame kennt das Programmierwort "this" nicht, daher müssen wir hier einen kleinen Umweg gehen und das Wort this in einer Variable festlegen
        });
    }

    addObjectsToMap(objects){ // Object = Arrayinhalt aus Zeile 30 z.B. 
        objects.forEach(object =>{ // For Each ist eine Art For Schleife // Die Funktion addObjectsToMap wird so oft ausgeführt bis jedes einzelne Element aus dem Array ausgelesen wurde
            this.addToMap(object); // Wir geben den Parameter (Inhalt vom Array) an die nächste Funktion weiter
        });
    }

    addToMap(mo){ // mo = Movable Objekt // Parameter aus Zeile 44
        if(mo.otherDirection){ // Wenn OtherDirection eine andere Richtung hat..
            this.flipImage(mo); // Zeile 59
        }

        mo.draw(this.ctx); // Funktion in der Klasse moveableObkekt wird ausgeführt und wir geben unser Spielfeld rein als Parameter
        mo.drawBorder(this.ctx); // Funktion in der Klasse moveableObkekt wird ausgeführt und wir geben unser Spielfeld rein als Parameter
        
        if(mo.otherDirection){ // Ab Zeile 64 bis 66 wird die Spiegelung wieder zurückgesetzt 
            this.flipImageBack(mo); // Zeile 66
        }
     } 

    flipImage(mo){
        this.ctx.save(); // Dann soll der aktuelle Context gespeichert wernden..
        this.ctx.translate(mo.width, 0); // Coce ab hier bis Zeile 61 spiegeln wir das Bild // Bild wird spiegelverkehrt eingefügt
        this.ctx.scale(-1, 1); // Wenn wir das Bild drehen, steht das Bild vom Objekt auf der X Achse etwas anders, daher positioniern wir hier das Bild wieder da wo es war
        mo.x = mo.x * -1; // X Koordinate wird umgedreht // Siehe Kommentar Zeile 60
    }

    flipImageBack(mo){
        mo.x = mo.x * -1; // X Koordinate wird umgedreht 
        this.ctx.restore(); // Die Spiegelung wird wieder zurückgesetzt
    }
}