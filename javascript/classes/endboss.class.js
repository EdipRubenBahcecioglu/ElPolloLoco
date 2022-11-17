class Endboss extends MoveableObject {

    y = 50;
    height = 400;
    width = 250;
    x = 2600;

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

    constructor() {
        super().loadImage();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        const moveBoss = setInterval(() => {
            this.moveLeft('normal');
        }, 1000 / 60); // Bilder ändern sich jede 200 Milisekunden
        this.bossIntervals.push(moveBoss);

        const moveBossAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 230);
        this.bossIntervals.push(moveBossAnimation);

        const hurtBoss = setInterval(() => {
            this.bossIntervals.push(hurtBoss);
            this.haveVision == false;
            if (this.bossHurt) {
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(()=>{
                    this.bossWillAttack = true;
                }, 150);
            }
        }, 1000 / 60);

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

        const bossDead = setInterval(() => {
            if (this.isDead('boss')) {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(moveBoss && moveBossAnimation && hurtBoss && dangerZoneBoss);
                setTimeout(() => {
                    this.showDeadBossImg();
                }, 250);
            }
        }, 200);
        this.bossIntervals.push(bossDead);
    }

    showDeadBossImg() {
        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
        for (let i = 1; i < this.bossIntervals.length; i++) clearInterval(this.bossIntervals[i]);
    }
}