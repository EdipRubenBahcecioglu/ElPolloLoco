class StatusBarCoin extends DrawableObject {
    x;
    y;
    height = 60;
    width = 200;

    IMAGE_COINS = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];    

    collectedCoins = 0;

    /**
     * Functions within the constructor are executed immediately
     * The loadImages function loads the images of healtbar of coins
     * 
     */

    constructor() {
        super();
        this.loadImages(this.IMAGE_COINS);
        this.setCoins(this.collectedCoins);
    };

    /**
     * The function updates the coin statusbar based on the collected coins.
     * 
     * @param {number} collectedBottles - amount of collected coins 
     */

    setCoins(collectedCoins){
        this.x = 40;
        this.y = 45;
        this.collectedCoins = collectedCoins;
        let path = this.IMAGE_COINS[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];
    }

    /**
     * This function checks which imageindex of statusbar coin is gonne show up
     * 
     * @returns the index of image which is gonna be shown
     */

    resolveImageIndexCoins(){
        if (this.collectedCoins == 100) {
            return 5;
        } else if (this.collectedCoins > 80) {
            return 4;
        } else if (this.collectedCoins > 60) {
            return 3;
        } else if (this.collectedCoins > 40) {
            return 2;
        } else if (this.collectedCoins > 20) {
            return 1;
        } else {
            return 0
        }
    }
}