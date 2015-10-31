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

// Ball.prototype.step = function(number) {
//   console.log(this.posY);
//   console.log(upperLimit);
//   var inlimit = true;
//   if(number === -1 && this.posY > bottomLimit) {
//     inlimit = false;
//   }
//   else if(number === 1 && this.posY < upperLimit) {
//     inlimit = false;
//   }
//
//   if(inlimit) {
//     time += 0.01;
//     this.distance = 0.5 * this.gravity * time * time;
//     this.posY += number * this.distance;
//     this.element.offset({top: this.posY, left: this.posX});
//   } else {
//     clearInterval(this.interval);
//     // console.log('step idk');
//     this.interval = setInterval(this.step.bind(this, -1 * number), 1000 * time);
//     time = 0.01;
//   }
// };

Ball.prototype.stepOne = function(number) {
  var inlimit = true;
  console.log('here1');
  console.log(number);
  console.log(this.posY);
  if(number === -1 && (this.posY >= bottomLimit || this.posY > upperLimit)) {
    inlimit = false;
    console.log('here2');
  }
  else if(number === 1 && (this.posY <= upperLimit || this.posY < bottomLimit)) {
    inlimit = false;
    console.log('here3');
  }
  if(!inlimit) {
    console.log('here4');
    console.log(this.posY);
    time += 0.01;
    this.distance = 0.5 * this.gravity * time * time;
    this.posY += (number * this.distance);
    this.element.offset({top: this.posY, left: this.posX});
    console.log(this.posY);
    console.log(number);
  }
  else {
    clearInterval(this.interval);
    console.log('here5');
    this.start(number);
  }
};

Ball.prototype.start = function(number) {
  time = 0.01;
  this.interval = setInterval(this.stepOne.bind(this, number * -1), 1000 * time);
};

var earthBall = new Ball(9.8, 50, 8);
//earthBall.start(-1);


//add wind, add friction options
//dropdown menu for other planets
//balls for other planets
