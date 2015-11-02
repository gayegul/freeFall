var bottomLimit = 355;
var upperLimit = 7;
var marsGravity = 3.711;
var neptunGravity = 11.15;
var uranusGravity = 8.69;
var timeIncrement = 0.5;
var balls = [];

function Ball(gravity, posX, posY) {
  this.gravity = gravity;
  this.posX = posX;
  this.posY = posY;
  this.distance = 0;
  this.element = $('<div class="ball">');
  this.element.appendTo($('#container'));
  this.element.offset({top: this.posY, left: this.posX});
  this.velocity = 0;
  balls.push(this);
}

Ball.prototype.updatePosition = function(time) {
  var distanceTravelled = this.velocity * time + 0.5 * this.gravity * time * time;
  this.posY += distanceTravelled;
  this.element.offset({top: this.posY, left: this.posX});

  this.velocity += this.gravity * time;

  if(this.posY > bottomLimit || this.posY < upperLimit) {
    this.velocity *= -1;
  }
};

function animate() {
  interval = setInterval(function() {
    for(var i = 0; i < balls.length; i++) {
      balls[i].updatePosition(timeIncrement);
    }
  }, 1000/26);
}

var x = 50;
var y = 8;
var earthBall = new Ball(9.8, 50, 8);

$('#pause').hide();
$('#pause').on('click', function() {
  $(this).hide();
  clearInterval(interval);
  $('#play').show();
});

$('#play').on('click', function() {
  $(this).hide();
  animate();
  $('#pause').show();
});

//add wind, add friction options
//activate dropdown menu for other planets
//balls for other planets
//add a master start & stop button
