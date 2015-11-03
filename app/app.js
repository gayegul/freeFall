var bottomLimit = 355;
var upperLimit = 7;
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

// var planets = ['earth', 'moon', 'mars', 'uranus', 'neptune', 'jupiter', 'mercury', 'pluto', 'saturn', 'venus'];
//
// function createBalls() {
//   var x = 0;
//   var y = 10;
//
//   for(var i = 0; i < planets.length; i++) {
//     var ballName = planets[i] + 'Ball';
//     var ballGravity = planets[i] + 'Gravity';
//     var element = $('<div id='+ ballName +'>');
//     element.addClass('inline');
//     balls.push(element);
//     x += 105;
//     var ballName = new Ball(ballGravity, x, y);
//     var imgPath = "img/" + planets[i] + ".ico";
//     var img = $('<img src='+ imgPath +'>');
//     element.append(img);
//     element.appendTo($('#planets'));
//   }
// }
// console.log(balls);
// createBalls();

var x = 50;
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
