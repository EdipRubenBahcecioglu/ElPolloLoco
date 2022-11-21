let canvas; // = Spielfeld
let ctx; // 
let world;
let repeatAudio = false;

async function initGame(startOption) {
    await closeContainers();
    await initLevel();
    await init(startOption);
    removeIcons();
}

async function init(startOption) {
    await setWorld();
    playBackgroundMusic();
    checkGameStatus();
    if (startOption == 'firstStart') {
        hideButton('start-button');
    }
    // // if (startOption == 'restart') {
    // //     hideButton('restart-button');
    // //     setTimeout(() => {
    // //         showButton('restart-button');
    // //     }, 100);
    // //     await clearGame();
    // //     await initGame(); // 
    // }
}
async function setWorld(){
    canvas = document.getElementById('canvas'); // Der Variable Canvas wird das HTML Element mit der jeweiligen ID zugewiesen // Canvas = Spielfeld 
    let keyboard = new Keyboard();
    world = new World(canvas, keyboard); // Wir legen eine neues Objekt (World) an und geben das HTML Element Canvas (Spielfeld) mit // Der Parameter Canvas wird dem Constructor aus der Klasse World weitergegebens
}

async function clearGame() {
    await clearLevel();
    await world.clearCharacter();
}

async function closeContainers(){
    await closeContainer('start-screen');
    await closeContainer('end-screen-lose');
    await closeContainer('end-screen-win');
}

function removeIcons(){
    document.getElementById('mobile-movement').classList.add('z-index1');
    document.getElementById('mobile-doge-attack').classList.add('z-index1');
    document.getElementById('mobile-start-game').classList.add('z-index1');
    document.getElementById('mobile-guide-mute').classList.add('z-index1');
    document.getElementById('mobile-play').classList.add('d-none');
    // document.getElementById('mobile-replay').classList.add('d-none');
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
    document.getElementById('volume-on-mobile').classList.add('d-none');
    document.getElementById('volume-mute-mobile').classList.remove('d-none');
    world.allAudioSounds.forEach((audio) => {
        audio.muted = true;
    });
}

function entmuteGame() {
    document.getElementById('volume-on').classList.remove('d-none');
    document.getElementById('volume-mute').classList.add('d-none');
    document.getElementById('volume-on-mobile').classList.remove('d-none');
    document.getElementById('volume-mute-mobile').classList.add('d-none');
    world.allAudioSounds.forEach((audio) => {
        audio.muted = false;
    });
}

function playBackgroundMusic() {
    world.backgroundMusic.play();
    world.backgroundMusic.volume = 0.01;
}

function checkGameStatus() {
    setInterval(() => {
        if (characterIsDead() && repeatAudio == false) {
            world.gameLoseSound.play();
            showLoseScreen();
            repeatAudio = true;
            showStartScreen();
        } else if (endbossisDead() && repeatAudio == false) {
            world.gameWonSound.play();
            showWinScreen();
            repeatAudio = true;
            showStartScreen();
        }
    }, 1000 / 60);
}

function showStartScreen(){
    setTimeout(()=>{
        window.location.reload();
    }, 5000);
}

function characterIsDead() {
    return world.character.energyChar <= 0 && world.level.bosses[0].energyBoss > 0;
}

function endbossisDead() {
    return world.level.bosses[0].energyBoss <= 0 && world.character.energyChar > 0;
}

function showLoseScreen() {
    setTimeout(() => {
        document.getElementById('end-screen-lose').classList.remove('d-none');
        document.getElementById('end-screen-win').classList.add('d-none');
        muteGame();
    }, 2000);
    stopAudio(world.backgroundMusic);
}

function showWinScreen() {
    setTimeout(() => {
        document.getElementById('end-screen-win').classList.remove('d-none');
        document.getElementById('end-screen-lose').classList.add('d-none');
        muteGame();
    }, 2000);
    stopAudio(world.backgroundMusic);
}

function stopAudio(audioSound) {
    audioSound.pause();
}

function hideButton(idOfButton) {
    document.getElementById(`${idOfButton}`).classList.add('d-none');
}

function showButton(idOfButton) {
    document.getElementById(`${idOfButton}`).classList.remove('d-none');

}

function gameInFullsize() {
    let gamefield = document.getElementById('gamefield');
    enterFullscreen(gamefield);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}