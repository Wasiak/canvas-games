var gLoop;
var canvas = document.getElementById('canvas');
canvas.width = 320;
canvas.height = 500;
ctx = canvas.getContext('2d');

var clear = function() {
  var width = canvas.width;
  var height = canvas.height;
  ctx.fillStyle = '#d0e7f9';
  ctx.fillRect(0, 0, width, height);
}

var circlesAmount = 10;
circles = [];

for (var i = 0; i < circlesAmount; i++){
  circles.push([Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100, Math.random() / 2]);
}

var DrawCircles = function() {
  for (var i = 0; i < circlesAmount; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
    ctx.beginPath();
    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2);
    ctx.fill();
  }
}

var MoveCircles = function() {
  for (var i = 0; i < circlesAmount; i++) {
      if (circles[i][1] - circles[i][2] > canvas.height) {
      circles[i][0] = Math.random() * canvas.width;
      circles[i][2] = Math.random() * 100;
      circles[i][1] = 0 - circles[i][2];
      circles[i][3] = Math.random() /2;
    }
    else {
      circles[i][1] += (Math.random() * 5 + 1);
    }
  }  
}

var player = new (function(){
  var that = this;

  that.image = new Image();
  that.image.src = 'angel.png';

  that.width = 65;
  that.height = 95;

  that.X = 0;
  that.Y = 0;

  that.setPosition = function(x, y){
    that.X = x;
    that.Y = y;
  }

  that.frames = 1;
  that.actualFrame = 0;
  that.interval = 0;

  that.draw = function() {
    try {
      ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
    }  catch (e) {};

    if (that.interval === 4) {
      if (that.actualFrame === that.frames) {
        that.actualFrame = 0;
      } else {
        that.actualFrame++;
      }
      that.interval = 0;
    }
    that.interval++;
  }
}) ();

player.setPosition(Math.floor((canvas.width - player.width)/2), Math.floor((canvas.height - player.height) /2));

var GameLoop = function () {
  clear();
  MoveCircles();
  DrawCircles();
  player.draw();
  gLoop = setTimeout (GameLoop, 1000 / 50);
}
// setInterval(GameLoop, 1000 / 50);
GameLoop();