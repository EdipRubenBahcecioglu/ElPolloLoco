class ThrowableObject extends MoveableObject {

    playBottleSplashAnimation = false;
    bottleFlyDirection;
    bottleSplashed = false;
    throwedBottles = [];

    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png'); // Bottle Bild fürs schmeißen
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throw();
        this.bottleIsAboveGroundAndThrowToRightSide();
        this.bottleIsAboveGroundAndThrowToLeftSide();
        this.bottleIsFlyingToRight();
        this.bottleIsFlyingToLeft();
        this.bottleHitsGround();
        // this.bottleGettingSplashed();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.bottleIsAboveGroundAndThrowToRightSide()) {
                this.bottleIsFlyingToRight();
            } else if (this.bottleIsAboveGroundAndThrowToLeftSide()){
                this.bottleIsFlyingToLeft();
            } else if (this.bottleHitsGround()) {
                // this.bottleGettingSplashed();
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                this.speedY = 0;
                this.acceleration = 0;
                for(let b = 0; b < this.throwableObject.length; b++){
                    let attackBottle = this.throwableObject[b];
                }
                setInterval(() => {
                    // this.width = 0;
                    // this.height = 0;
                    this.throwableObject.splice(b, 1);
                }, 600);
                this.playBottleSplashAnimation = true;
            }
        }, 25);
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
        return this.objectHitGround() && this.playBottleSplashAnimation == false;
    }

    // bottleGettingSplashed(){
    //     this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    //     this.speedY = 0;
    //     this.acceleration = 0;
    //     setInterval(() => {
    //         this.width = 0;
    //         this.height = 0;
    //     }, 600);
    //     this.playBottleSplashAnimation = true;
    // }
}
