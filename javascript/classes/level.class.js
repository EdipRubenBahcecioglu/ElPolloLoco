class Level {
    enemies;
    clouds;
    backgroundObject;
    statusBars;
    coin;
    bottle;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObject, coin, bottle){
        this.enemies = enemies;
        this.clouds = clouds,
        this.backgroundObject = backgroundObject;
        this.coin = coin;
        this.bottle = bottle;
    }
}