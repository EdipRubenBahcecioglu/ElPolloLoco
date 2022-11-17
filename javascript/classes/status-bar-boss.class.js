class StatusBarBoss extends MoveableObject {
    x;
    y;
    height = 60;
    width = 200;
    move = false;
    
    IMAGE_HEALTH = [
        './img/7_statusbars/2_statusbar_endboss/endboss_0.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_20.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_40.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_60.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_80.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_100.png'
    ];  

    percentage = 100; // Die Bar fängt bei 100 an

    constructor(bossXPosition, bossYPosition) {
        super();
        this.loadImages(this.IMAGE_HEALTH);
        this.setPercentage(this.percentage, bossXPosition, bossYPosition);
        this.stickBarToBoss();
    };

    setPercentage(percentage, bossXPosition, bossYPosition) { // Wir aktuallisieren die Variable percentage aus Zeile 25 die standardgemäß 100 ist
        this.x = bossXPosition;
        this.y = bossYPosition;
        this.percentage = percentage;
        let path = this.IMAGE_HEALTH[this.resolveImageIndex()]; // Unser Pfad der StatusBar wird uns aus der Funktion resolveImageIndex returned
        this.img = this.imageCache[path];
    };


    resolveImageIndex() { // WELCHES BILD DER LEBENSANZEIGE SOLL ANGEZEIGT WERDEN? WENN LEBEN BZW. PERCENTAGE XX DANN RETURN XX 
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 30) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0
        }
    }
    
    stickBarToBoss(){
        setInterval(() =>{
            if(this.move == true){
                this.moveLeft();
            }
        }, 1000 / 60); 
    };
}