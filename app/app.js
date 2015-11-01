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
  this.element.offset({top: this.posY, left: this.posX});
}

Ball.prototype.stepOne = function(number) {
  var inlimit = true;
  if(number === -1 && (this.posY >= bottomLimit || this.posY > upperLimit)) {
    inlimit = false;
  }
  else if(number === 1 && (this.posY <= upperLimit || this.posY < bottomLimit)) {
    inlimit = false;
  }
  if(!inlimit) {
    time += 0.01;
    this.distance = 0.5 * this.gravity * time * time;
    this.posY += (number * this.distance);
    this.element.offset({top: this.posY, left: this.posX});
  }
  else {
    clearInterval(this.interval);
    this.start(number);
  }
};

Ball.prototype.start = function(number) {
  time = 0.01;
  this.interval = setInterval(this.stepOne.bind(this, number * -1), 1000 * time);
};

var earthBall = new Ball(9.8, 50, 8);
// earthBall.start(-1); //uncomment it for constant fall and jump
$('.planetList').addClass('hidden');

$('#planets').hover(
  function() {
  $('.planetList').removeClass('hidden');
}, function() {
  $('.planetList').addClass('hidden');
});

//add wind, add friction options
//activate dropdown menu for other planets
//balls for other planets
