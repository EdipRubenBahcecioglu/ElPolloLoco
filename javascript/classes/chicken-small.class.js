class ChickenSmall extends MoveableObject { 

    y = 360;
    x = 300 + Math.random() * 1800; 
    height = 50;
    width = 40;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
 
    /**
     * Functions within the constructor are executed immediately
     * 
     */
    constructor(){ 
        super().loadImage(); 
        this.loadChickenSmallImages();
        this.animate();
        this.setChickenSpeedRandomly();
    }

   /**
     * The animation function makes the chicken run to the left and checks if a chicken was attacked
     * 
     */
    animate() {
        setInterval(() =>{ 
            this.moveLeft();
        }, 1000 / 60); 

        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        }, 200); 

        setInterval(()=>{
            if (this.getAttacked()){
                this.playChickenSmallDeadAnimation();
            }
        }, 1000 / 60)
    }

    /**
     * This function loads all small chicken images
     * 
     */
    loadChickenSmallImages(){
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
    }

    /**
     * This function sets the movementspeed of small chicken randomly
     * 
     */
    setChickenSpeedRandomly(){
        this.speed = this.speed + Math.random() * 0.25; 
    }

    /**
     * This function runs the dead animation if small chicken gets attacked
     * 
     */
    playChickenSmallDeadAnimation(){
        this.loadImage(this.IMAGE_DEAD[0]);
        this.speedX = 0;
        this.speed = 0;
        setTimeout(()=>{
            this.height = 0;
            this.width = 0;
        }, 300);
    }
}