class Character extends MoveableObject {

    height = 250;
    width = 100;
    x = 10;
    y = 170;
    speed = 10;
    otherDirection = false;

    offset = {
        top: 110,
        bottom: 30,
        left: 40,
        right: 20
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'

    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    world; // In dieser Variable ist der Komplette Inhalt der World Classe enthalten
    //walking_sound = new Audio('audio/walking.mp3'); // SOUND FUCKT AB ########################


    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png'); // Super kann 1x im Constructor verwendet werden, dannach nur noch this. (Wie Zeile 10)
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            //this.walking_sound.pause(); // Sound aus Zeile 19 wird pausiert bevor er neu abgespielt wird, da sonst der Sound dauerhaft laufen würde // ################# SOUND FUCKT AB
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) { // Wenn Keyboard right == true ist, dann sollen die Bilder ausgetauscht werden (Zeile 41) und der Char sich bewegen // && this.x < this.world.level.level_end_x bedeutet, dass unser Char nur soweit nach rechts laufen kann bis die Variable level_end_x (hier 2200px) erreicht ist
                this.moveRight();
                this.otherDirection = false;
                //this.walking_sound.play(); // Wenn der Char läuft wird der Sound aus Zeile 19 abgespielt // SOUND FUCKT AB ###############################
            }

            if (this.world.keyboard.left && this.x > 0) {  // && this.x > 0 bedeutet, dass der Char nur nach links gehen kann wenn er bereits vorher nach rechts gelaufen ist d.h. er kann nicht nach links außerhalb der map laufen
                this.moveLeft();
                this.otherDirection = true;
                //this.walking_sound.play(); // Wenn der Char läuft wird der Sound aus Zeile 19 abgespielt // SOUND FUCKT AB ###############################
            }
            this.world.camera_x = -this.x + 100; // +100 bedeutet, dass unser Char immer 100px standardgemäß weiter rechts auf der x Achse positioniert wird

            if (this.world.keyboard.space && !this.isAboveGround()) { // Wenn Leerzeichentaste gedrückt wird und der char sich nicht(!) über dem Boden befindet...
                this.jump();
            }

        }, 1000 / 60); // 1000 / 60 = 60 FPS

        setInterval(() => {

            if (this.isDead()) { // Wenn isDead in der moveObj = true ist dann ...
                this.playAnimation(this.IMAGES_DEAD); // .. werden die Bilder vom Tod nacheinander abgepsielt
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) { // Wenn unser Char sich in der luft befindet, dann soll der Array aus Zeile 19 die verschiedenen Bilder abspielen
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.right || this.world.keyboard.left) { // Wenn Keyboard right == true ist, dann sollen die Bilder ausgetauscht werden und der Char sich bewegen // ODER (||) Wenn Keyboardtaste left == true ist
                    // LAUF ANIMATION
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 150); // Bilder ändern sich jede 50 Milisekunden
    }
}