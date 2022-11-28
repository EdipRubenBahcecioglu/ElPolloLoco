let level1;

/**
 * This function initializes our whole level 
 * 
 */
async function initLevel() {
    level1 = new Level(
        createEnemyChickens(),
        createEnemyBoss(),
        createLevelClouds(),
        createLevelBackground(),
        createLevelCoins(),
        createLevelBottles(),
        createLevelHBonusLife());
}

/**
 * This function clears our whole level
 * 
 */
async function clearLevel() {
    level1 = [];
}

function createEnemyChickens() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
    ];
}

/**
 * This function creates the end boss for our level
 * 
 * @returns the endboss object
 */
function createEnemyBoss() {
    return [
        new Endboss(),
    ];
}

/**
 * This function creates the clouds for our level
 * 
 * @returns the cloud object
 */
function createLevelClouds() {
    return [
        new Cloud()
    ];
}

/**
 * This function creates the coins for our level
 * 
 * @returns the coin object with x coordinate, y coordinate and image path
 */
function createLevelCoins() {
    return [
        new Coin(250, 150, './img/8_coin/coin_2.png'),
        new Coin(350, 100, './img/8_coin/coin_2.png'),
        new Coin(450, 50, './img/8_coin/coin_2.png'),
        new Coin(550, 100, './img/8_coin/coin_2.png'),
        new Coin(650, 150, './img/8_coin/coin_2.png'),
        new Coin(1350, 100, './img/8_coin/coin_2.png'),
        new Coin(1450, 50, './img/8_coin/coin_2.png'),
        new Coin(1550, 100, './img/8_coin/coin_2.png'),
        new Coin(1650, 150, './img/8_coin/coin_2.png'),
        new Coin(1250, 150, './img/8_coin/coin_2.png'),
    ];
}

/**
 * This function creates the background for our level
 * 
 * @returns the background object with image path and x coordinate
 */
function createLevelBackground() {
    return [
        new BackgroundObject('./img/5_background/layers/air.png', -719 * 3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719 * 3), 
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719 * 3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719 * 3),

        new BackgroundObject('./img/5_background/layers/air.png', -719 * 2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -719 * 2), 
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -719 * 2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -719 * 2),

        new BackgroundObject('./img/5_background/layers/air.png', -719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719), 
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0), 
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('./img/5_background/layers/air.png', 719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ];
}

/**
 * This function creates the bottles for our level
 * 
 * @returns the bottle object with x coordinate, y coordinate and image path
 */
function createLevelBottles() {
    return [
        new Bottle(150, 350, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(180, 350, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(450, 350, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(600, 350, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(630, 350, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(900, 350, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(1100, 350, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(1130, 350, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(1400, 350, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(1600, 350, './img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(1630, 350, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(1900, 350, './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
    ];
}

/**
 * This function creates the bonus life object for our level
 * 
 * @returns the bonus life object with x coordinate and y coordinate as parameter
 */
function createLevelHBonusLife() {
    return [
        new Heart(1475, 150),
    ];
}