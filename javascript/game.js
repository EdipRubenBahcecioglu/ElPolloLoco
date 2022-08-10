let canvas; // = Spielfeld
let ctx; // 
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas'); // Der Variable Canvas wird das HTML Element mit der jeweiligen ID zugewiesen // Canvas = Spielfeld 
    world = new World(canvas); // Wir legen eine neues Objekt (World) an und geben das HTML Element Canvas (Spielfeld) mit // Der Parameter Canvas wird dem Constructor aus der Klasse World weitergegeben

    console.log('My Character is', world.character);
    console.log('My Enemie is', world.enemies);
    console.log('Background is', world.backgroundObject);
}

window.addEventListener('keypress', (event) =>{ // Mithilfe dieser Eventfunktion wird uns ausgeloggt, was für eine Taste der User gedrückt hat 
    console.log(event);
})