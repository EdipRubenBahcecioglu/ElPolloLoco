let canvas;
let ctx;
let world;

function init(){
    canvas = document.getElementById('canvas'); // Der Variable Canvas wird das HTML Element mit der jeweiligen ID zugewiesen 
    world = new World(canvas); // Wir legen eine neues Objekt (World) an und geben das HTML Element Canvas mit

    console.log('My Character is', world.character);
    console.log('My Enemie is', world.enemies);
}