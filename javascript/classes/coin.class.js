class Coin extends MoveableObject{

    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 250 + Math.random() * 2200;
        this.y =  50 + Math.random() * 200;
        this.height = 100;
        this.width = 100;

    }
}    