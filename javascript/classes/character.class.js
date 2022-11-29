class Character extends MoveableObject {

    height = 250;
    width = 100;
    x = 10;
    y = 170;
    speed = 10;

    /**
     * Using offset we can define a collision between several objects much more precisely 
     * 
     */
    offset = {
        top: 110,
        bottom: 30,
        left: 40,
        right: 20
    }

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'

    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_SHORT_SLEEP = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_SLEEP = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    passedBoss;
    charJumpSound = new Audio('audio/char_jump.mp3');
    charSleepSound = new Audio('audio/char_sleep.mp3');
    charHurtSound = new Audio('audio/char_hurt.mp3');
    enterDangerZoneSound = new Audio('audio/danger_zone.mp3');
    reachedBonus = false;

    /**
     * Functions within the constructor are executed immediately
     * 
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png'); 
        this.loadImagesOfCharacter();
        this.applyGravity();
        this.animateByKeypress();
        this.imageAnimateMovement();
        this.imageAnimateDanger();
    }

    /**
     * This Function loads all Images of our character Pepe
     * 
     */
    loadImagesOfCharacter() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHORT_SLEEP);
        this.loadImages(this.IMAGES_LONG_SLEEP);
    }

    /**
     * The animation function checks which keyboard key was pressed and executes the character movement accordingly
     * 
     */
    animateByKeypress() {
        setInterval(() => {
            this.charMovementByKeypressRight();
            this.charMovementByKeypressLeft();
            this.characterPositionAtGamestart();
            this.charMovementByKeypressSpace();
        }, 1000 / 60);
    }

    /**
     * The coming interval checks which image animations should be executed by character movement
     *          
     */
    imageAnimateMovement() {
        setInterval(() => {
            if (this.isAboveGround()) { 
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isSleeping('0.35', '1.2')) {
                this.playAnimation(this.IMAGES_SHORT_SLEEP);
                this.charSleepSound.play();
            } else if (this.isSleeping('1.2', '999999')) {
                this.playAnimation(this.IMAGES_LONG_SLEEP);
            } else if (this.world.keyboard.right || this.world.keyboard.left) { 
                this.playAnimation(this.IMAGES_WALKING); 
            }
        }, 150); 
    }

    /**
     * The coming interval checks which image animations should be executed in bad situations
     *          
     */
    imageAnimateDanger() {
        setInterval(() => {
            if (this.isDead('character')) { 
                this.letCharacterDieAndResetBossAggro();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 150);
    }

    /**
     * This function checks if the arrow right key was pressed and lets the character move right. It also checks if the character can be moved. 
     * 
     */
    charMovementByKeypressRight() {
        if (this.userPressButtonRight() && this.characterIsNotAtMapend() && this.charAndBossIsAlive()) { 
            this.characterIsMovingRight();
        }
    }

    /**
     * This function checks if the arrow left key was pressed and lets the character move left. It also checks if the character can be moved. 
     * 
     */
    charMovementByKeypressLeft() {
        if (this.userPressButtonLeft() && this.characterIsNotAtMapstart() && this.charAndBossIsAlive()) {  
            this.characterIsMovingLeft();
        }
    }

    /**
     * This function checks if the space key was pressed and lets the character jump
     * 
     */
    charMovementByKeypressSpace() {
        if (this.userPressButtonSpaceAndCharIsOnGround()) { 
            this.characterIsJumping();
        }
    }

    /**
     * The function checks whether the right arrow key has been pressed.
     * 
     * @returns true if right arrow key has been pressed
     */
    userPressButtonRight() {
        return this.world.keyboard.right;
    }

    /**
     * This function checks if the character has reached the end of the map.
     * 
     * @returns false if the character has not reached the end of the map
     */
    characterIsNotAtMapend() {
        return this.x < this.world.level.level_end_x;
    }

    /**
     * When the right arrow key is pressed the animation "moveRight" is executed, variables are updated and the appropriate sound is played/paused.
     * 
     */
    characterIsMovingRight() {
        this.moveRight();
        this.otherDirection = false;
        this.lastMovement = new Date().getTime();
        this.charSleepSound.pause();
    }

    /**
     * The function checks whether the left arrow key has been pressed.
     * 
     * @returns true if the left arrow key has been pressed
     */
    userPressButtonLeft() {
        return this.world.keyboard.left;
    }

    /**
     * This function checks if the character has reached the start of the map.
     * 
     * @returns true if character is not at the start of the map
     */
    characterIsNotAtMapstart() {
        return this.x > 0;
    }


    /**
     * When the left arrow key is pressed the animation "moveLeft" is executed, variables are updated and the appropriate sound is played/paused.
     * 
     */
    characterIsMovingLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.lastMovement = new Date().getTime();
        this.charSleepSound.pause();
    }

    /**
     * This function positions our camerafocus on a specific X coordinate while playing
     * 
     * @returns the X coordinate of the camerafocus 
     */
    characterPositionAtGamestart() {
        this.world.camera_x = -this.x + 100; 
    }

    /**
     * This function checks if the X coordinate of the character is higher than that of the boss.
     * 
     * @returns 
     */
    characterPassedBoss() {
        return this.passedBoss == true;
    }

    /**
     * This function positions our camerafocus on a specific X coordinate while playing
     * 
     * @returns the X coordinate of the camerafocus
     */
    changeCameraPosition() {
        this.world.camera_x = -this.x + 400;
    }

    /**
     * This function checks if the X coordinate of the boss is higher than that of the character.
     * 
     * @returns false if the X coordinate of the boss is higher than that of the character
     */
    bossPassedCharacter() {
        return this.passedBoss == false;
    }

    /**
     * This functions sets the camerafocus to default 
     * 
     * @returns the default X coordinate of the camerafocus
     */
    setCameraToDefault() {
        this.world.camera_x = -this.x + 0; // hier war 100 
    }

    /**
     * This functions checks if the space key are pressed and if the character is on ground
     * 
     * @returns true if the space key are pressed and the character is on ground
     */
    userPressButtonSpaceAndCharIsOnGround() {
        return this.world.keyboard.space && !this.isAboveGround();
    }

    /**
     * When the space key is pressed the animation "jump" is executed, variables are updated and the appropriate sound is played/paused.
     * 
     */
    characterIsJumping() {
        this.charJumpSound.play();
        this.jump();
        this.charSleepSound.pause();
        this.lastMovement = new Date().getTime();
    }

    /**
     * When our character is dead the dead animation is executed, variables are updated and the appropriate sound is played/paused.
     * It also resets the endboss aggro when the character is dead
     * 
     */
    letCharacterDieAndResetBossAggro() {
        this.playAnimation(this.IMAGES_DEAD); 
        this.leaveMap();
        this.charHurtSound.pause();
        this.world.level.bosses[0].bossWillAttack = false;
    }

    /**
     * This function checks if our character or endboss still alive and returns true
     * 
     * @returns true when our character and enboss still alive
     */
    charAndBossIsAlive(){
        return this.world.character.energyChar > 0 && this.world.level.bosses[0].energyBoss > 0;
    }
}