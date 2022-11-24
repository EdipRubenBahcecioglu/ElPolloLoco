class Endboss extends MoveableObject {

    y = 50;
    height = 400;
    width = 250;
    x = 2600;

    /**
     * Using offset we can define a collision between several objects much more precisely 
     * 
     */

    offset = {
        top: 45,
        bottom: 20,
        left: 35,
        right: 5
    };

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    stopDeadAnimation = false;
    bossIntervals = [];
    bossWillAttack = false;

    /**
     * Functions within the constructor are executed immediately
     * 
     */

    constructor() {
        super().loadImage();
        this.loadImagesOfEndboss();
        this.animate();
    }

    /**
     * This function loads all images of endboss chicken
     * 
     */

    loadImagesOfEndboss() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * This function runs all animation functions of endboss
     * 
     */

    animate() {
        this.chickenMoveLeft();
        this.playMoveAnimation();
        this.playHurtAnimation();
        this.playSprintAnimation();
        this.playAlertAnimation();
        this.playDeadAnimation();
    }

    /**
     * This function shows dead image of endboss and clears other animation intervalls
     * 
     */

    showDeadBossImg() {
        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
        for (let i = 1; i < this.bossIntervals.length; i++) clearInterval(this.bossIntervals[i]);
    }

    /**
     * This function lets endboss move left
     * 
     */

    chickenMoveLeft() {
        const moveBoss = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // Bilder ändern sich jede 200 Milisekunden
        this.bossIntervals.push(moveBoss);
    }

    /**
     * This function plays the move animation of endboss
     * 
     */

    playMoveAnimation() {
        const moveBossAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 230);
        this.bossIntervals.push(moveBossAnimation);
    }

    /**
     * This function plays the hurt animation of endboss after getting hurted. Also endboss gonna attack.
     * 
     */

    playHurtAnimation() {
        const hurtBoss = setInterval(() => {
            this.bossIntervals.push(hurtBoss);
            this.haveVision == false;
            if (this.bossHurt) {
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(() => {
                    this.bossWillAttack = true;
                }, 150);
            }
        }, 1000 / 60);
    }

    /**
     * This functions lets the endboss hunt the character after getting hurt  
     * 
     */

    playSprintAnimation() {
        const bossAttack = setInterval(() => {
            if (this.bossWillAttack) {
                this.haveVision == false;
                if (this.otherDirection == false) {
                    this.sprintLeft();
                }
                if (this.otherDirection == true) {
                    this.sprintRight();
                    clearInterval(this.bossIntervals[0]);
                }
                this.playAnimation(this.IMAGES_ATTACK) && this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
        this.bossIntervals.push(bossAttack);
    }

    /**
     * This function plays the endboss alert animation after character enters danger zone
     * 
     */

    playAlertAnimation(){
        const dangerZoneBoss = setInterval(() => {
            if (this.haveVision) {
                this.playAnimation(this.IMAGES_ALERT);
                this.speed = 0;
                this.x -= 0;
            } else {
                this.speed = 0.15;
                this.x -= 0.15;
            }
        }, 230);
        this.bossIntervals.push(dangerZoneBoss);
    }

    /**
     * This function plays the dead animation of endboss when life is 0
     * 
     */

    playDeadAnimation(){
        const bossDead = setInterval(() => {
            if (this.isDead('boss')) {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(this.moveBoss && this.moveBossAnimation && this.hurtBoss && this.dangerZoneBoss);
                setTimeout(() => {
                    this.showDeadBossImg();
                    this.speed = 0;
                }, 250);
            }
        }, 200);
        this.bossIntervals.push(bossDead);
    }
}