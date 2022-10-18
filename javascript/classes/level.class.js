class Level {
    enemies;
    clouds;
    backgroundObject;
    statusBars;
    coin;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObject, coin){
        this.enemies = enemies;
        this.clouds = clouds,
        this.backgroundObject = backgroundObject;
        this.coin = coin;
    }
}