class Coin extends MoveableObject{

    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 250 + Math.random() * 2000;
        this.y =  25 + Math.random() * 100;
        this.height = 100;
        this.width = 100;

    }
}    