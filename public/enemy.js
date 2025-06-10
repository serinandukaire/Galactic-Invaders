// this class represents the enemy objects
let enemies = [] 
let renemies = []

class Enemy {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.r = 70
    this.yv = 2 //speed of enemy

  }
  update() {
    this.pos.y += this.yv

    // removes the enemy from the array and decreases the player's lives if it goes off the screen
    if (this.pos.y > height -50) {
      let indexOfDeadEnemy = enemies.indexOf(this)
      enemies.splice(indexOfDeadEnemy, 1) // removes enemy from array when it goes off screen
      lives --
      livesArray.pop()
      playerSound.play()
      if (lives == 0) gameOver = true
    } 

  }

  show() {
    push()
    fill(50, 205, 50)
   // circle(this.pos.x, this.pos.y, this.r)
    image(eImg, this.pos.x, this.pos.y, this.r, this.r)
    pop()
  }
}

class RedEnemy {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.r = 40
    this.xv = 2
    this.drop = random(500)
    this.hasBullet = false
  }

  show() {
    push()
    fill('red')
    //circle(this.pos.x, this.pos.y, this.r)
    image(reImg, this.pos.x,this.pos.y,70,this.r)
    pop()
  }

  update() {
    this.pos.x += this.xv
    if (this.pos.x > width + 40) {
      // if (frameCount % renemyInt == 0) this.pos.x = -30 // controls display of red enemy
      renemies.splice(renemies.indexOf(this), 1)
      this.hasBullet = false // makes only 1 bullet drop
      this.drop = random(width)
    }

  }

}