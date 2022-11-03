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