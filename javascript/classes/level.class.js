class Level {
    enemies;
    clouds;
    backgroundObject;
    statusBars;
    coin;
    bottle;
    heart;
    bosses;
    level_end_x = 2200;

    /**
     * Functions within the constructor are executed immediately
     * This function assigns the obtained arrays with the level objects to the variables 
     * 
     * @param {array} enemies - array with all enemies
     * @param {array} bosses - array with all bosses
     * @param {array} clouds - array with all clouds
     * @param {array} backgroundObject - array with all backgroundobjects
     * @param {array} coin - array with all coins
     * @param {array} bottle - array with all bottles
     * @param {array} heart - array with all hearts
     */

    constructor(enemies, bosses, clouds, backgroundObject, coin, bottle, heart){
        this.enemies = enemies;
        this.clouds = clouds,
        this.backgroundObject = backgroundObject;
        this.coin = coin;
        this.bottle = bottle;
        this.heart = heart;
        this.bosses = bosses;
    }
}