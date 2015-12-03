var y = 10;
var upperLimit = 0;
var bottomLimit = 355;
var earthGravity = 9.81;
var moonGravity = 1.62;
var marsGravity = 3.71;
var neptuneGravity = 11.15;
var uranusGravity = 8.69;
var jupiterGravity = 24.79;
var mercuryGravity = 3.7;
var plutoGravity = 0.66;
var saturnGravity = 10.44;
var venusGravity = 8.87;
var timeIncrement = 0.1;
var previousTime;
var paused = true;
var balls = [];

function Ball(gravity, posX, posY) {
  this.gravity = gravity;
  this.posX = posX;
  this.posY = posY;
  this.element = $('<div class="ball">');
  this.element.appendTo($('#balls'));
  this.element.offset({top: this.posY, left: this.posX});
  this.velocity = 0;
  balls.push(this);
}

Ball.prototype.updatePosition = function(time) {
  var distanceTravelled = this.velocity * time + 0.5 * this.gravity * time * time;
  this.posY += distanceTravelled * 30;
  this.velocity += this.gravity * time;
  if((this.velocity > 0 && this.posY > bottomLimit) || (this.velocity < 0 && this.posY < upperLimit)) {
    this.velocity *= -1;
  }
  this.element.offset({top: this.posY, left: this.posX});
};

Ball.prototype.reset = function() {
  this.posY = y;
  this.velocity = 0;
  requestAnimationFrame(function(time) {
    previousTime = time;
    animate(time);
  });
};

function animate(currentTime) {
  var increment = currentTime - previousTime;
  previousTime = currentTime;
  for(var i = 0; i < balls.length; i++) {
    balls[i].updatePosition(increment/1000);
  }
  if(!paused) {
    requestAnimationFrame(animate);
  }
}

function createBalls() {
  new Ball(plutoGravity, 80, y);
  new Ball(moonGravity, 195, y);
  new Ball(mercuryGravity, 305, y);
  new Ball(marsGravity, 415, y);
  new Ball(uranusGravity, 535, y);
  new Ball(venusGravity, 650, y);
  new Ball(earthGravity, 765, y);
  new Ball(saturnGravity, 875, y);
  new Ball(neptuneGravity, 985, y);
  new Ball(jupiterGravity, 1100, y);
}

createBalls();

$('#pause').hide();
$('#reset').hide();

$('#pause').on('click', function() {
  $(this).hide();
  paused = true;
  $('#play').show();
});

$('#play').on('click', function() {
  $(this).hide();
  paused = false;
  requestAnimationFrame(function(time) {
    previousTime = time;
    animate(time);
  });
  $('#pause').show();
  $('#reset').show();
});

$('#reset').on('click', function() {
  console.log(balls);
  for(var i = 0; i < balls.length; i++) {
    balls[i].reset();
  }
});

//TODO list
//add some information on the load
//make planets objects with their relative info
