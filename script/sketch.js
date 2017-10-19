//  https://github.com/bmoren/p5.collide2D

let playArea;
let bubbles = [];
let playerOne;
let point = 0;
let hit = false;
let bubbleLength = 1;
let highScore = localStorage.getItem('highScore');

//Buttons
let startButton;
let instructionButton;
let highScoreResetter;

function setup() {
  playArea = createCanvas(windowWidth-175, windowHeight-400);
  centerCanvas();
  textSize(35);

  playerOne = new Player();
  noLoop()



  //Start button
  startButton = createElement("BUTTON", "Start Button")
  document.getElementsByTagName("BUTTON")[0].addEventListener("click", newGame);

  //Instruction button
  instructionButton = createElement("BUTTON", "Instruction Button")
  document.getElementsByTagName("BUTTON")[1].addEventListener("click", test);

  //highScore resetter
  highScoreResetter = createElement("BUTTON", "Reset your highscore")
  document.getElementsByTagName("BUTTON")[2].addEventListener("click", Resetter);
}




function spawner(){

//TODO: want to make a function that determine the propobility for a bubble to spawn, which increases as time goes on.
  let spawnScore = random(0,100)
  let targetScore = 100 - (pow(point+1, 0.3))
  if (spawnScore >= targetScore ) {
    print("spawned with a spawnScore of: " + spawnScore + "\n" + "by beating: " + targetScore  + "\n" + "#BubbleSpawned: " + bubbleLength)
    let w = random(30,50);
    let speed = random(1.5,5);
    let yaxis = 0 //random(1,10)

    bubble = new Bubble(w, speed, yaxis);
    bubbles.push(bubble)

    bubbleLength++
  }
}


function gameEnd(){
  for (let i = 0; i < bubbles.length; i++) {
    hit = collideRectCircle(playerOne.position.x, playerOne.position.y, playerOne.w, playerOne.h, bubbles[i].position.x, bubbles[i].position.y, bubbles[i].w)
    if(hit) {
      noLoop()
      noStroke()
      text("Im sorry, but you lost the GAME!" + '\n' + "Refresh the page to start a new game", 100, height/2)

      if (point > localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', point);
        highScore = localStorage.getItem('highScore')
      }

    }
  }
}


function draw() {
  background(150)

  noStroke()
  //Writing point to screen
  text("Points: " + point, 10, 50);

  //Writing your highscore to screen
  text('Your highest score is: ' + highScore, width - 410, 50)

  spawner();
  for (let i = 0; i < bubbles.length; i++) {
    let gravity = createVector(0, 0.002*bubbles[i].mass)

    bubbles[i].show();
    bubbles[i].move();
    bubbles[i].applyForce(gravity);
    bubbles[i].edgeCheck();
  }

// used for the removal of bubbles.
  for (let j = bubbles.length-1; j >= 0; j--) {
    if (bubbles[j].outOfBound()) {
      bubbles.splice(j, 1)
      point++

    }
  }

  playerOne.show();
  playerOne.move();

  gameEnd()

}


// Used to center and reshape the html-canvas(playArea)
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  playArea.position(x, y);
}

function windowResized() {
  centerCanvas();
  resizeCanvas(windowWidth-175, windowHeight-400)
}

function newGame() {
  playerOne.position.x = width/2;
  bubbles = [];
  bubbleLength = 1;
  hit = false;
  point = 0;
  loop()
}

function test () {
  print("this is to write some instructions at some point")
}

function Resetter() {
  localStorage.removeItem('highScore')
  print(localStorage.getItem('highScore'))
}
