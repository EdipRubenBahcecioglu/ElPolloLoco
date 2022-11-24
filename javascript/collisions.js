/**
 * TThis function checks if our world is fully loaded and then executes intervals
 * 
 */

const worldSetCheck = setInterval(() => {
    if (worldWasSet == true) {
        checkAllCollisions();
        clearInterval(worldSetCheck);
    }
}, 1000 / 60);

/**
 * This function checks all collisions in the game
 * 
 */

function checkAllCollisions() {
    checkEnemyCollisions();
    checkBossCollisions();
    checkCoinCollisions();
    checkBottleCollisions();
    checkHeartCollisions();
    checkCollisionsFromTop();
    checkBottleHitEnemy();
    checkBottleHitEndboss();
    checkCharacterMiss();
    checkBossPassCharacter();
    checkCharacterinDangerZone();
}

/**
 * This function checks if the character missed an bottle and plays the suitable sound
 * 
 */

function checkCharacterMiss() {
    setInterval(() => {
        for (let x = 0; x < world.throwableObject.length; x++) {
            const missedBottle = world.throwableObject[x];
            if (missedBottle.objectHitGround()) {
                removeObject(x, missedBottle, 'bottle', 300);
                world.bottleSplashSound.play();
            }
        }
    }, 1000 / 60);
}

/**
 * This function checks if the character is coliding with an enemy and let the character take damage. Also the health statusbar is getting updated.
 * 
 */

function checkEnemyCollisions() {
    setInterval(() => {
        world.level.enemies.forEach((enemy) => { // Für jedes Element aus dem Arrayinhalt Enemy aus level1.js wird geprüft...
            if (characterCanBeHurt(enemy)) {
                world.character.charHurtSound.play();
                world.character.hit('5', 'character');
                world.statusBarHealth.setPercentage(world.character.energyChar); // Wenn under Char gehittet wird, dann aktualisieren wir die Statusbar, indem wir dem Lebensparameter an die Funktion setPercentage aus der Klasse Statusbar übergeben
            }
        })
    }, 200);
}

/**
 * This function checks if the character can be hurt 
 * 
 * @param {object} enemy - enemyobject 
 * @returns true when character can be hurt 
 */

function characterCanBeHurt(enemy) {
    return world.character.isColliding(enemy) && !world.character.isAboveGround() && !enemy.isAttacked;
}

/**
 * This function checks if the character is coliding with an boss and let the character take damage. Also the health statusbar is getting updated.
 * 
 */

function checkBossCollisions() {
    setInterval(() => {
        world.level.bosses.forEach((endboss) => { // Für jedes Element aus dem Arrayinhalt Enemy aus level1.js wird geprüft...
            if (world.character.isColliding(endboss)) {
                world.character.charHurtSound.play();
                world.character.hit('10', 'character');
                world.statusBarHealth.setPercentage(world.character.energyChar); // Wenn under Char gehittet wird, dann aktualisieren wir die Statusbar, indem wir dem Lebensparameter an die Funktion setPercentage aus der Klasse Statusbar übergeben
            }
        })
    }, 200);
}

/**
 * This function checks if the character jumps on an enemy and plays the suitable sound.
 * 
 */

function checkCollisionsFromTop() {
    setInterval(() => {
        world.level.enemies.forEach((enemy, index) => {
            if (characterJumpedOnEnemy(enemy)) {
                updateCharacterVariablesAndSounds(enemy);
                removeObject(index, enemy, 'enemy', 400);
                world.deadEnemys++;
            }
        });
    }, 1000 / 60);
}

/**
 * This function checks if character is coliding with an enemy from top
 * 
 * @param {object} enemy - enemyobject 
 * @returns true when collision from top is true
 */

function characterJumpedOnEnemy(enemy) {
    return world.character.isColliding(enemy) && !enemy.isDead() && world.character.isAboveGround() && world.character.speedY <= 0
}

/**
 * This function checks if the character is coliding with an coin and collects them 
 * 
 */

function checkCoinCollisions() {
    setInterval(() => {
        world.level.coin.forEach((coin, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
            if (world.character.isColliding(coin)) {
                objectGettingCollected('coin', index, level1.coin, world.coinCollectSound);
            }
        })
    }, 50);
}

/**
 * This function checks if the character is coliding with an bottle and collects them but only when the character have less then 5 bottles
 * 
 */

function checkBottleCollisions() {
    setInterval(() => {
        if (world.character.collectedBottles < 5) {
            world.level.bottle.forEach((bottle, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                if (world.character.isColliding(bottle)) {
                    objectGettingCollected('bottle', index, level1.bottle, world.bottleCollectSound);
                }
            })
        }
    }, 50);
}

/**
 * This function checks if the character is coliding with an heart and collects them but only when the character habe less then full life
 * 
 */

function checkHeartCollisions() {
    setInterval(() => {
        if (world.character.energyChar < 100) {
            world.level.heart.forEach((heart, index) => {  // Bei einer for Each Abfrage kann man auch ohne for Schleife dem Objekt, hier Coin, einen Index zuweisen lassen, damit arbeiten wir in der If Abfrage weiter
                if (world.character.isColliding(heart)) {
                    objectGettingCollected('heart', index, level1.heart, world.heartCollectSound);
                }
            })
        }
    }, 50);
}

/**
 * This function collects objects and update the statusbar of object
 * 
 * @param {string} collectedObject - which object gets collected
 * @param {number} indexOfObject - index of collected object
 * @param {array} objectInLevel - object in level array
 * @param {audio} collectSound - collect audio by collision 
 */

function objectGettingCollected(collectedObject, indexOfObject, objectInLevel, collectSound) {
    world.character.collect(collectedObject);
    collectSound.play();
    objectInLevel.splice(indexOfObject, 1);
    if (collectedObject == 'coin') {
        world.statusBarCoin.setCoins(world.character.collectedCoins);
    } else if (collectedObject == 'bottle') {
        world.statusBarBottle.setBottles(world.character.collectedBottles);
    } else if (collectedObject == 'heart') {
        world.statusBarHealth.setPercentage(world.character.energyChar);
    }
}

/**
 * This function checks if thrown bottle hits enemy 
 * 
 */

function checkBottleHitEnemy() {
    setInterval(() => {
        world.level.enemies.forEach((enemy, index) => {
            for (let b = 0; b < world.throwableObject.length; b++) {
                let throwedBottle = world.throwableObject[b];
                if (throwedBottle.isColliding(enemy)) {
                    removeEnemyAndUpdateVariablesAndSound(index, enemy);
                } else
                    if (throwedBottle.bottleSplashed) {
                        removeBottleAndUpdateVariables(b, throwedBottle);
                    }
            }
        })
    }, 1000 / 60); // 100
}

/**
 * This function removes bottle after throw and update variables
 * 
 * @param {number} indexOfBottle - index of thrown bottle
 * @param {object} throwedBottle - throwed bottle as object
 */

function removeBottleAndUpdateVariables(indexOfBottle, throwedBottle) {
    removeObject(indexOfBottle, throwedBottle, 'bottle', 300);
    world.character.isAttacking = false;
}

/**
 * This function removes enemy after getting attacked and play suitable sound and update variables
 * 
 * @param {number} inexOfEnemy - index of hitten enemy 
 * @param {object} enemy - hitten enemy as object
 */

function removeEnemyAndUpdateVariablesAndSound(inexOfEnemy, enemy) {
    removeObject(inexOfEnemy, enemy, 'enemy', 300);
    world.throwSuccesSound.play();
    enemy.isAttacked = true;
}

/**
 * This function checks if thrown bottle hits endboss and update variables 
 * 
 */

function checkBottleHitEndboss() {
    setInterval(() => {
        world.level.bosses.forEach((boss) => {
            if (boss.bossHurt == false) {
                for (let x = 0; x < world.throwableObject.length; x++) {
                    const throwedBottle = world.throwableObject[x];
                    if (throwedBottle.isColliding(boss)) {
                        bossGettingHurtAndUpdateVariables(x, boss, throwedBottle);
                    }
                    if (throwedBottle.bottleSplashed == true) {
                        setAttackVariablesToDefault(boss);
                    }
                }
            }
        })
    }, 1000 / 60);
}

/**
 * This function set variables to default after boss getting attacked
 * 
 * @param {object} boss - endboss as object 
 */

function setAttackVariablesToDefault(boss) {
    setTimeout(() => {
        boss.bossHurt = false;
    }, 350);
    world.character.isAttacking = false;
}

/**
 * This function lets the boss get damage und updates the statusbar of endboss. Also the suitable sound is playing and the thrown bottle is getting removed. 
 * 
 * @param {number} indexOfBottle - index of thrown bottle
 * @param {object} boss - endboss as object
 * @param {object} throwedBottle - thrown bottle as object
 */

function bossGettingHurtAndUpdateVariables(indexOfBottle, boss, throwedBottle) {
    world.throwSuccesSound.play();
    boss.bossHurt = true;
    boss.hit('10', 'boss');
    world.statusBarEndboss.setPercentage(boss.energyBoss, boss.x, boss.y);
    throwedBottle.bottleGettingSplashed();
    removeObject(indexOfBottle, throwedBottle, 'bottle', 75);
}

/**
 * This function removes object from map after a timeout
 * 
 * @param {number} indexOfObject - index of object which is getting removed 
 * @param {object} object - which object is getting removed
 * @param {array} array - in which array is the object which is getting removed
 * @param {number} timeoutTime - after how much seconds the object should be removed
 */

function removeObject(indexOfObject, object, array, timeoutTime) {
    if (array == 'bottle') {
        removeBottleObject(indexOfObject, object, timeoutTime);
    }
    if (array == 'enemy') {
        removeEnemyObject(indexOfObject, object, timeoutTime);
    }
}

/**
 * This function removes the bottle object from an array
 * 
 * @param {number} indexOfObject - index of object which is going to be removed
 * @param {object} object - which object should be removed
 * @param {number} timeoutTime - after how much seconds the object should be removed 
 */

function removeBottleObject(indexOfObject, object, timeoutTime) {
    setTimeout((() => {
        if (world.throwableObject[indexOfObject] === object) {
            world.throwableObject.splice(indexOfObject, 1);
        }
    }), timeoutTime);
}

/**
 * This function removes the bottle object from an array
 * 
 * @param {number} indexOfObject - index of object which is going to be removed
 * @param {object} object - which object should be removed
 * @param {number} timeoutTime - after how much seconds the object should be removed   
 */

function removeEnemyObject(indexOfObject, object, timeoutTime) {
    setTimeout((() => {
        if (world.level.enemies[indexOfObject] === object) {
            world.level.enemies.splice(indexOfObject, 1);
        }
    }), timeoutTime);
}

/**
 * This function checks if the character is entering the danger Zone and plays the suitable sounds. Also variables are getting updated. 
 * 
 */

function checkCharacterinDangerZone() {
    setInterval(() => {
        let endboss = world.level.bosses[0];
        if (characterIsInDangerZone(endboss)) {
            endboss.haveVision = true;
            world.statusBarEndboss.move = false;
            world.character.enterDangerZoneSound.play();
        } else {
            endboss.haveVision = false;
            world.statusBarEndboss.move = true;
        }
    }, 1000 / 60);
}

/**
 * This function checks if the distance between character and endboss is less than 500 on the x coordinate 
 * 
 * @param {*} endboss 
 * @returns 
 */

function characterIsInDangerZone(endboss) {
    return endboss.x - world.character.x < 500 && endboss.bossWillAttack == false || endboss.isDead('boss');
}

/**
 * This function checks if boss passed character and update variables
 * 
 */

function checkBossPassCharacter() {
    setInterval(() => {
        let endboss = world.level.bosses[0];
        if (endboss.x < world.character.x) {
            endboss.otherDirection = true;
            world.character.passedBoss = true;
        } else {
            endboss.otherDirection = false;
            world.character.passedBoss = false;
        }
    }, 1000 / 60);
}

/**
 * This function plays sounds and update variables after a bottle hits an enemy
 * 
 * @param {object} enemy - enemyobject
 */

function updateCharacterVariablesAndSounds(enemy) {
    world.throwSuccesSound.play();
    enemy.isAttacked = true;
    world.character.speedY += 25;
    world.character.y = 150;
    world.character.isAttacking = false;
}
