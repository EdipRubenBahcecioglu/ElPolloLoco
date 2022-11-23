class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {}; // Bilderspeicher // Alle Bilder werden hier rein geladen
    currentImage = 0;

    /**
     * This function creates a new image object 
     * 
     * @param {string} path - path of the image that will be created
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function iterates through an array and stores the individual image paths in the image cache
     * 
     * @param {array} arr -  this is the array that will be iterated
     */

    loadImages(arr) { // arr = Array // Der Paramenter arr entspricht dem Arrayparameter aus Zeile 10 des Char.class.js
        arr.forEach((path) => { // For Each = Die Funktion wird solange ausgeführt, bis jedes einzelne Element aus dem Array diese Funktion ausgeführt wurde // Das Wort Path kann man sich frei ausdenken, dieser Paramenter wird von nirgendwo anders weitergegeben
            let img = new Image(); // neues Bild wird erstellt
            img.src = path // Die Quelle des Bildes ist der aktuelle Arraydurchlaufsparameter und wird dem Objekt aus Zeile 16 new Image zugewiesen
            this.imageCache[path] = img; // Das aktuelle Bild wird dem JSON aus Zeile 7 hinzugefügt
        });

    }

    /**
     * With this function we draw the image in the canvas / context
     * 
     * @param {string} ctx - context / canvas / gamefield
     */

    draw(ctx) {
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Wir zeichnen in das Spielfeld im Context 2D das Parameterbild, Parameter x Achse, Parameter Y Achse, Parameter Breite. Parameter Höhe
        } catch(e){
            // console.warn('Error loading image', e);
            // console.log('Could not load image', this.img.src);
        }
    }

    /**
     * This function draws a border arround an object
     * 
     * @param {string} ctx - context / canvas / gamefield
     */

    drawBorder(ctx) {
        // if () { // this instanceof Character// Instanceof bedeutet, dass nur ein Rahmen um Objekte gezeichnet wird, die entweder der Instance Charakter oder Chicken besitzen, andere Objekte wie z.B. Cloud(Wolke) wird kein Rahmen gezeichnet
        //     ctx.beginPath(); // Ab hier und die nächsten 4 Zeilen, zeichen wir ein Viereck um ein Obkjekt
        //     ctx.lineWidth = '3'; // Liniendicke
        //     ctx.strokeStyle = 'blue'; // Linienfarbe
        //     ctx.rect(this.x, this.y, this.width, this.height); // Linienposition
        //     ctx.stroke();
        // }
    }
}


