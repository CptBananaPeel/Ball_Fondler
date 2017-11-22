//  https://github.com/bmoren/p5.collide2D

/*
TODO:
stuff i want to do:
- want to make a popup for every 50/100 point made.
- make it more colourfull and pretty to look at
- maybe a sound option?
- try and use json as a way to store highscores. for a global highScore

*/

//VERY IMPORTANT for performance!!
p5.disableFriendlyErrors = true;

let playArea;
let bubbles = [];
let playerOne;
let point = 0;
let hit = false;

let highScore = localStorage.getItem('highScore');

//Buttons
let startButton;
let instructionButton;
let highScoreResetter;
let returnButton;
let instructionText;


let buttonOffset = document.getElementsByTagName('button')
let instructionOffset = document.getElementsByTagName('p')

//The following function runs a single time - setting up the game
function setup() {
  playArea = createCanvas(windowWidth, windowHeight-100);
  centerCanvas();
  textSize(35);

  playerOne = new Player();

  startButton = createButton("Start Game")
  instructionButton = createButton("Instruction")
  returnButton = createButton('Return')

  instructionText = createP("This magnificent game is played using the left and right arrowkeys. In order to score points you will need to dodge the balls, that comes from each side of the screen.")


  //Start button
              // width, height
  startButton.size(160, 100)
  startButton.mousePressed(newGame);
  startButton.position(width/2 - (buttonOffset[0].offsetWidth/2) - 160, height/2);

  //Instruction button
  instructionButton.size(160, 100)
  instructionButton.mousePressed(instructions);
  instructionButton.position(width/2 - (buttonOffset[1].offsetWidth/2) + 160, height/2);


  returnButton.hide();
  returnButton.size(60,20)
  returnButton.position(width/2-buttonOffset[2].offsetWidth/2, height/2+100)
  returnButton.mousePressed(returnFunction);

  instructionText.hide();
  instructionText.size(500,400);
  noLoop()

}




function spawner(){

  let spawnScore = random(0,1)
  let targetScore = 0.95      //100 - (pow(point+1, 0.3))
  if (spawnScore >= targetScore ) {
    // print("spawned with a spawnScore of: " + spawnScore + "\n" + "by beating: " + targetScore  + "\n" + "#BubbleSpawned: " + bubbleLength)
    let w = random(30,50);
    let speed = random(1.5,5);
    let yaxis = 0 //random(1,10)

    bubble = new Bubble(w, speed, yaxis);
    bubbles.push(bubble)

  }
}


function gameEnd(){
  for (let i = 0; i < bubbles.length; i++) {
    hit = collideRectCircle(playerOne.position.x, playerOne.position.y, playerOne.w, playerOne.h, bubbles[i].position.x, bubbles[i].position.y, bubbles[i].w)
    if(hit) {
      noLoop()
      noStroke()
      text("Im sorry, but you lost the GAME!", width/2-250, height/2-150)

      if (point > localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', point);
        highScore = localStorage.getItem('highScore')
      }
      select('button').html('Retry the game')

      startButton.show()
      instructionButton.show()

    }
  }
}


function draw() {
  // print(bubbles.length)
  // print("framerate: " + frameRate())

  background(150)

  //Writing point to screen
  noStroke()
  text("Points: " + point, 10, 50);

  //Writing your highscore to screen
  text('Your highest score is: ' + highScore, width - 410, 50)

  spawner();
  gameEnd()


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

}


// Used to center and reshape the html-canvas(playArea)
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  playArea.position(x, y);
}



function newGame() {
  playerOne.position.x = width/2;
  bubbles = [];

  hit = false;
  point = 0;
  loop()

  for (let i = 0; i < selectAll('button').length; i++){
    selectAll('button')[i].hide();
  }

}

function instructions () {
  for (let i = 0; i < selectAll('button').length; i++){
    selectAll('button')[i].hide();
  }



  returnButton.show()
  instructionText.show();

  instructionText.position(width/2-instructionOffset[0].offsetWidth/2, height/2)
}


function returnFunction() {
  returnButton.hide()
  instructionText.hide()
  startButton.show()
  instructionButton.show()
}


//Function is not yet it use - used to delete highscore
function Resetter() {
  localStorage.removeItem('highScore')
  print(localStorage.getItem('highScore'))
}
