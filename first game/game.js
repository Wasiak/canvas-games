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

var MoveCircles = function(deltaY) {
  for (var i = 0; i < circlesAmount; i++) {
      if (circles[i][1] - circles[i][2] > canvas.height) {
      circles[i][0] = Math.random() * canvas.width;
      circles[i][2] = Math.random() * 100;
      circles[i][1] = 0 - circles[i][2];
      circles[i][3] = Math.random() /2;
    }
    else {
      circles[i][1] += deltaY;
    }
  }  
}

var GameLoop = function () {
  clear();
  MoveCircles(5);
  DrawCircles();
  gLoop = setTimeout (GameLoop, 1000 / 50);
}
// setInterval(GameLoop, 1000 / 50);
GameLoop();