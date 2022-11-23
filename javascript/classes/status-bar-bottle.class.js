class StatusBarBottle extends DrawableObject {
    x;
    y;
    height = 60;
    width = 200;

    IMAGE_BOTTLES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    collectedBottles = 0;

    /**
     * Functions within the constructor are executed immediately
     * The loadImages function loads the images of healtbar of bottles
     * 
     */

    constructor() {
        super();
        this.loadImages(this.IMAGE_BOTTLES);
        this.setBottles(this.collectedBottles);
    };

    /**
     * The function updates the bottle statusbar based on the collected bottles.
     * 
     * @param {number} collectedBottles - amount of collected bottles 
     */

    setBottles(collectedBottles){
        this.x = 40;
        this.y = 95;
        this.collectedBottles = collectedBottles;
        let path = this.IMAGE_BOTTLES[this.resolveImageIndexBottles()];
        this.img = this.imageCache[path];
    }

    /**
     * This function checks which imageindex of statusbar bottle is gonne show up
     * 
     * @returns the index of image which is gonna be shown
     */

    resolveImageIndexBottles(){
        if (this.collectedBottles == 0){
            return 0;
        } else if (this.collectedBottles == 1){
            return 1;
        } else if (this.collectedBottles == 2){
            return 2;
        } else if (this.collectedBottles == 3){
            return 3;
        } else if (this.collectedBottles == 4){
            return 4;
        } else if (this.collectedBottles == 5){
            return 5;
        }
    }
}