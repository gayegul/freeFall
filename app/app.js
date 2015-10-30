var time = 0.01;
var bottomLimit = 355;
var upperLimit = 9;

function Ball(gravity, posX, posY) {
  this.gravity = gravity;
  this.posX = posX;
  this.posY = posY;
  this.distance = 0;
  this.element = $('<div class="ball">');
  this.element.appendTo($('#container'));
  console.log(this.element);
  this.element.offset({top: this.posY, left: this.posX});
}

Ball.prototype.stepUpwards = function() {
  console.log('step 5');
  if(this.posY >= upperLimit) {
    time += 0.01;
    this.distance = 0.5 * this.gravity * time * time;
    this.posY -= this.distance;
    this.element.offset({top: this.posY, left: this.posX});
  } else {
    clearInterval(this.interval);
    time = 0.01;
    console.log('step 6');
    // this.moveDownwards(); // jumps forever
  }
};

Ball.prototype.moveUpwards = function() {
  console.log('step 4');
  this.interval = setInterval(this.stepUpwards.bind(this), 1000 * time);
};

Ball.prototype.stepDownwards = function() {
  console.log('step 2');
  if(this.posY <= bottomLimit) {
    this.distance = 0.5 * this.gravity * time * time;
    this.posY += this.distance;
    this.element.offset({top: this.posY, left: this.posX});
    time += 0.01;
  }
  else {
    clearInterval(this.interval);
    console.log('step 3');
    time = 0.01;
    this.moveUpwards();
  }
};

Ball.prototype.moveDownwards = function() {
  console.log('step 1');
  this.interval = setInterval(this.stepDownwards.bind(this), 1000 * time);
};

var earthBall = new Ball(9.8, 50, 8);
earthBall.moveDownwards();

//add wind, add friction options
//dropdown menu for other planets
//make falling smoother
//touch the ground, jump back up
//combine up down into a single func pass direction
