class ThrowableObject extends MoveableObject {

    playBottleSplashAnimation = false;
    bottleFlyDirection;
    bottleSplashed = false;
    bottleFlying = false;

    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
    }


    IMAGES_BOTTLE_THROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png'); // Bottle Bild fürs schmeißen
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        let bottleInterval = setInterval(() => {
            if (this.bottleIsAboveGroundAndThrowToRightSide()) {
                this.bottleIsFlyingToRight();
            } else if (this.bottleIsAboveGroundAndThrowToLeftSide()){
                this.bottleIsFlyingToLeft();
            } else if (this.bottleHitsGround() && this.playBottleSplashAnimation == false) {
                this.bottleGettingSplashed();
            }
        }, 25);
    }

    bottleGettingSplashed() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0;
        this.x += 0;
        this.acceleration = 0;
        this.playBottleSplashAnimation = true;
        this.bottleSplashed = true;
    }

    bottleIsAboveGroundAndThrowToRightSide(){
        return !this.objectHitGround() && this.bottleFlyDirection == 'right';
    }

    bottleIsAboveGroundAndThrowToLeftSide(){
        return !this.objectHitGround() && this.bottleFlyDirection == 'left';
    }

    bottleIsFlyingToRight() {
        this.x += 10;
        this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }

    bottleIsFlyingToLeft(){
        this.x -= 10;
        this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }

    bottleHitsGround(){
        return this.objectHitGround();
    }
}
