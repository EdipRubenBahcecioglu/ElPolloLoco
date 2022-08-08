class Background extends MoveableObject{
    height = 50;
    width = 300;
    x = 0;
    y = 100;

    constructor() { // Jede Classe hat ein Constructor. Innerhalb dieses Constructors werden die Sachen eingetragn, die sofort ausgeführt werden sollen
        super().loadImage('../img/5_background/layers/1_first_layer/2.png'); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        //console.log('My Background', world.background);
    }
}