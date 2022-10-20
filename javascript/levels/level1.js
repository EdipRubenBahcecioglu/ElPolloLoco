const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
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
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]);