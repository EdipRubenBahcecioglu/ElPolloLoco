const level1 = new Level(
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [ // Unser Char startet mit Zeile 28 bei der X Achse 0, wenn er die Canvasbreite nach rechts weiterläuft, verschieben wir unsere Map ab Zeile 33 nach rechts, dasselbe wenn Char nach links läuft
        new BackgroundObject('../img/5_background/layers/air.png', -719 * 3),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719 * 3), // Wir geben den Contructor aus der Klasse BackgroundObjects diese Parameter weiter (Bild / Achse)
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719 * 3),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719 * 3),

        new BackgroundObject('../img/5_background/layers/air.png', -719 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', -719 * 2), // Wir geben den Contructor aus der Klasse BackgroundObjects diese Parameter weiter (Bild / Achse)
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', -719 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', -719 * 2),

        new BackgroundObject('../img/5_background/layers/air.png', -719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719), // Wir geben den Contructor aus der Klasse BackgroundObjects diese Parameter weiter (Bild / Achse)
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0), // Wir geben den Contructor aus der Klasse BackgroundObjects diese Parameter weiter (Bild / Achse)
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('../img/5_background/layers/air.png', 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('../img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('../img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ],
    [
        new Coin(350, 100, 'img/8_coin/coin_2.png'),
        new Coin(450, 50, 'img/8_coin/coin_2.png'),
        new Coin(550, 100, 'img/8_coin/coin_2.png'),
        new Coin(650, 150, 'img/8_coin/coin_2.png'),
        new Coin(250, 150, 'img/8_coin/coin_2.png'), // BREAK COIN STRING
        new Coin(1350, 100, 'img/8_coin/coin_2.png'),
        new Coin(1450, 50, 'img/8_coin/coin_2.png'),
        new Coin(1550, 100, 'img/8_coin/coin_2.png'),
        new Coin(1650, 150, 'img/8_coin/coin_2.png'),
        new Coin(1250, 150, 'img/8_coin/coin_2.png'),
    ],
    [
        new Bottle(150, 350, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(180, 350, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(600, 350, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(630, 350, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(1100, 350, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(1130, 350, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(1600, 350, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(1630, 350, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle(2100, 350, 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle(2130, 350, 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
    ],
    [
        new Heart(1475, 150),
    ]);