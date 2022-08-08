class Cloud extends MoveableObject{
    y = 2;
    width = 270;
    height = 50;
    
    constructor(){ // Jede Classe hat ein Constructor. Innerhalb dieses Constructors werden die Sachen eingetragn, die sofort ausgeführt werden sollen
        super().loadImage('../img/5_background/layers/4_clouds/1.png'); // Mit Super greifen wir auf die übergeordnete Classe zu und führen die Funktion loadImage aus und geben den Parameter mit
        
        this.x = 0 + Math.random() * 40;

}
}