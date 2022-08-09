class MoveableObject { // Class = Eine Schablone, die uns verrät welche Felder bzw. Variablen enthalen sein sollen
    x;
    y;
    img;
    height = 120;
    width = 50;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){
        
    }
}

