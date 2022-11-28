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

    percentage = 100; 

    /**
     * Functions within the constructor are executed immediately
     * The loadImages function loads the images of healtbar of boss
     * 
     * @param {number} bossXPosition - x coordinate from the endboss 
     * @param {number} bossYPosition - y coordinate from the endboss
     */
    constructor(bossXPosition, bossYPosition) {
        super();
        this.loadImages(this.IMAGE_HEALTH);
        this.setPercentage(this.percentage, bossXPosition, bossYPosition);
    };

    /**
     * The function updates the endboss statusbar based on the percentage.
     * The position of the endboss statusbar is based on the position of endboss
     * 
     * @param {number} percentage - energy of endboss
     * @param {number} bossXPosition - x coordinate of endboss
     * @param {number} bossYPosition - y coordinate of endboss
     */
    setPercentage(percentage, bossXPosition, bossYPosition) { 
        this.x = bossXPosition;
        this.y = bossYPosition;
        this.percentage = percentage;
        let path = this.IMAGE_HEALTH[this.resolveImageIndex()]; 
        this.img = this.imageCache[path];
    };

    /**
     * This function gives us the value of the life of the boss again
     * 
     * @returns the index of image which is gonna be shown
     */
    resolveImageIndex() { 
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
}