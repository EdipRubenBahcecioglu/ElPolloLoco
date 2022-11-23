class StatusBar extends DrawableObject {
    x;
    y;
    height = 60;
    width = 200;
    
    IMAGE_HEALTH = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];  

    percentage = 100; // Die Bar fängt bei 100 an

    /**
     * Functions within the constructor are executed immediately
     * The loadImages function loads the images of healtbar of characterlife
     * 
     */

    constructor() {
        super();
        this.loadImages(this.IMAGE_HEALTH);
        this.setPercentage(this.percentage);
    };

    /**
     * The function updates the characterlife statusbar based on the percentage.
     * 
     * @param {number} percentage - energy of character
     */

    setPercentage(percentage) { // Wir aktuallisieren die Variable percentage aus Zeile 25 die standardgemäß 100 ist
        this.x = 40;
        this.y = 0;
        this.percentage = percentage;
        let path = this.IMAGE_HEALTH[this.resolveImageIndex()]; // Unser Pfad der StatusBar wird uns aus der Funktion resolveImageIndex returned
        this.img = this.imageCache[path];
    };

    /**
     * This function gives us the value of the life of the character again
     * 
     * @returns the index of image which is gonna be shown
     */

    resolveImageIndex() { // WELCHES BILD DER LEBENSANZEIGE SOLL ANGEZEIGT WERDEN? WENN LEBEN BZW. PERCENTAGE XX DANN RETURN XX 
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0
        }
    };
}