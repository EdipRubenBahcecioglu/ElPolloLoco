class Heart extends MoveableObject{

    constructor(x, y){
        super().loadImage('img/heart/heart.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
    }
}    