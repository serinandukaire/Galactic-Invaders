// this class handles all the bullets of my objects
let pbullets = [] // player bullet array
let ebullets = [] // enemy bullets array
let rbullets = [] // red enemy bullets array

class pLives{
  constructor(x,y){
    this.pos = createVector(x, y)
    this.r = 30
  }
  show(){
    // displays lives at top of screen
    push()
    fill('white')
    image(pImg,this.pos.x,this.pos.y,50,20)
    pop()
  }
}

class pBullet {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.yv = -5 
    this.r = 150
  }

  show() {
    // displays bullets coming out of player
    push()
    fill('white')
    image(pbulletImg, this.pos.x, this.pos.y, this.r, this.r)
    pop()
  }
  
  update() {
    // updates bullet position
    this.pos.y += this.yv
    
    if (this.pos.y < 0) {
      let indexOfDeadPBullet = pbullets.indexOf(this)
      pbullets.splice(indexOfDeadPBullet, 1) // removes player bullet from array when it goes off screen
    }
    
    for (let e of enemies) {
      // checks wether player has killed an enemy
      let hit = collideCircleCircle(this.pos.x, this.pos.y, 10, e.pos.x, e.pos.y, e.r) 
      if (hit) {
        // removes objects from arrays
        pbullets.splice(pbullets.indexOf(this), 1)
        enemies.splice(enemies.indexOf(e), 1)
        score += 20 // adding score
        killSound.play()
      }
    }
    for (let r of renemies) {
      // checks wether current player bullet and red enemy is array has collided
      let hit = collideCircleCircle(this.pos.x, this.pos.y, 10, r.pos.x, r.pos.y, r.r) 
      if (hit) {
        // removes objects from arrays
        pbullets.splice(pbullets.indexOf(this), 1)
        renemies.splice(renemies.indexOf(r), 1)
        score += 100 // adds score
      }
    }
  }
}

class eBullet {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.yv = 5
    this.r = 50
  }
  
  show() {
    // displays bullets coming out of enemy
    push()
    fill(50, 205, 50)
    image(ebulletImg, this.pos.x, this.pos.y, this.r, this.r)
    pop()
  }
  update() {
    // updates bullet position
    this.pos.y += this.yv
    
    if (this.pos.y > height) {
       // removes object from array
      let indexOfDeadEBullet = ebullets.indexOf(this)
      ebullets.splice(indexOfDeadEBullet, 1) // removes enemy bullet from array when it goes off screen
    } 
  }
}

class rBullet {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.yv = 5
    this.r = 50
  }

  show() {
     // displays bullets coming out of enemy
    push()
    fill(50, 205, 50)
    circle(this.pos.x, this.pos.y, this.r)
    image(rbulletImg, this.pos.x, this.pos.y, this.r, this.r)
    pop()
  }
  update() {
    // updates bullet position
    this.pos.y += this.yv

    if (this.pos.y > height) {
      // removes object from array
      let indexOfDeadRBullet = rbullets.indexOf(this)
      rbullets.splice(indexOfDeadRBullet, 1) // removes enemy bullet from array when it goes off screen
    } 
  }
}


