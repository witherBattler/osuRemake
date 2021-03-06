//Assets
var musics = []
var snare
var allerFont

//Variables
let bubbleEffects = []
let onFireCounter = 0
let onFireChangeDivider = 12;
let paused = false;
let level;
let amp;
var pointerCursor = false;
var stage = "loading"
var updateFrames = 0;
var score = 0;
var animationValues = {
    assetsLoadedCount: 0,
    assetsToLoadCount: 9,
}
var bubbles = [];
function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    for(var i = 0; i != soundtracks.length; i++) {
        musics.push(loadSound(soundtracks[i].songPath, function() {
            animationValues.assetsLoadedCount++;
        }))
    }
    for(var i = 0; i != musics.length; i++) {
        musics[i].onended(function() {
            if(stage == "game" && updateFrames > 60 && !paused){
                stage = "menu";
                musics[soundtrackIndex].play()
                localStorage.setItem(soundtracks[soundtrackIndex].name, score)
            }
        })
    }
    snare = loadSound("music/snare.mp3", function() {
        animationValues.assetsLoadedCount++;
    })
    allerFont = loadFont("fonts/Aller.ttf", function() {
        animationValues.assetsLoadedCount++;
    })
    amp = new p5.Amplitude()
    checkHighScores()
    frameRate(60)
}
var effects = [{}]


function draw() {
    switch(stage) {
        case "game":
            background(lightenDarkenColor(soundtracks[soundtrackIndex].backgroundColor, Math.round(level * 100)))
            textSize(40)
            noStroke()
            fill(soundtracks[soundtrackIndex].secondColor)
            textAlign(LEFT, TOP)
            text(score, 10, 5);
            rectMode(CORNER)
            rect(20 + textWidth(score), 7, onFireCounter, 40)
            fill(soundtracks[soundtrackIndex].backgroundColor)
            text(onFireCounter, 25 + textWidth(score), 5)
            fill("red")
            if(onFireCounter > 200) {
                text("W", 30 + textWidth(score) + onFireCounter, 5)
            }
            noStroke();
            fill("black")
            ellipse(window.innerWidth / 2, window.innerHeight / 2, level * (window.innerWidth / 2))
            if(!paused) {
                onFireCounter -= 1
                onFireCounter = Math.max(onFireCounter, 0)
                updateFrames++;
                //Visualize audio:
                if(level != undefined) {
                    level = (level + level + level + level + amp.getLevel()) / 5
                } else {
                    level = amp.getLevel()
                }
                fill("white")
                textAlign(CENTER, CENTER)
                textFont(allerFont)
                textSize(30)
                noStroke()
                text("Right click anywhere to pause", window.innerWidth / 2, window.innerHeight - 100)
                renderBubbleEffects()
            }
            textFont(allerFont)
            textSize(80)
            noStroke()
            fill(soundtracks[soundtrackIndex].secondColor)
            textAlign(CENTER, CENTER);
            text(soundtracks[soundtrackIndex].name, window.innerWidth / 2, window.innerHeight / 2 - 5)
            
            drawBubbles()
            if(paused) {
                background("rgba(0, 0, 0, 0.5)")
                fill("white")
                textAlign(CENTER, CENTER)
                textFont(allerFont)
                textSize(30)
                noStroke()
                text("Click here to continue", window.innerWidth / 2, window.innerHeight - 100)
                textSize(100)
                text("PAUSED!", window.innerWidth / 2, window.innerHeight / 3)
                noFill();
                stroke(soundtracks[soundtrackIndex].secondColor)
                strokeWeight(5)
                rectMode(CENTER)
                rect(window.innerWidth / 2, window.innerHeight - 225, window.innerWidth / 3, 50, 15, 15, 15, 15)
                rect(window.innerWidth / 2, window.innerHeight - 325, window.innerWidth / 3, 50, 15, 15, 15, 15)
                noStroke();
                fill(soundtracks[soundtrackIndex].secondColor)
                textSize(35)
                text("Back to menu", window.innerWidth / 2, window.innerHeight - 225 - 5)
                text("Retry", window.innerWidth / 2, window.innerHeight - 325 - 5)
                mouseIsOverButton(window.innerWidth / 2, window.innerHeight - 225, window.innerWidth / 3, 50, function() {
                    pointerCursor = true;
                })
                mouseIsOverButton(window.innerWidth / 2, window.innerHeight - 325, window.innerWidth / 3, 50, function() {
                    pointerCursor = true;
                })
                mouseIsOverButton(window.innerWidth / 2, window.innerHeight - 100, window.innerWidth, 80, function() {
                    pointerCursor = true;
                })
            }
            break;
        case "loading":
            background("grey");
            rectMode(CORNER);
            stroke("black")
            strokeWeight(5);
            fill("white")
            rect(window.innerWidth / 4, window.innerHeight / 2 - 20, window.innerWidth / 2, 40)
            fill("black")
            rect(window.innerWidth / 4, window.innerHeight / 2 - 20, window.innerWidth / 2 * animationValues.assetsLoadedCount / animationValues.assetsToLoadCount, 40)
            noStroke();
            textFont("Arial")
            textAlign(CENTER, CENTER)
            textSize(30)
            fill("black")
            text("Loading game assets...", window.innerWidth / 2, window.innerHeight / 2 - 60)
            var additionalText = "";
            if(animationValues.assetsLoadedCount == animationValues.assetsToLoadCount) {
                additionalText = ", click anywhere on the screen to begin."
            }
            text("(" + Math.round(animationValues.assetsLoadedCount / animationValues.assetsToLoadCount * 100) + "%" + additionalText + ")", window.innerWidth / 2, window.innerHeight / 2 + 60)
            
            break;
        case "menu":
            background(soundtracks[soundtrackIndex].backgroundColor)
            noStroke();
            fill("#ff66aa")
            textAlign(CENTER, CENTER)
            textFont(allerFont)
            textSize(60)
            text("osu!", window.innerWidth / 2, 60)
            noFill()
            stroke(soundtracks[soundtrackIndex].secondColor)
            strokeWeight(5)
            rectMode(CENTER)
            rect(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 3, 50, 15, 15 ,15 ,15)
            noStroke();
            fill(soundtracks[soundtrackIndex].secondColor)
            textSize(35)
            text("Play", window.innerWidth / 2, window.innerHeight / 2 - 7)
            var triangleBaseLeft = {x: window.innerWidth / 3 + 30, y: window.innerHeight / 2 - 60}
            var triangleBaseRight = {x: (window.innerWidth / 3) * 2 - 30, y: window.innerHeight / 2 - 60}
            triangle(triangleBaseLeft.x - 20, triangleBaseLeft.y, triangleBaseLeft.x + 10, triangleBaseLeft.y - 20, triangleBaseLeft.x + 10, triangleBaseLeft.y + 20)
            triangle(triangleBaseRight.x + 20, triangleBaseRight.y, triangleBaseRight.x - 10, triangleBaseRight.y - 20, triangleBaseRight.x - 10, triangleBaseRight.y + 20)
            text(soundtracks[soundtrackIndex].name, window.innerWidth / 2, triangleBaseLeft.y - 3)
            textSize(25)
            text("Highscore: " + localStorage.getItem(soundtracks[soundtrackIndex].name), window.innerWidth / 2, window.innerHeight / 2 - 100)
            if(mouseY > triangleBaseLeft.y - 20 && mouseY < triangleBaseLeft.y + 20){
                if(mouseX > triangleBaseLeft.x - 20 && mouseX < triangleBaseLeft.x + 10) {
                    pointerCursor = true
                } else if(mouseX > triangleBaseRight.x - 10 && mouseX < triangleBaseRight.x + 20) {
                    pointerCursor = true
                }
            }
            mouseIsOverButton(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 3, 50, function() {
                pointerCursor = true;
            })
            break;
    }
    updateCursor()
}


function drawBubbles() {
    for(var i = 0; i != bubbles.length; i++) {
        if(!bubbles[i].clicked){
            if(bubbles[i].frames > updateFrames && bubbles[i].frames - 20 < updateFrames) {
                if(soundtracks[soundtrackIndex].bubbleColoring != undefined) {
                    fill(soundtracks[soundtrackIndex].fillColor)
                } else {
                    fill("blue")
                }
                circle(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, 100 + onFireCounter / onFireChangeDivider)
            }
            if(bubbles[i].frames >= updateFrames && bubbles[i].frames - 60 <= updateFrames) {
                if(soundtracks[soundtrackIndex].bubbleColoring == undefined) {
                    percentage = Math.round(Math.abs(bubbles[i].frames - updateFrames) * 1.66666666666666666)
                    stroke("rgb(0, 0, " + (255 - Math.round(percentage * 2.55)) + ")")
                } else {
                    percentage = Math.round(Math.abs(bubbles[i].frames - updateFrames) * 1.66666666666666666)
                    soundtracks[soundtrackIndex].bubbleColoring()
                }
                strokeWeight(5 + onFireCounter / onFireChangeDivider / 10)
                noFill()
                circle(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, 100 + onFireCounter / onFireChangeDivider)
                circle(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, 100 + Math.abs(bubbles[i].frames - updateFrames + onFireCounter / onFireChangeDivider) * 2)
            }
            if(bubbles[i].frames == updateFrames) {
                score -= 500;
                score = Math.max(score, 0)
                onFireCounter -= 50
                onFireCounter = Math.max(onFireCounter, 0)
            }
        }
        
    }
}


function drawEffects() {
    for(var i = 0; i != effects.length; i++) {
        switch(effects[i].type) {
            case "text":
                textFont(effects[i].font)
                textSize(effects[i].size)
                textAlign(CENTER, CENTER)
                strokeWeight(effects[i].strokeWeight)
                stroke(effects[i].stroke)
                fill(effects[i].color)
                text(effects[i].text, effects[i].x, effects[i].y)
        }
    }
}

function mouseIsOverButton(x, y, width, height, funcToExecute) {
    var left = x - width / 2
    var right = x + width / 2
    var top = y - height / 2
    var bottom = y + height / 2
    if(mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
        funcToExecute()
        pointerCursor = true;
    }
}

function updateCursor() {
    if(pointerCursor) {
        cursor("pointer")
        pointerCursor = false;
    } else {
        cursor("default")
    }
}

function getEffectById(id) {
    for(var i = 0; i != effects.length; i++) {
        if(effects[i].id == id) {
            return effects[i]
        }
    }
    return null;
}

function touchStarted() {
    switch(stage) {
        case "menu":
            if(mouseButton == LEFT){
                mouseIsOverButton(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 3, 50, function() {
                    updateFrames = 0;
                    musics[soundtrackIndex].stop()
                    musics[soundtrackIndex].play()
                    stage = "game"
                    score = 0;
                    bubbles = JSON.parse(JSON.stringify(soundtracks[soundtrackIndex].bubbles))
                    randomizeBubbles()
                })
                var triangleBaseLeft = {x: window.innerWidth / 3 + 30, y: window.innerHeight / 2 - 60}
                var triangleBaseRight = {x: (window.innerWidth / 3) * 2 - 30, y: window.innerHeight / 2 - 60}
                if(mouseY > triangleBaseLeft.y - 20 && mouseY < triangleBaseLeft.y + 20){
                    if(mouseX > triangleBaseLeft.x - 20 && mouseX < triangleBaseLeft.x + 10) {
                        musics[soundtrackIndex].stop()
                        if(soundtrackIndex != 0) {
                            soundtrackIndex--;
                        } else {
                            soundtrackIndex = soundtracks.length - 1;
                        }
                        musics[soundtrackIndex].play()
                    } else if(mouseX > triangleBaseRight.x - 10 && mouseX < triangleBaseRight.x + 20) {
                        musics[soundtrackIndex].stop()
                        if(soundtrackIndex != soundtracks.length - 1) {
                            soundtrackIndex++;
                        } else {
                            soundtrackIndex = 0;
                        }
                        musics[soundtrackIndex].play()
                    }
                }
            }
            break;
        case "game":
            if(mouseButton == LEFT){
                var bubbleClicked = false;
                for(var i = 0; i != bubbles.length; i++) {
                    if(!bubbles[i].clicked){
                        if(bubbles[i].frames > updateFrames && bubbles[i].frames - 20 < updateFrames && dist(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, mouseX, mouseY) < 60) {
                            bubbleClicked = true;
                            bubbles[i].clicked = true;
                            createBubbleClickedEffect(bubbles[i].x, bubbles[i].y, 100 + onFireCounter / onFireChangeDivider)
                        }
                    }
                }
                if(bubbleClicked == true) {
                    snare.play()
                    score += 500
                    onFireCounter += 50
                    onFireCounter = Math.min(300, onFireCounter);
                } else {
                    if(!paused) {
                        score -= 500
                        score = Math.max(score, 0)
                        onFireCounter = 0
                    }
                }
                if(paused) {
                    if(mouseY < window.innerHeight - 60 && mouseY > window.innerHeight - 140){
                        paused = false;
                        musics[soundtrackIndex].play()
                    }
                    mouseIsOverButton(window.innerWidth / 2, window.innerHeight - 225, window.innerWidth / 3, 50, function() {
                        paused = false;
                        musics[soundtrackIndex].stop()
                        musics[soundtrackIndex].play()
                        stage = "menu";
                    })
                    mouseIsOverButton(window.innerWidth / 2, window.innerHeight - 325, window.innerWidth / 3, 50, function() {
                        updateFrames = 0;
                        musics[soundtrackIndex].stop()
                        musics[soundtrackIndex].play()
                        score = 0;
                        bubbles = JSON.parse(JSON.stringify(soundtracks[soundtrackIndex].bubbles))
                        randomizeBubbles()
                        paused = false;
                    })
                }
            } else if(mouseButton == RIGHT) {
                if(!paused){
                    paused = true;
                    musics[soundtrackIndex].pause()
                }
            }
            break;
        case "loading":
            if(mouseButton == LEFT){
                if(animationValues.assetsLoadedCount == animationValues.assetsToLoadCount) {
                    stage = "menu";
                    musics[soundtrackIndex].play()
                }
            }
            break;
    }

}
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState != "visible") {
        if(stage == "game") {
            paused = true;
            musics[soundtrackIndex].pause()
        }
    }
});

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function checkHighScores() {
    for(var i = 0; i != soundtracks.length; i++) {
        console.log(soundtracks[i].name)
        if(localStorage.getItem(soundtracks[i].name) == null) {
            localStorage.setItem(soundtracks[i].name, 0)
        }
    }
}





const mapCreating = true;
var bubblesCreator = [
    
]

function keyPressed() {
    if(mapCreating){
        if(keyCode == 65) {
            bubblesCreator.push({x: 0, y: 0, frames: updateFrames, clicked: false})
        } else if(keyCode == 83) {
            console.log(JSON.stringify(bubblesCreator))
        }
    }
}

function lightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);

}

function createBubbleClickedEffect(x, y, size) {
    var color;
    if(soundtracks[soundtrackIndex].bubbleColoring != undefined) {
        color = soundtracks[soundtrackIndex].fillColor
    } else {
        color = "blue"
    }
    bubbleEffects.push({x: x, y: y, size: size, color: color, frames: 0})
}

function renderBubbleEffects() {
    var elementsToRemove = []
    for(var i = 0; i != bubbleEffects.length; i++) {
        bubbleEffects[i].frames++;
        bubbleEffects[i].size += 4
        stroke(bubbleEffects[i].color)
        noFill()
        circle(bubbleEffects[i].x * window.innerWidth, bubbleEffects[i].y * window.innerHeight, bubbleEffects[i].size)
        if(bubbleEffects[i].frames >= 60){
            elementsToRemove.unshift(i)
        }
    }
    for(var i = 0; i != elementsToRemove.length; i++) {
        bubbleEffects.splice(elementsToRemove[i], 1)
    }
}

function randomizeBubbles() {
    let lastPosition = {x: 0.5, y: 0.5}
    let bubbleXBad = false;
    let bubbleYBad = false;
    for(var i = 0; i != bubbles.length; i++) {
        bubbles[i].x = lastPosition.x
        bubbles[i].y = lastPosition.y
        if(!bubbleXBad){
            console.log("2")
            bubbles[i].x += (Math.random() - 0.5) / 1.5
        } else {
            console.log("1")
            if(Math.abs(bubbles[i].x - 0) > Math.abs(bubbles[i].x - 1)) {
                bubbles[i].x -= 0.2
            } else {
                bubbles[i].x += 0.2
            }
        }
        if(!bubbleYBad){
            console.log("2")
            bubbles[i].y += (Math.random() - 0.5) / 1.5
        } else {
            console.log("1")
            if(Math.abs(bubbles[i].y - 0) > Math.abs(bubbles[i].y - 1)) {
                bubbles[i].y -= 0.2
            } else {
                bubbles[i].y += 0.2
            }
        }
        bubbleXBad = false;
        bubbleYBad = false;
        if(bubbles[i].x > 0.6 || bubbles[i].x < 0.4) {
            bubbleXBad = true;
        }
        if(bubbles[i].y > 0.6 || bubbles[i].y < 0.4) {
            bubbleYBad = true;
        }
        lastPosition = {x: bubbles[i].x, y: bubbles[i].y}
    }
}

