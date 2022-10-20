class Bottle extends MoveableObject{

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 150 + Math.random()*2000;
        this.y = 350;
        this.width = 70;
        this.height = 70;
    }
}