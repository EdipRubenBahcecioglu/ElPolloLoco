class Cloud extends MoveableObject {
    y = 2; 
    width = 500;
    height = 250;

    /**
     * Functions within the constructor are executed immediately
     * 
     */
    constructor() { 
        super().loadImage('./img/5_background/layers/4_clouds/1.png'); 
        this.x = Math.random() * 500; 
        this.objectMoveLeft();
    }

    /**
     * This function makes the object move left
     * 
     */
    objectMoveLeft() { 
        this.moveLeft();
        }
    } 