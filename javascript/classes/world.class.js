class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];

    backgroundObject = [
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0), // Wir geben den Contructor aus der Klasse BackgroundObjects diese Parameter weiter (Bild / Achse)
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0)
    ];
    
    ctx; // Innerhalb des Speilfelds legen wir in Zeile 22 fest, dass im 2D Format gespielt wird
    canvas; // = Spielfeld

    constructor(canvas){
        this.ctx = canvas.getContext('2d'); // Mithilfe von getContext haben wir die Möglichkeit innerhlab des Canvas ein 2D Format darstellen zu lassen bzw. zu zeichnen
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Diese Funktion löscht Quasi den Inhalt des Canvas bevor er neu in Zeile 18 gezeichnet wird // Erste Parameter = X Achse, Zweite Parameter = Y Achse, Dritte Parameter Spielfeldbreite, Vierte Parameter = Spielfeldhöhe
        
        this.addObjectsToMap(this.backgroundObject); // Wir geben den Inhalt aus dem Array Zeile 13/14/15... an die Funktion weiter
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);


        let self = this;
        requestAnimationFrame(function() { // Mithilfe dieser Funktion wird die draw Funktion, sobald die einmal geladen wurde, zich mal pro Sekunde ausgeführt
            self.draw(); // Die Funktion requestAnimationFrame kennt das Programmierwort "this" nicht, daher müssen wir hier einen kleinen Umweg gehen und das Wort this in einer Variable festlegen
        });
    }

    addObjectsToMap(objects){ // Object = Arrayinhalt aus Zeile 30 z.B. 
        objects.forEach(object =>{ // For Each ist eine Art For Schleife // Die Funktion addObjectsToMap wird so oft ausgeführt bis jedes einzelne Element aus dem Array ausgelesen wurde
            this.addToMap(object); // Wir geben den Parameter (Inhalt vom Array) an die nächste Funktion weiter
        });
    }

    addToMap(mo){ // mo = Movable Objekt // Parameter aus Zeile 44
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // Wir zeichnen in das Spielfeld im Context 2D das Parameterbild, Parameter x Achse, Parameter Y Achse, Parameter Breite. Parameter Höhe
    }
}