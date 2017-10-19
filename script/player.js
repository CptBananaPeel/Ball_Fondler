class Player {

  constructor(){
    this.w = 20;
    this.h = 40;
    rectMode(CORNER)

    this.position = createVector(width/2,height-this.h)
  }


  show() {
    stroke(15);
    strokeWeight(4);
    fill(5)

    rect(this.position.x, this.position.y, this.w, this.h)

  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.position.x >= 0 + this.w/4) {
      this.position.x -= 5
    }

    if (keyIsDown(RIGHT_ARROW) && this.position.x <= width - this.w*1.25) {
      this.position.x += 5
    }


    //TODO: add at somepoint to implement jumping in the game!
      // if (keyIsDown(UP_ARROW)) {
      //   if (this.position.y > height-this.h*1.2){
      //     this.position.y -= 5;
      //   }
      // }
  }


}
