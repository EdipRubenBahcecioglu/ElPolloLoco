class DrawableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {}; // Bilderspeicher // Alle Bilder werden hier rein geladen
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) { // arr = Array // Der Paramenter arr entspricht dem Arrayparameter aus Zeile 10 des Char.class.js
        arr.forEach((path) => { // For Each = Die Funktion wird solange ausgeführt, bis jedes einzelne Element aus dem Array diese Funktion ausgeführt wurde // Das Wort Path kann man sich frei ausdenken, dieser Paramenter wird von nirgendwo anders weitergegeben
            let img = new Image(); // neues Bild wird erstellt
            img.src = path // Die Quelle des Bildes ist der aktuelle Arraydurchlaufsparameter und wird dem Objekt aus Zeile 16 new Image zugewiesen
            this.imageCache[path] = img; // Das aktuelle Bild wird dem JSON aus Zeile 7 hinzugefügt
        });

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Wir zeichnen in das Spielfeld im Context 2D das Parameterbild, Parameter x Achse, Parameter Y Achse, Parameter Breite. Parameter Höhe
    }

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Heart || this instanceof ChickenSmall || this instanceof Chicken || this instanceof Coin || this instanceof Endboss || this instanceof Bottle) { // Instanceof bedeutet, dass nur ein Rahmen um Objekte gezeichnet wird, die entweder der Instance Charakter oder Chicken besitzen, andere Objekte wie z.B. Cloud(Wolke) wird kein Rahmen gezeichnet
            // ctx.beginPath(); // Ab hier und die nächsten 4 Zeilen, zeichen wir ein Viereck um ein Obkjekt
            // ctx.lineWidth = '3'; // Liniendicke
            // ctx.strokeStyle = 'blue'; // Linienfarbe
            // ctx.rect(this.x, this.y, this.width, this.height); // Linienposition
            // ctx.stroke();
        }
    }

}


