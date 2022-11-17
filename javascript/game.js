let canvas; // = Spielfeld
let ctx; // 
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio('audio/bg_music.mp3');
backgroundMusic.volume = 0.01;

async function initGame(){
    await closeContainer('start-screen');
    await initLevel();
    await init();
}

async function init() {
    canvas = document.getElementById('canvas'); // Der Variable Canvas wird das HTML Element mit der jeweiligen ID zugewiesen // Canvas = Spielfeld 
    world = new World(canvas, keyboard); // Wir legen eine neues Objekt (World) an und geben das HTML Element Canvas (Spielfeld) mit // Der Parameter Canvas wird dem Constructor aus der Klasse World weitergegebens
    playBackgroundMusic();
    checkGameStatus();
}

window.addEventListener("keydown", (event) => { // Mithilfe dieser Eventfunktion wird uns ausgeloggt, was für eine Taste der User gedrückt hat //
    if (event.keyCode == '38') { // 38 = Pfeilhochtaste // Wenn Event mit dem Keycode 38 gedrückt wurde...
        keyboard.up = true; // ... soll die Variable UP auf true geändert werden
    }
    else if (event.keyCode == '40') {
        keyboard.down = true;
    }
    else if (event.keyCode == '37') {
        keyboard.left = true;
    }
    else if (event.keyCode == '39') {
        keyboard.right = true;
    }
    else if (event.keyCode == '32') {
        keyboard.space = true;
    }
    else if (event.keyCode == '68') {
        keyboard.attack = true;
    }
});

window.addEventListener("keyup", (event) => { // Mithilfe dieser Eventfunktion wird uns ausgeloggt, was für eine Taste der User gedrückt hat //
    if (event.keyCode == '38') { // 38 = Pfeilhochtaste // Wenn Event mit dem Keycode 38 losgelassen wurde...
        keyboard.up = false; // ... soll die Variable UP auf false geändert werden
    }
    else if (event.keyCode == '40') {
        keyboard.down = false;
    }
    else if (event.keyCode == '37') {
        keyboard.left = false;
    }
    else if (event.keyCode == '39') {
        keyboard.right = false;
    }
    else if (event.keyCode == '32') {
        keyboard.space = false;
    }
    else if (event.keyCode == '68') {
        keyboard.attack = false;
    }
});

async function closeContainer(containerId) {
    document.getElementById(`${containerId}`).classList.add('d-none');
}

function openContainer(containerId) {
    document.getElementById(`${containerId}`).classList.remove('d-none');
}

function muteGame() {
    document.getElementById('volume-on').classList.add('d-none');
    document.getElementById('volume-mute').classList.remove('d-none');
}

function allowSound() {
    document.getElementById('volume-on').classList.remove('d-none');
    document.getElementById('volume-mute').classList.add('d-none');
}

function playBackgroundMusic() {
    backgroundMusic.play();
}

function checkGameStatus() {
    setInterval(() => {
        if (world.character.energyChar == 0) {
            setTimeout(() => {
                showEndScreen('lose');
                stopAudio(backgroundMusic);
            }, 2000);
        } else if (world.level.bosses[0].energyBoss == 0) {
            setTimeout(() => {
                showEndScreen('win');
                stopAudio();
            }, 2000);
        }
    }, 1000 / 60);
}

function showEndScreen(status) {
    if (status = 'win') {
        document.getElementById('end-screen-win').classList.remove('d-none');
        document.getElementById('end-screen-lose').classList.add('d-none');
    }
    if (status = 'lose') {
        document.getElementById('end-screen-lose').classList.remove('d-none');
        document.getElementById('end-screen-win').classList.add('d-none');
    }
}

function stopAudio(audioSound) {
    audioSound.pause();
}

