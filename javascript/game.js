let canvas; // = Spielfeld
let ctx; // 
let world;
let keyboard = new Keyboard();
let repeatAudio = false;

async function initGame(startOption){
    await closeContainer('start-screen');
    await initLevel();
    await init(startOption);
    // controllAudioVolume();
}

async function init(startOption) {
    canvas = document.getElementById('canvas'); // Der Variable Canvas wird das HTML Element mit der jeweiligen ID zugewiesen // Canvas = Spielfeld 
    world = new World(canvas, keyboard); // Wir legen eine neues Objekt (World) an und geben das HTML Element Canvas (Spielfeld) mit // Der Parameter Canvas wird dem Constructor aus der Klasse World weitergegebens
    playBackgroundMusic();
    checkGameStatus();
    if(startOption == 'firstStart'){
        hideButton('start-button');
        showButton('restart-button');
    } 
    if(startOption == 'restart'){
        hideButton('restart-button');
        setTimeout(()=>{
            showButton('restart-button');
        }, 100);
        await clearGame();
        await initGame();
    }
}

async function clearGame(){
    await clearLevel();
    await world.clearCharacter();
}

async function closeContainer(containerId) {
    document.getElementById(`${containerId}`).classList.add('d-none');
}

function openContainer(containerId) {
    document.getElementById(`${containerId}`).classList.remove('d-none');
}

function muteGame() {
    document.getElementById('volume-on').classList.add('d-none');
    document.getElementById('volume-mute').classList.remove('d-none');
    world.allAudioSounds.forEach((audio) => {
        audio.muted = true;
    });
}

function entmuteGame() {
    document.getElementById('volume-on').classList.remove('d-none');
    document.getElementById('volume-mute').classList.add('d-none');
    world.allAudioSounds.forEach((audio) => {
        audio.muted = false;
    });
}

function playBackgroundMusic() {
    world.backgroundMusic.play();
}

function checkGameStatus() {
    setInterval(() => {
        if (characterIsDead() && repeatAudio == false) {
            world.gameLoseSound.play();
            showLoseScreen();
            repeatAudio = true;
        } else if (endbossisDead() && repeatAudio == false) {
            world.gameWonSound.play();
            showWinScreen();
            repeatAudio = true;
        }
    }, 1000 / 60);
}

function characterIsDead(){
    return world.character.energyChar <= 0 && world.level.bosses[0].energyBoss > 0;
}

function endbossisDead(){
    return world.level.bosses[0].energyBoss <= 0 && world.character.energyChar > 0;
}

function showLoseScreen(){
    setTimeout(() => {
        document.getElementById('end-screen-lose').classList.remove('d-none');
        document.getElementById('end-screen-win').classList.add('d-none');
    }, 2000);
    stopAudio(world.backgroundMusic);
}

function showWinScreen(){
    setTimeout(() => {
        document.getElementById('end-screen-win').classList.remove('d-none');
        document.getElementById('end-screen-lose').classList.add('d-none');
    }, 2000);
    stopAudio(world.backgroundMusic);
}

function stopAudio(audioSound) {
    audioSound.pause();
}

function hideButton(idOfButton){
    document.getElementById(`${idOfButton}`).classList.add('d-none');
}

function showButton(idOfButton){
    document.getElementById(`${idOfButton}`).classList.remove('d-none');
    
}

function gameInFullsize(){
    let gamefield = document.getElementById('gamefield');
    enterFullscreen(gamefield);
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
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