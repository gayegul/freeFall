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

var previousTime;
var paused = true;

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

var y = 10;
var earthBall;
var moonBall;
var marsBall;
var uranusBall;
var neptuneBall;
var jupiterBall;
var mercuryBall;
var plutoBall;
var saturnBall;
var venusBall;

function createBalls() {
  earthBall = new Ball(earthGravity, 80, y);
  moonBall = new Ball(moonGravity, 195, y);
  marsBall = new Ball(marsGravity, 305, y);
  uranusBall = new Ball(uranusGravity, 415, y);
  neptuneBall = new Ball(neptuneGravity, 535, y);
  jupiterBall = new Ball(jupiterGravity, 650, y);
  mercuryBall = new Ball(mercuryGravity, 765, y);
  plutoBall = new Ball(plutoGravity, 875, y);
  saturnBall = new Ball(saturnGravity, 985, y);
  venusBall = new Ball(venusGravity, 1100, y);
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
  $('#balls').empty();
  createBalls();
});

//TODO list
//add some information on the load
//make planets objects with their relative info
