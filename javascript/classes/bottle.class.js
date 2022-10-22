class Bottle extends MoveableObject{

    constructor(x, y, imgPathBottle){
        super().loadImage(imgPathBottle);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
    }
}