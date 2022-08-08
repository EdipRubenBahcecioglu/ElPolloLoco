class MoveableObject { // Class = Eine Schablone, die uns verrät welche Felder bzw. Variablen enthalen sein sollen
    x = 20;
    y = 70;
    img;
    height = 80;
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

