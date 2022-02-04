//Assets
var music
var snare
var font1;
var allerFont

//Variables
let level;
let amp;
var pointerCursor = false;
var stage = "loading"
var updateFrames = 0;
var score = 0;
var animationValues = {
    assetsLoadedCount: 0,
    assetsToLoadCount: 4,
}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    music = loadSound("music/music1.mp3", function() {
        animationValues.assetsLoadedCount++;
    })
    snare = loadSound("music/snare.mp3", function() {
        animationValues.assetsLoadedCount++;
    })
    font1 = loadFont("fonts/BADABB__.TTF", function() {
        animationValues.assetsLoadedCount++;
    })
    allerFont = loadFont("fonts/Aller.ttf", function() {
        animationValues.assetsLoadedCount++;
    })
    amp = new p5.Amplitude()
    frameRate(60)
}
var effects = [{}]
var bubbles = [
    {"x":0.2,"y":0.3,"frames":101,"clicked":false},
    {"x":0.25,"y":0.35,"frames":199,"clicked":false},
    {"x":0.3,"y":0.4,"frames":292,"clicked":false},
    {"x":0.4,"y":0.54,"frames":388,"clicked":false},
    {"x":0.5,"y":0.6,"frames":435,"clicked":false},
    {"x":0.6,"y":0.7,"frames":484,"clicked":false},
    {"x":0.5,"y":0.5,"frames":577,"clicked":false},
    {"x":0.5,"y":0.5,"frames":673,"clicked":false},
    {"x":0.6,"y":0.6,"frames":773,"clicked":false},
    {"x":0.4,"y":0.4,"frames":823,"clicked":false},
    {"x":0.4,"y":0.6,"frames":870,"clicked":false},
    {"x":0.6,"y":0.4,"frames":962,"clicked":false},
    {"x":0.5,"y":0.5,"frames":1060,"clicked":false},
    {"x":0.9,"y":0.1,"frames":1156,"clicked":false},
    {"x":0.9,"y":0.2,"frames":1205,"clicked":false},
    {"x":0.9,"y":0.3,"frames":1254,"clicked":false},
    {"x":0.9,"y":0.4,"frames":1346,"clicked":false},
    {"x":0.9,"y":0.5,"frames":1441,"clicked":false},
    {"x":0.9,"y":0.6,"frames":1491,"clicked":false},
    {"x":0.9,"y":0.7,"frames":1540,"clicked":false},
    {"x":0.9,"y":0.9,"frames":1641,"clicked":false},
    {"x":0.9,"y":0.9,"frames":1733,"clicked":false},
    {"x":0.9,"y":0.8,"frames":1827,"clicked":false},
    {"x":0.9,"y":0.7,"frames":1924,"clicked":false},
    {"x":0.9,"y":0.6,"frames":1973,"clicked":false},
    {"x":0.9,"y":0.5,"frames":2021,"clicked":false},
    {"x":0.9,"y":0.4,"frames":2117,"clicked":false},
    {"x":0.9,"y":0.3,"frames":2213,"clicked":false},
    {"x":0.9,"y":0.2,"frames":2307,"clicked":false},
    {"x":0.9,"y":0.1,"frames":2353,"clicked":false},
    {"x":0.2,"y":0.5,"frames":2403,"clicked":false},
    {"x":0.6,"y":0.4,"frames":2452,"clicked":false},
    {"x":0.4,"y":0.7,"frames":2501,"clicked":false},
    {"x":0.9,"y":0.4,"frames":2545,"clicked":false},
    {"x":0.3,"y":0.9,"frames":2594,"clicked":false},
    {"x":0.2,"y":0.9,"frames":2644,"clicked":false},
    {"x":0.6,"y":0.4,"frames":2691,"clicked":false},
    {"x":0.3,"y":0.2,"frames":2737,"clicked":false},
    {"x":0.5,"y":0.5,"frames":2788,"clicked":false},
    {"x":0.5,"y":0.5,"frames":2837,"clicked":false},
    {"x":0.5,"y":0.5,"frames":2883,"clicked":false},
    {"x":0.5,"y":0.5,"frames":2930,"clicked":false},
    {"x":0.6,"y":0.3,"frames":2981,"clicked":false},
    {"x":0.4,"y":0.2,"frames":3030,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3074,"clicked":false},
    {"x":0.9,"y":0.9,"frames":3125,"clicked":false},
    {"x":0.9,"y":0.8,"frames":3174,"clicked":false},
    {"x":0.2,"y":0.1,"frames":3197,"clicked":false},
    {"x":0.4,"y":0.8,"frames":3222,"clicked":false},
    {"x":0.3,"y":0.6,"frames":3245,"clicked":false},
    {"x":0.2,"y":0.3,"frames":3269,"clicked":false},
    {"x":0.3,"y":0.4,"frames":3293,"clicked":false},
    {"x":0.4,"y":0.5,"frames":3315,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3364,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3387,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3413,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3436,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3460,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3482,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3505,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3555,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3579,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3603,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3627,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3650,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3674,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3698,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3724,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3749,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3768,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3785,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3796,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3813,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3830,"clicked":false},
    {"x":0.5,"y":0.5,"frames":3843,"clicked":false},
    {"x":0.7,"y":0.2,"frames":3940,"clicked":false},
    {"x":0.4,"y":0.3,"frames":4037,"clicked":false},
    {"x":0.1,"y":0.9,"frames":4132,"clicked":false},
    {"x":0.1,"y":0.3,"frames":4229,"clicked":false},
    {"x":0.5,"y":0.5,"frames":4323,"clicked":false},
    {"x":0.4,"y":0.4,"frames":4417,"clicked":false},
    {"x":0.8,"y":0.8,"frames":4515,"clicked":false},
    {"x":0.2,"y":0.3,"frames":4606,"clicked":false},
    {"x":9.5,"y":0.4,"frames":4660,"clicked":false},
    {"x":0.3,"y":0.1,"frames":4710,"clicked":false},
    {"x":0.5,"y":0.7,"frames":4805,"clicked":false},
    {"x":0.2,"y":0.2,"frames":4898,"clicked":false},
    {"x":0.9,"y":0.6,"frames":4996,"clicked":false},
    {"x":0.3,"y":0.4,"frames":5046,"clicked":false},
    {"x":0.6,"y":0.6,"frames":5092,"clicked":false},
    {"x":0.8,"y":0.1,"frames":5190,"clicked":false},
    {"x":0.4,"y":0.4,"frames":5287,"clicked":false},
    {"x":0.5,"y":0.7,"frames":5384,"clicked":false},
    {"x":0.3,"y":0.9,"frames":5430,"clicked":false},
    {"x":0.4,"y":0.2,"frames":5477,"clicked":false},
    {"x":0.6,"y":0.7,"frames":5680,"clicked":false},
    {"x":0.2,"y":0.4,"frames":5764,"clicked":false},
    {"x":0.4,"y":0.8,"frames":5857,"clicked":false},
    {"x":0.6,"y":0.6,"frames":5954,"clicked":false},
    {"x":0.3,"y":0.1,"frames":6004,"clicked":false},
    {"x":0.8,"y":0.4,"frames":6051,"clicked":false},
    {"x":0.8,"y":0.8,"frames":6147,"clicked":false},
    {"x":0.4,"y":0.4,"frames":6237,"clicked":false},
    {"x":0.9,"y":0.9,"frames":6335,"clicked":false},
    {"x":0.5,"y":0.5,"frames":6383,"clicked":false},
    {"x":0.3,"y":0.5,"frames":6435,"clicked":false},
    {"x":0.7,"y":0.4,"frames":6481,"clicked":false},
    {"x":0.2,"y":0.1,"frames":6532,"clicked":false},
    {"x":0.9,"y":0.2,"frames":6578,"clicked":false},
    {"x":0.4,"y":0.1,"frames":6627,"clicked":false},
    {"x":0.5,"y":0.9,"frames":6675,"clicked":false},
    {"x":0.4,"y":0.7,"frames":6724,"clicked":false},
    {"x":0.2,"y":0.4,"frames":6770,"clicked":false},
    {"x":0.4,"y":0.6,"frames":6794,"clicked":false},
    {"x":0.8,"y":0.9,"frames":6817,"clicked":false},
    {"x":0.8,"y":0.2,"frames":6865,"clicked":false},
    {"x":0.6,"y":0.4,"frames":6913,"clicked":false},
    {"x":0.5,"y":0.3,"frames":6957,"clicked":false},
    {"x":0.5,"y":0.5,"frames":7009,"clicked":false},
    {"x":0.2,"y":0.7,"frames":7056,"clicked":false},
    {"x":0.8,"y":0.9,"frames":7080,"clicked":false},
    {"x":0.6,"y":0.3,"frames":7106,"clicked":false},
    {"x":0.4,"y":0.5,"frames":7150,"clicked":false},
    {"x":0.7,"y":0.4,"frames":7181,"clicked":false},
    {"x":0.4,"y":0.5,"frames":7201,"clicked":false},
    {"x":0.3,"y":0.8,"frames":7248,"clicked":false},
    {"x":0.5,"y":0.4,"frames":7270,"clicked":false},
    {"x":0.3,"y":0.6,"frames":7438,"clicked":false},
    {"x":0.1,"y":0.7,"frames":7454,"clicked":false},
    {"x":0.5,"y":0.3,"frames":7463,"clicked":false},
    {"x":0.3,"y":0.4,"frames":7476,"clicked":false},
    {"x":0.3,"y":0.5,"frames":7486,"clicked":false},
    {"x":0.5,"y":0.6,"frames":7499,"clicked":false},
    {"x":0.7,"y":0.9,"frames":7509,"clicked":false},
    {"x":0.8,"y":0.9,"frames":7528,"clicked":false},
    {"x":0.8,"y":0.8,"frames":7536,"clicked":false},
    {"x":0.9,"y":0.4,"frames":7550,"clicked":false},
    {"x":0.6,"y":0.5,"frames":7560,"clicked":false},
    {"x":0.3,"y":0.7,"frames":7584,"clicked":false},
    {"x":0.6,"y":0.2,"frames":7633,"clicked":false},
    {"x":0.4,"y":0.1,"frames":7656,"clicked":false},
    {"x":0.5,"y":0.1,"frames":7730,"clicked":false},
    {"x":0.6,"y":0.4,"frames":7778,"clicked":false},
    {"x":0.8,"y":0.2,"frames":7829,"clicked":false},
    {"x":0.1,"y":0.6,"frames":7854,"clicked":false},
    {"x":0.2,"y":0.8,"frames":7875,"clicked":false},
    {"x":0.3,"y":0.3,"frames":7898,"clicked":false},
    {"x":0.4,"y":0.7,"frames":7921,"clicked":false},
    {"x":0.6,"y":0.4,"frames":7944,"clicked":false},
    {"x":0.8,"y":0.5,"frames":7969,"clicked":false},
    {"x":0.9,"y":0.5,"frames":8014,"clicked":false},
    {"x":0.4,"y":0.3,"frames":8068,"clicked":false},
    {"x":0.6,"y":0.5,"frames":8114,"clicked":false},
    {"x":0.2,"y":0.7,"frames":8137,"clicked":false},
    {"x":0.1,"y":0.8,"frames":8162,"clicked":false},
    {"x":0.1,"y":0.5,"frames":8211,"clicked":false},
    {"x":0.8,"y":0.3,"frames":8257,"clicked":false},
    {"x":0.9,"y":0.5,"frames":8279,"clicked":false},
    {"x":0.4,"y":0.7,"frames":8304,"clicked":false},
    {"x":0.6,"y":0.8,"frames":8328,"clicked":false},
    {"x":0.5,"y":0.3,"frames":8355,"clicked":false},
    {"x":0.7,"y":0.7,"frames":8377,"clicked":false},
    {"x":0.8,"y":0.3,"frames":8405,"clicked":false},
    {"x":0.3,"y":0.7,"frames":8428,"clicked":false},
    {"x":0.3,"y":0.3,"frames":8452,"clicked":false},
    {"x":0.1,"y":0.4,"frames":8474,"clicked":false},
    {"x":0.9,"y":0.9,"frames":8496,"clicked":false},
    {"x":0.8,"y":0.2,"frames":8519,"clicked":false},
    {"x":0.1,"y":0.3,"frames":8546,"clicked":false},
    {"x":0.6,"y":0.5,"frames":8566,"clicked":false},
    {"x":0.5,"y":0.9,"frames":8581,"clicked":false},
    {"x":0.1,"y":0.6,"frames":8593,"clicked":false},
    {"x":0.8,"y":0.5,"frames":8611,"clicked":false},
    {"x":0.2,"y":0.1,"frames":8625,"clicked":false},
    {"x":0.6,"y":0.2,"frames":8637,"clicked":false},
    {"x":0.8,"y":0.4,"frames":8648,"clicked":false},
    {"x":0.4,"y":0.5,"frames":8737,"clicked":false},
    {"x":0.2,"y":0.7,"frames":8834,"clicked":false},
    {"x":0.6,"y":0.9,"frames":8931,"clicked":false},
    {"x":0.3,"y":0.4,"frames":8977,"clicked":false},
    {"x":0.7,"y":0.6,"frames":9028,"clicked":false},
    {"x":0.9,"y":0.3,"frames":9073,"clicked":false},
    {"x":0.5,"y":0.2,"frames":9123,"clicked":false},
    {"x":0.4,"y":0.1,"frames":9167,"clicked":false},
    {"x":0.8,"y":0.1,"frames":9221,"clicked":false},
    {"x":0.6,"y":0.1,"frames":9263,"clicked":false},
    {"x":0.7,"y":0.9,"frames":9313,"clicked":false},
    {"x":0.7,"y":0.6,"frames":9361,"clicked":false},
    {"x":0.3,"y":0.4,"frames":9412,"clicked":false},
    {"x":0.4,"y":0.6,"frames":9458,"clicked":false},
    {"x":0.5,"y":0.3,"frames":9508,"clicked":false},
    {"x":0.6,"y":0.5,"frames":9554,"clicked":false},
    {"x":0.7,"y":0.6,"frames":9570,"clicked":false},
    {"x":0.8,"y":0.7,"frames":9579,"clicked":false},
    {"x":0.9,"y":0.8,"frames":9589,"clicked":false},
    {"x":0.3,"y":0.4,"frames":9599,"clicked":false},
    {"x":0.1,"y":0.3,"frames":9625,"clicked":false},
    {"x":0.4,"y":0.5,"frames":9634,"clicked":false},
    {"x":0.5,"y":0.6,"frames":9651,"clicked":false},
    {"x":0.6,"y":0.7,"frames":9661,"clicked":false},
    {"x":0.9,"y":0.4,"frames":9696,"clicked":false},
    {"x":0.6,"y":0.3,"frames":9743,"clicked":false},
    {"x":0.4,"y":0.2,"frames":9795,"clicked":false},
    {"x":0.3,"y":0.6,"frames":9838,"clicked":false},
    {"x":0.2,"y":0.8,"frames":9890,"clicked":false},
    {"x":0.1,"y":0.6,"frames":9937,"clicked":false},
    {"x":0.5,"y":0.4,"frames":9986,"clicked":false},
    {"x":0.7,"y":0.2,"frames":10033,"clicked":false},
    {"x":0.8,"y":0.4,"frames":10081,"clicked":false},
    {"x":0.9,"y":0.2,"frames":10126,"clicked":false},
    {"x":0.5,"y":0.3,"frames":10177,"clicked":false},
    {"x":0.8,"y":0.4,"frames":10223,"clicked":false},
    {"x":0.6,"y":0.5,"frames":10273,"clicked":false},
    {"x":0.8,"y":0.6,"frames":10345,"clicked":false},
    {"x":0.9,"y":0.8,"frames":10368,"clicked":false},
    {"x":0.7,"y":0.5,"frames":10417,"clicked":false},
    {"x":0.4,"y":0.6,"frames":10461,"clicked":false},
    {"x":0.2,"y":0.7,"frames":10507,"clicked":false},
    {"x":0.4,"y":0.2,"frames":10553,"clicked":false},
    {"x":0.3,"y":0.3,"frames":10604,"clicked":false},
    {"x":0.6,"y":0.4,"frames":10648,"clicked":false},
    {"x":0.5,"y":0.5,"frames":10702,"clicked":false},
    {"x":0.7,"y":0.2,"frames":10750,"clicked":false},
    {"x":0.9,"y":0.1,"frames":10800,"clicked":false},
    {"x":0.6,"y":0.8,"frames":10890,"clicked":false},
    {"x":0.4,"y":0.6,"frames":10943,"clicked":false},
    {"x":0.7,"y":0.7,"frames":10993,"clicked":false},
    {"x":0.9,"y":0.5,"frames":11015,"clicked":false},
    {"x":0.4,"y":0.4,"frames":11039,"clicked":false},
    {"x":0.6,"y":0.3,"frames":11089,"clicked":false},
    {"x":0.7,"y":0.5,"frames":11137,"clicked":false},
    {"x":0.5,"y":0.6,"frames":11182,"clicked":false},
    {"x":0.5,"y":0.7,"frames":11231,"clicked":false},
    {"x":0.7,"y":0.3,"frames":11282,"clicked":false},
    {"x":0.4,"y":0.1,"frames":11331,"clicked":false},
    {"x":0.3,"y":0.3,"frames":11379,"clicked":false},
    {"x":0.5,"y":0.2,"frames":11425,"clicked":false},
    {"x":0.2,"y":0.4,"frames":11473,"clicked":false},
    {"x":0.3,"y":0.6,"frames":11520,"clicked":false},
    {"x":0.1,"y":0.9,"frames":11569,"clicked":false},
    {"x":0.7,"y":0.5,"frames":11619,"clicked":false},
    {"x":0.8,"y":0.4,"frames":11666,"clicked":false},
    {"x":0.5,"y":0.2,"frames":11714,"clicked":false},
    {"x":0.9,"y":0.3,"frames":11759,"clicked":false},
    {"x":0.1,"y":0.4,"frames":11807,"clicked":false}]


function draw() {
    switch(stage) {
        case "game":
            background("rgb(51, 24, 107)")
            textSize(40)
            noStroke()
            fill("black")
            text(score, 300, 50);
            noStroke();
            updateFrames++;
            var textEffect = getEffectById("songname1")
            if(textEffect == null){
                effects.push({type: "text", id: "songname1", font: allerFont, size: 80, strokeWeight: 0, stroke: "#000000", color: "#ff66aa", x: window.innerWidth / 2, y: window.innerHeight / 2, text: "Poylow - Got Me"})
            }
            //Visualize audio:
            if(level != undefined) {
                level = (level + level + level + level + amp.getLevel()) / 5
            } else {
                level = amp.getLevel()
            }
            ellipse(window.innerWidth / 2, window.innerHeight / 2, level * (window.innerWidth / 2))
            //Visualize others
            drawEffects()
            drawBubbles()
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
            text("(" + Math.round(animationValues.assetsLoadedCount / animationValues.assetsToLoadCount * 100) + "%)", window.innerWidth / 2, window.innerHeight / 2 + 60)
            if(animationValues.assetsLoadedCount == animationValues.assetsToLoadCount) {
                stage = "menu";
            }
            break;
        case "menu":
            background("#33186b")
            noStroke();
            fill("#ff66aa")
            textAlign(CENTER, CENTER)
            textFont(allerFont)
            textSize(60)
            text("osu!", window.innerWidth / 2, 60)
            fill("#1780e3")
            textSize(35)
            text("NO ANIME", window.innerWidth / 2, 110)
            var playButtonHovered = false;
            mouseIsOverButton(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 3, 50, function() {
                if(mouseIsPressed){
                    stage = "game"
                    score = 0;
                    music.play()
                }
                playButtonHovered = true;
            })
            if(!playButtonHovered) {
                noFill();
            } else {
                fill("#402180")
            }
            stroke("#ff66aa")
            strokeWeight(5)
            rectMode(CENTER)
            rect(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth / 3, 50, 15, 15 ,15 ,15)
            noStroke();
            fill("#ff66aa")
            text("Play", window.innerWidth / 2, window.innerHeight / 2 - 7)
            break;
    }
    updateCursor()
}


function drawBubbles() {
    for(var i = 0; i != bubbles.length; i++) {
        if(!bubbles[i].clicked){
            if(bubbles[i].frames >= updateFrames && bubbles[i].frames - 60 <= updateFrames) {
                stroke("blue")
                strokeWeight(5)
                noFill()
                circle(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, 100)
                circle(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, 100 + Math.abs(bubbles[i].frames - updateFrames) * 2)
            }
            if(mouseIsPressed && bubbles[i].frames > updateFrames && bubbles[i].frames - 20 < updateFrames && dist(bubbles[i].x * window.innerWidth, bubbles[i].y * window.innerHeight, mouseX, mouseY) < 60) {
                textAlign(RIGHT)
                bubbles[i].clicked = true;
                snare.play()
                score += 1000;
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
    console.log(left)
    console.log(right)
    console.log(top)
    console.log(bottom)
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

function mousePressed() {
    score -= 500
}

function getEffectById(id) {
    for(var i = 0; i != effects.length; i++) {
        if(effects[i].id == id) {
            return effects[i]
        }
    }
    return null;
}

//const mapCreating = true;
//var bubblesCreator = [
//    
//]
//
//function keyPressed() {
//    if(keyCode == 65) {
//        bubblesCreator.push({x: 0, y: 0, frames: updateFrames, clicked: false})
//    } else if(keyCode == 83) {
//        console.log(JSON.stringify(bubblesCreator))
//    }
//}