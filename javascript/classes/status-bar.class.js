class StatusBar extends DrawableObject {
    x = 40;
    y = 0;
    height = 60;
    width = 200

    IMAGE_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100; // Die Bar fängt bei 100 an 

    constructor() {
        super();
        this.loadImages(this.IMAGE_HEALTH);
        this.setPercentage(100);
    };

    setPercentage(percentage) { // Wir aktuallisieren die Variable percentage aus Zeile 16 die standardgemäß 100 ist
        this.percentage = percentage;
        console.log(percentage);
        let path = this.IMAGE_HEALTH[this.resolveImageIndex()]; // Unser Pfad der StatusBar wird uns aus der Funktion resolveImageIndex returned 
        this.img = this.imageCache[path];
    };


    resolveImageIndex() { // WELCHES BILD DER LEBENSANZEIGE SOLL ANGEZEIGT WERDEN? WENN LEBEN BZW. PERCENTAGE XX DANN RETURN XX 
        if (this.percentage == 100) {
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