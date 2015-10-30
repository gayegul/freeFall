


var time = 0.01;
var bottomLimit = 355;
var upperLimit = 7;
//var number;

function Ball(gravity, posX, posY) {
  this.gravity = gravity;
  this.posX = posX;
  this.posY = posY;
  this.distance = 0;
  this.element = $('<div class="ball">');
  this.element.appendTo($('#container'));
  this.element.offset({top: this.posY, left: this.posX});
}

Ball.prototype.step = function(number) {
  // console.log(number);
  // console.log(this.posY);
  var inlimit = true;
  if(number === -1 && this.posY > bottomLimit) {
    inlimit = false;
  } else if(number === 1 && this.posY < upperLimit) {
    inlimit = false;
  }

  if(inlimit) {
    // console.log('step 5');
  // while(this.posY !== upperLimit || this.posY !== bottomLimit) {
    time += 0.01;
    this.distance = 0.5 * this.gravity * time * time;
    this.posY += number * this.distance;
    this.element.offset({top: this.posY, left: this.posX});
  } else {
    clearInterval(this.interval);
    time = 0.01;
    // console.log('step idk');
    this.interval = setInterval(this.step.bind(this, -1 * number), 1000 * time);
  }
};

// Ball.prototype.moveUpwards = function() {
//   console.log('step 4');
//   // number = -1;
//   this.interval = setInterval(this.step.bind(this, -1), 1000 * time);
// };
//
// Ball.prototype.moveDownwards = function() {
//   // number = 1;
//   console.log('step 1');
//   this.interval = setInterval(this.step.bind(this, 1), 1000 * time);
// };

Ball.prototype.start = function() {
  // number = 1;
  console.log('step 1');
  this.interval = setInterval(this.step.bind(this, -1), 1000 * time);
};

var earthBall = new Ball(9.8, 50, 8);
earthBall.start();

//add wind, add friction options
//dropdown menu for other planets
//make falling smoother
//touch the ground, jump back up
//combine up down into a single func pass direction
