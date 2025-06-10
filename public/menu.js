// this class handles the display of the main menu screen and user interaction
class Menu {
  // displays the game title, buttons, and images on the main menu
  display() {
    push()
    textSize(100)
    fill('white')
    text('Galactic', width / 2 + 5, 50)
    fill(50, 205, 50)
    text('Invaders', width / 2 + 5, 150)
    pop()
    
    // rects that the text will be over
    rect(width / 2, height - 250, 80, 20)
    rect(width / 2, height - 180, 160, 20)
    rect(width / 2, height - 110, 110, 20)
    fill('black')

    image(eImg, width *1/3, height/2 - 50, 70,70)
    image(reImg, width *1/3, height/2 + 50, 70,40)

    push()
    textSize(20)
    fill('white')
    text(' = 20 pts', width *1/3 + 180, height/2 - 50)
    text(' = ?? pts', width *1/3 + 180, height/2 + 50)
    pop()

    // event buttons
    textSize(40)
    
    // start button
    push()
    if (mouseX >= width/2 - 80 && mouseY >= height - 250 - 20 && mouseX <= width/2 + 80 && mouseY <= height - 250 + 20){
      fill(50, 205, 50) // highlights the text when mouse hovers it
    } else{
      fill('white')
    }
    text('start', width / 2, height - 250)
    pop()
    
    // high score button
    push()
    if (mouseX >= width/2 - 160 && mouseY >= height - 180 - 20 && mouseX <= width/2 + 160 && mouseY <= height - 180 + 20){
      fill(50, 205, 50) // highlights the text when mouse hovers it
    } else{
      fill('white')
    }
    text('high scores', width / 2, height - 180)
    pop()

    // credits button
    push()
    if (mouseX >= width/2 - 110 && mouseY >= height - 105 - 20 && mouseX <= width/2 + 110 && mouseY <= height - 105 + 20){
      fill(50, 205, 50) // highlights the text when mouse hovers it
    } else{
      fill('white')
    }
    text('credits', width / 2, height - 110)
    pop()
  }
}

class Gameover{
  display(){
    push()
    textSize(70)
    fill('white')
    text('Game over',width/2+5,50)
    pop()

    push()
    textSize(30)
    //strokeWeight(20)
    fill('white')
    text('Final score <'+ finalScore + '>', width/2+5,150)
    pop()

    push()
    textSize(20)
    strokeWeight(20)
    fill('white')
    text('Input name and press enter to save score', width/2+5,height/2-50)
    pop()

    // menu button
    rect(width / 2, height - 130, 40, 10)
    fill('black')

    push()
    fill(50, 205, 50)
    rect(width/2,height-25,300,3) // platform surface
    pop()

    drawPlayer()

    // displays score is saved
    if (scoreSaved){
      push()
      textSize(20)
      strokeWeight(20)
      fill(50, 205, 50)
      text('Score saved!', width/2+5,height/2+50)
      pop()
    }

    // play again button
    push()
    // highlights text when hover over button
    if(mouseX >= width/2 - 60 && mouseY >= height/2 + 150 - 10 && mouseX <= width/2 + 5 + 60 && mouseY <=  height/2 + 150 + 10){
      fill(50, 205, 50)
    } else{
      fill('white')
    }
    strokeWeight(40)
    textSize(20)
    text('Play Again?', width/2+5,height/2+150)
    pop()

    // small menu button
    push()
    // highlights text when hover over button
    if(mouseX >= width/2 - 40 && mouseY >= height - 130 - 10 && mouseX <= width/2 + 40 && mouseY <= height - 130 + 10){
      fill(50, 205, 50)
    } else{
      fill('white')
    }
    textSize(20)
    text('menu', width / 2, height - 130)
    pop()
  }
}

class Highscore{
  display(){
    push()
    textSize(70)
    fill('white')
    text('Leader board',width/2+5,50)
    pop()

    rect(width / 2, height - 130, 40, 10)
    fill('black')

    push()
    // highlights text when hover over button
    if(mouseX >= width/2 - 40 && mouseY >= height - 130 - 10 && mouseX <= width/2 + 40 && mouseY <= height - 130 + 10){
      fill(50, 205, 50)
    } else{
      fill('white')
    }
    textSize(20)
    text('menu', width / 2, height - 130)
    pop()
  }
  
}

class Credits{
  display(){
    push()
    textSize(70)
    fill('white')
    text('Credits',width/2+5,50)
    pop()

    push()
    textSize(40)
    fill('white')
    text('by Serina',width/2,height * 1/2 - 100)
    text('music by taito',width/2, height * 1/2 + 100)
    pop()
    
    rect(width / 2, height - 130, 40, 10)
    fill('black')

    push()
    // highlights text when hover over button
    if(mouseX >= width/2 - 40 && mouseY >= height - 130 - 10 && mouseX <= width/2 + 40 && mouseY <= height - 130 + 10){
      fill(50, 205, 50)
    } else{
      fill('white')
    }
    textSize(20)
    text('menu', width / 2, height - 130)
    pop()
  }
}

function mousePressed(){

  if(screen == 0){ // only when it is the menu screen
    // gameplay screen
    if(mouseX >= width/2 - 80 && mouseY >= height - 250 - 20 && mouseX <= width/2 + 80 && mouseY <= height - 250 + 20){
      screen = 1
    }
    // leader board screen
    if(mouseX >= width/2 - 160 && mouseY >= height - 180 - 20 && mouseX <= width/2 + 160 && mouseY <= height - 180 + 20){
      screen = 3
    }
    // credits screen 
    if(mouseX >= width/2 - 110 && mouseY >= height - 105 - 20 && mouseX <= width/2 + 110 && mouseY <= height - 105 + 20){
      screen = 4
    }
  }

  // menu screen
  if (screen == 2 || screen == 3 || screen == 4){ // only when it is the leader board, credits or gameover screen
    if(mouseX >= width/2 - 40 && mouseY >= height - 130 - 10 && mouseX <= width/2 + 40 && mouseY <= height - 130 + 10){
      screen = 0 // small menu button
      init()
    }
  }

  // play again button
  if (screen == 2){ // only when it is the leader board, credits or gameover screen
    if(mouseX >= width/2 - 40 && mouseY >= height/2 + 150 - 10 && mouseX <= width/2 + 5 + 40 && mouseY <=  height/2 + 150 + 10){
      screen = 1 // small menu button
      init()
    }
  }

}

