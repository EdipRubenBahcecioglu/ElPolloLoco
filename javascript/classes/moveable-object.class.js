class MoveableObject { // Class = Eine Schablone, die uns verrät welche Felder bzw. Variablen enthalen sein sollen
    x;
    y;
    img;
    height = 120;
    width = 50;
    imageCache = {}; // Bilderspeicher // Alle Bilder werden hier rein geladen
    currentImage = 0;
    speed = 0.15;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){ // arr = Array // Der Paramenter arr entspricht dem Arrayparameter aus Zeile 10 des Char.class.js
        arr.forEach((path) =>{ // For Each = Die Funktion wird solange ausgeführt, bis jedes einzelne Element aus dem Array diese Funktion ausgeführt wurde // Das Wort Path kann man sich frei ausdenken, dieser Paramenter wird von nirgendwo anders weitergegeben
            let img = new Image(); // neues Bild wird erstellt
            img.src = path // Die Quelle des Bildes ist der aktuelle Arraydurchlaufsparameter und wird dem Objekt aus Zeile 16 new Image zugewiesen
            this.imageCache[path] = img; // Das aktuelle Bild wird dem JSON aus Zeile 7 hinzugefügt
        });

    }


    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){
        setInterval(() => { // setInterval ermöglicht es uns eine Funktion mehrmals auszuführen
            this.x -= this.speed; // Alle 16 Millisekunden wird die X Achse um 0.15 px verringert
        }, 1000 / 60) // Alle 16 Milisekunden wird die Funktion setInterval erneut ausgeführt // 1000: 60 = 60 FPS
    }
}

