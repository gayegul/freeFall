var bottomLimit = 355;
var upperLimit = 0;
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
var timeIncrement = 0.5;
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
  this.posY += distanceTravelled;
  this.velocity += this.gravity * time;
  if(this.posY > bottomLimit || this.posY < upperLimit) {
    this.velocity *= -1;
    // distance = this.posY - bottomLimit;
    // this.posY = bottomLimit - distance;
    // this.velocity +=  (this.posY / 2 / time) * -1;
  }
  // else if(this.posY < upperLimit) {
  //   this.velocity *= -1;
  // }
  // if(this.posY > bottomLimit || this.posY < upperLimit) {
  //   this.velocity *= -1;
  // }
  this.element.offset({top: this.posY, left: this.posX});
};

function animate() {
  interval = setInterval(function() {
    for(var i = 0; i < balls.length; i++) {
      balls[i].updatePosition(timeIncrement);
    }
  }, 1000/26);
}

var y = 10;
var earthBall = new Ball(earthGravity, 80, y);
var moonBall = new Ball(moonGravity, 195, y);
var marsBall = new Ball(marsGravity, 305, y);
var uranusBall = new Ball(uranusGravity, 415, y);
var neptuneBall = new Ball(neptuneGravity, 535, y);
var jupiterBall = new Ball(jupiterGravity, 650, y);
var mercuryBall = new Ball(mercuryGravity, 765, y);
var plutoBall = new Ball(plutoGravity, 875, y);
var saturnBall = new Ball(saturnGravity, 985, y);
var venusBall = new Ball(venusGravity, 1100, y);

$('#pause').hide();
$('#reset').hide();

$('#pause').on('click', function() {
  $(this).hide();
  clearInterval(interval);
  $('#play').show();
});

$('#play').on('click', function() {
  $(this).hide();
  animate();
  $('#pause').show();
  $('#reset').show();
});

$('#reset').on('click', function() {
  $('#pause').hide();
  $('#play').show();
});

//fix reset button
//fix invisible ground for pluto and jupiter
//add some information on the load
//make planets objects with their relative info
