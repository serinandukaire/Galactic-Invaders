// this file contains the main game logic and setup, including the game screens, player position, enemy spawn frequency, scoring system, and game over logic

let screen = 0; // variable to keep track of game screens
let myFont;
let px = 300; // initial x-position of player
let enemyInt = 80; // frequency of enemy spawn
let renemyInt = 800; // frequency of red enemy spawn
let ex;
let ey = -5; // enemy starting y position
let score = 0;
let lives = 3;
let gameOver = false;
let livesArray = [];
let finalScore = 0;
let tb; // initialise text box
let scoreSaved = false; // true when name is eentered in text box
let highScores = null;

// preloads necessary assets and initializes variables and font for the game
function preload() {
  myFont = loadFont("space_invaders.ttf");
  eImg = loadImage("assets/enemyalien.png");
  reImg = loadImage("assets/redalien.webp");
  pImg = loadImage("assets/playeralien.png");
  ebulletImg = loadImage("assets/whitelaser.png");
  pbulletImg = loadImage("assets/bluelaser.png");
  rbulletImg = loadImage("assets/redlaser.png");

  bgSound = loadSound("assets/spaceinvaders1.mp3"); // background music
  shootSound = loadSound("assets/shoot.wav"); // player shoots
  killSound = loadSound("assets/invaderkilled.wav"); // enemy invaders killed
  playerSound = loadSound("assets/explosion.wav"); // player gets shot
  redSound = loadSound("assets/ufo_highpitch.wav"); // red enemy comes in

  httpGet("/topScores", function (response) {
    // response arrives as a string so need to convert it back to array
    console.log(response);
    highScores = JSON.parse(response);
    console.log("99999", highScores);
  });
}

// sets up the canvas, loads the font, audio, creates text box, and sets initial game parameters
function setup() {
  bgSound.loop();
  bgSound.setVolume(0.3);
  createCanvas(600, 800);
  textFont(myFont);
  textAlign(CENTER, CENTER); // aligns text to be in center
  rectMode(RADIUS); // makes x and y coordinates to be in center
  imageMode(CENTER); // aligns x y coordinates to be in center
  //renemies.push(new RedEnemy(-30, 50)) // initialize red enemy
  livesArray.push(
    new pLives((600 * 3) / 4 + 70, 12),
    new pLives((600 * 3) / 4 + 100, 12),
    new pLives((600 * 3) / 4 + 130, 12),
  ); // appends 3 lives to the lives array

  // create text box
  tb = createInput();
  tb.position((width - tb.width - 155) / 2, (height - tb.height) / 2);
  tb.class("my-textbox"); // styles text box

  shootSound.setVolume(0.3);
  killSound.setVolume(0.3);
  playerSound.setVolume(0.3);
  redSound.setVolume(0.3);
}

// initialises parameters and objects
function init() {
  ebullets = [];
  pbullets = [];
  rbullets = [];
  enemies = [];
  renemies = [];
  livesArray = [
    new pLives((600 * 3) / 4 + 70, 12),
    new pLives((600 * 3) / 4 + 100, 12),
    new pLives((600 * 3) / 4 + 130, 12),
  ];
  gameOver = false;
  score = 0;
  finalScore = 0;
  lives = 3;
  px = 300;
  tb.value(""); // resets textbox value
  scoreSaved = false;
}

// draws the main game elements such as the player, enemies, bullets, and UI
function draw() {
  background(0);
  grid();

  let m = new Menu();
  let g = new Gameover();
  // let h = new Highscore()
  let c = new Credits();

  // menu screen
  if (screen == 0) {
    tb.hide();
    m.display();
  }
  // gameover screen
  if (screen == 2) {
    tb.show();
    g.display();
  }

  // leader board
  if (screen == 3) {
    push();
    textSize(70);
    fill("white");
    text("Leader board", width / 2 + 5, 50);
    pop();

    rect(width / 2, height - 130, 40, 10);
    fill("black");

    push();
    // highlights text when hover over button
    if (
      mouseX >= width / 2 - 40 &&
      mouseY >= height - 130 - 10 &&
      mouseX <= width / 2 + 40 &&
      mouseY <= height - 130 + 10
    ) {
      fill(50, 205, 50);
    } else {
      fill("white");
    }
    textSize(20);
    text("menu", width / 2, height - 130);
    pop();

    for (let i = 0; i < highScores.length; i++) {
      //text(highScores[i].name + " -- " + highScores[i].score, width / 2, 100 + i * 30)
      push();
      fill("white");
      text(highScores[i].name, (width * 1) / 4, 200 + i * 100);
      //text('--', width *1/2, 200 + i * 100)
      pop();

      push();
      fill(50, 205, 50);
      text(highScores[i].score, (width * 3) / 4, 200 + i * 100);
      pop();
    }
  }

  // credits screen
  if (screen == 4) {
    c.display();
  }
  // gameplay screen
  if (screen == 1) {
    if (gameOver) {
      finalScore = score;
      screen = 2;
      tb.show();

      // gameplay screen
    } else {
      tb.hide();
      push();
      fill("white");
      strokeWeight(20);
      textSize(20);
      text("score", 50, 10);
      text("lives", (width * 3) / 4, 10);
      pop();

      push();
      fill(50, 205, 50);
      rect(width / 2, height - 25, 300, 3); // platform surface
      pop();

      ex = random(50, width - 50);
      if (frameCount % enemyInt == 0) {
        // controls the spawn of enemy
        enemies.push(new Enemy(ex, ey));
        ebullets.push(new eBullet(ex, ey));
      }

      if (frameCount % renemyInt == 0) renemies.push(new RedEnemy(-30, 50));

      drawLives();
      ebullet();
      drawPlayer();
      checkInput();
      pbullet();
      enemyDisplay();
      redEnemy();

      // displays score and lives
      push();
      fill(50, 205, 50);
      strokeWeight(20);
      textSize(20);
      text("<" + score + ">", 150, 10);
      pop();
    }
  }
}

// draws background grid
function grid() {
  push();
  stroke(255, 255, 255, 155);
  // vertical grid lines
  for (let i = 0; i <= 1200; i += 50) {
    line(i, 0, i, height);
  }
  // horizontal grid lines
  for (let i = 0; i <= height; i += 50) {
    line(0, i, width, i);
  }
  pop();
}

function drawLives() {
  for (let l of livesArray) {
    l.show();
  }
}

function drawPlayer() {
  push();
  fill("white");
  image(pImg, px, height - 75, 120, 70);
  pop();
}

// displays bullets
function pbullet() {
  for (let p of pbullets) {
    p.show();
    p.update();
  }
}

function enemyDisplay() {
  for (let e of enemies) {
    e.show();
    e.update();
  }
}

// displays enemy bullets and handles their collision with the player 
function ebullet() {
  for (let b of ebullets) {
    b.show();
    b.update();
    // detects whether player has collided with an enemy bullet
    let hit = collideCircleCircle(px, height - 40, 20, b.pos.x, b.pos.y, b.r);
    if (hit) {
      ebullets.splice(ebullets.indexOf(b), 1);
      lives--;
      livesArray.pop();
      // console.log(livesArray)
      playerSound.play();
      if (lives == 0) gameOver = true;
    }
  }
}

// displays red enemy
function redEnemy() {
  for (let r of renemies) {
    r.show();
    r.update();
  }
}

function keyPressed() {
  if (keyCode == 32) {
    console.log(renemies);
    shootSound.play();
    pbullets.push(new pBullet(px, height - 100));
  }
  // event for player to save score
  if (screen == 2) {
    if (keyCode === ENTER) {
      sendScore(tb.value(), finalScore);
      scoreSaved = true;
    }
  }
}

// checks for player input and updates player position accordingly
function checkInput() {
  if (keyIsDown(65)) px -= 6;
  if (keyIsDown(LEFT_ARROW)) px -= 6;
  if (keyIsDown(68)) px += 6;
  if (keyIsDown(RIGHT_ARROW)) px += 6;
  px = constrain(px, 25, width - 25); // keeps player within window
}

// sends the player's score and name to the server and stores it in the database
function sendScore(name, score) {
  if (name == null) score = null;
  data = {
    name: name,
    score: score,
  };
  // sends client to server, /addScore is the route
  httpPost("/addScore", data, function (res) {
    console.log(res);
  });
}
