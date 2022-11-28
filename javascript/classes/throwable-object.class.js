class ThrowableObject extends MoveableObject {

    playBottleSplashAnimation = false;
    bottleFlyDirection;
    bottleSplashed = false;
    bottleFlying = false;

    /**
     * Using offset we can define a collision between several objects much more precisely 
     * 
     */
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

    /**
     * Functions within the constructor are executed immediately
     * The function sets the imagesize of bottle
     * 
     * @param {number} x - x coordinate of bottle
     * @param {number} y - y coordinate of bottle
     */
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png'); 
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.loadBottleImages();
        this.throw();
    }

    /**
     * This function loads all bottle images
     * 
     */
    loadBottleImages(){
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    }

    /**
     * This function lets you throw a bottle
     * 
     */
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

    /**
     * This function checks if a bottle getting splashed and updates variales
     * 
     */
    bottleGettingSplashed() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0;
        this.x += 0;
        this.acceleration = 0;
        this.playBottleSplashAnimation = true;
        this.bottleSplashed = true;
    }

    /**
     * This function gives us the conditions needed to throw a bottle to the right
     * 
     * @returns true if bottle is above ground and the fly direction is right
     */
    bottleIsAboveGroundAndThrowToRightSide(){
        return !this.objectHitGround() && this.bottleFlyDirection == 'right';
    }

    /**
     * This function gives us the conditions needed to throw a bottle to the left
     * 
     * @returns true if bottle is above ground and the fly direction is left
     */
    bottleIsAboveGroundAndThrowToLeftSide(){
        return !this.objectHitGround() && this.bottleFlyDirection == 'left';
    }

    /**
     * This function throws a bottle to the rightside and plays the throw animation
     * 
     */
    bottleIsFlyingToRight() {
        this.x += 10;
        this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }

    /**
     * This function throws a bottle to the leftsside and plays the throw animation
     * 
     */
    bottleIsFlyingToLeft(){
        this.x -= 10;
        this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }

    /**
     * This function checks if bottle hits ground
     * 
     * @returns true if bottle hits ground
     */
    bottleHitsGround(){
        return this.objectHitGround();
    }
}
