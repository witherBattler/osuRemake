var music
var musicPlaying = false;
var updateFrames = 0;
function setup() {
    music = loadSound("music/music1.mp3", function() {
        music.play()
        musicPlaying = true;
    })
}


function draw() {
    if(musicPlaying) {

    }
}

function manageMusic1() {
    updateFrames++;
}