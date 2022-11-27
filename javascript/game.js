let canvas; // = Spielfeld
let ctx; // 
let world;
let repeatAudio = false;
let worldWasSet = false;

/**
 * This function initializes the game and closes certain containers. It also hides icons.
 * 
 * @param {string} startOption - this variable can be first start or replay
 */
async function initGame(startOption) {
    await closeContainers();
    await initLevel();
    await init(startOption);
    removeIcons();
}

/**
 * This function sets the game and starts the background music. It also hide buttons. 
 * 
 * @param {*} startOption - this variable can be first start or replay
 */
async function init(startOption) {
    await setWorld();
    playBackgroundMusic();
    checkGameStatus();
    if (startOption == 'firstStart') {
        hideButton('start-button');
    }
}

/**
 * This function sets a new World and a new Keyboard object. The canvas is also defined.
 * 
 */
async function setWorld() {
    canvas = document.getElementById('canvas'); // Der Variable Canvas wird das HTML Element mit der jeweiligen ID zugewiesen // Canvas = Spielfeld 
    let keyboard = new Keyboard();
    world = new World(canvas, keyboard); // Wir legen eine neues Objekt (World) an und geben das HTML Element Canvas (Spielfeld) mit // Der Parameter Canvas wird dem Constructor aus der Klasse World weitergegebens
    worldWasSet = true;
}

/**
 * This function clears the whole level
 * 
 */
async function clearGame() {
    await clearLevel();
    await world.clearCharacter();
}

/**
 * This function closes containers based on the id's
 * 
 */
async function closeContainers() {
    await closeContainer('start-screen');
    await closeContainer('end-screen-lose');
    await closeContainer('end-screen-win');
}

/**
 * This function set the z-index of elements based on the id´s
 * 
 */
function removeIcons() {
    document.getElementById('mobile-movement').classList.add('z-index1');
    document.getElementById('mobile-doge-attack').classList.add('z-index1');
    document.getElementById('mobile-start-game').classList.add('z-index1');
    document.getElementById('mobile-guide-mute').classList.add('z-index1');
    document.getElementById('mobile-play').classList.add('d-none');
    // document.getElementById('mobile-replay').classList.add('d-none');
}

/**
 * This function closes containers
 * 
 * @param {string} containerId - id of container that will be closed
 */
async function closeContainer(containerId) {
    document.getElementById(`${containerId}`).classList.add('d-none');
}

/**
 * This function opens containers
 * 
 * @param {*} containerId - id of container that will be opened
 */
function openContainer(containerId) {
    document.getElementById(`${containerId}`).classList.remove('d-none');
}

/**
 * This function mutes the whole game
 * 
 */
function muteGame() {
    document.getElementById('volume-on').classList.add('d-none');
    document.getElementById('volume-mute').classList.remove('d-none');
    document.getElementById('volume-on-mobile').classList.add('d-none');
    document.getElementById('volume-mute-mobile').classList.remove('d-none');
    world.allAudioSounds.forEach((audio) => {
        audio.muted = true;
    });
}

/**
 * This function entmutes the whole game
 * 
 */
function entmuteGame() {
    document.getElementById('volume-on').classList.remove('d-none');
    document.getElementById('volume-mute').classList.add('d-none');
    document.getElementById('volume-on-mobile').classList.remove('d-none');
    document.getElementById('volume-mute-mobile').classList.add('d-none');
    world.allAudioSounds.forEach((audio) => {
        audio.muted = false;
    });
}

/**
 * This function plays the background music and contolls the audio volume
 * 
 */
function playBackgroundMusic() {
    world.backgroundMusic.play();
    world.backgroundMusic.volume = 0.01;
}

/**
 * This function checks if the user ist loosing or winning and shows the suitable screen
 * 
 */
function checkGameStatus() {
    setInterval(() => {
        if (characterIsDead() && repeatAudio == false) {
            gameIsLosed();
            showStartScreen();
        } else if (endbossisDead() && repeatAudio == false) {
            gameIsWon();
            showStartScreen();
        }
    }, 1000 / 60);
}

/**
 * If game is won the win screen will pop up and the win sound plays
 * 
 */
function gameIsWon() {
    world.gameWonSound.play();
    showWinScreen();
    repeatAudio = true;
}

/**
 * If game is lost the lose screen will pop up and the lose sound plays
 * 
 */
function gameIsLosed() {
    world.gameLoseSound.play();
    showLoseScreen();
    repeatAudio = true;
}

/**
 * This function shows the start screen after winnung or losing the game
 * 
 */
function showStartScreen() {
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}

/**
 * This function checks if the requirements are met if a character is dead
 * 
 * @returns true when character is dead
 */
function characterIsDead() {
    return world.character.energyChar <= 0 && world.level.bosses[0].energyBoss > 0;
}

/**
 * This function checks if the requirements are met if a endboss is dead
 * 
 * @returns true when endboss is dead
 */
function endbossisDead() {
    return world.level.bosses[0].energyBoss <= 0 && world.character.energyChar > 0;
}

/**
 * This function shows the lose screen after a timeout
 * 
 */
function showLoseScreen() {
    setTimeout(() => {
        document.getElementById('end-screen-lose').classList.remove('d-none');
        document.getElementById('end-screen-win').classList.add('d-none');
        muteGame();
    }, 2000);
    stopAudio(world.backgroundMusic);
}

/**
 * This function shows the win screen after a timeout
 * 
 */
function showWinScreen() {
    setTimeout(() => {
        document.getElementById('end-screen-win').classList.remove('d-none');
        document.getElementById('end-screen-lose').classList.add('d-none');
        muteGame();
    }, 2000);
    stopAudio(world.backgroundMusic);
}

/**
 * This function stops a audiosound
 * 
 * @param {string} audioSound - Audio sound that is stopped
 */
function stopAudio(audioSound) {
    audioSound.pause();
}

/**
 * This function hides a button 
 * 
 * @param {string} idOfButton - this is the id of button
 */
function hideButton(idOfButton) {
    document.getElementById(`${idOfButton}`).classList.add('d-none');
}

/**
 * This function shows a button
 * 
 * @param {string} idOfButton - this is the id of button
 */
function showButton(idOfButton) {
    document.getElementById(`${idOfButton}`).classList.remove('d-none');
}

/**
 * This function changes the gamefield to fullsize
 * 
 */
function gameInFullsize() {
    let gamefield = document.getElementById('gamefield');
    enterFullscreen(gamefield);
}

/**
 * This function enters the fullscreen
 * 
 * @param {string} element - which element is going to be fullscreen
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * This function exits the fullscreen
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}