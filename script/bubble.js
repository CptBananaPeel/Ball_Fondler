class Bubble {
  constructor(w, speed, yaxis) {

    this.w = w;
    this.mass = this.w * 1.2;
    this.y = random(0,height-200);


    this.position = createVector(this.x, this.y)
    this.velocity = createVector(speed, yaxis)
    this.acceleration = createVector(0, 0)



    // Determine the direction for the ball on the screen
    // 1 = right -> left
    // 0 = left -> right
    // Should be around 50% split
    this.direction = round(random(0,1))
    if (this.direction < 1) {
      this.position.x = 0;
    } else {
      this.position.x = width;
    }

  }


  applyForce(force) {
    let f = force
    this.acceleration.add(f)
  }

  move() {
    // Moveing from right -> left
    if (this.direction < 1) {
      this.velocity.add(this.acceleration)
      this.position.add(this.velocity);
      this.acceleration.mult(0)

    // Moveing from left -> right
    } else {
      this.velocity.sub(this.acceleration)
      this.position.sub(this.velocity);
      this.acceleration.mult(0)
    }
  }


  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.position.x, this.position.y, this.w, this.w)
  }

  //function used to determine if the buttom border has been hit.
  edgeCheck() {
      if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }

  //function used to check if a bubble has left the screen.
  outOfBound() {
    if (this.direction == 1) {
       return this.position.x + this.w < 0
    } else {
      return this.position.x > width + this.w
    }
  }


}
