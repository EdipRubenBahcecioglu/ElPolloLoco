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

    background = [
        new Background()
    ];
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d'); // Mithilfe von getContext haben wir die Möglichkeit innerhlab des Canvas ein 2D Format darstellen zu lassen bzw. zu zeichnen
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Diese Funktion löscht Quasi den Inhalt des Canvas bevor er neu in Zeile 18 gezeichnet wird
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.enemies.forEach(enemy => { // For Each Schleife = Wir führen den Code 21 für jedes Element aus dem Array enemies aus, also für das erste Chicken, für das zweite Chicken und für das dritte Chicken
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        })

        this.clouds.forEach(cloud => { // For Each Schleife = Wir führen den Code 21 für jedes Element aus dem Array enemies aus, also für das erste Chicken, für das zweite Chicken und für das dritte Chicken
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        })

        this.background.forEach(background => { // For Each Schleife = Wir führen den Code 21 für jedes Element aus dem Array enemies aus, also für das erste Chicken, für das zweite Chicken und für das dritte Chicken
            this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
        })

        let self = this;
        requestAnimationFrame(function(){ // Mithilfe dieser Funktion wird die draw Funktion, sobald die einmal geladen wurde, zich mal pro Sekunde ausgeführt
            self.draw(); // Die Funktion requestAnimationFrame kennt das Programmierwort "this" nicht, daher müssen wir hier einen kleinen Umweg gehen und das Wort this in einer Variable festlegen
        }); 
    }
}