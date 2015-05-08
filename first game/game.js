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
      circles[i][1] += ((Math.floor(Math.random())) * 7 + 1);
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

  that.isJumping = false;
  that.isFalling = false;

  that.jumpSpeed = 0;
  that.fallSpeed = 0;

  that.jump = function() {
    if(!that.isJumping && !that.isFalling) {
      that.fallSpeed = 0;
      that.isJumping = true;
      that.jumpSpeed = 17;
    }
  }

  that.checkJump = function() {
    that.setPosition(that.X, that.Y - that.jumpSpeed);
    that.jumpSpeed--;
    if (that.jumpSpeed === 0) {
      that.isJumping = false;
      that.isFalling = true;
      that.fallSpeed = 1;
    }
  }
  that.checkFall = function() {
    if(that.Y < canvas.height - that.height) {
      that.setPosition(that.X, that.Y + that.fallSpeed);
      that.fallSpeed++;
    } else {
      that.fallStop();
    }
  }
  that.fallStop = function() {
    that.isFalling = false;
    that.fallSpeed = 0;
    that.jump();
  }

  that.moveLeft = function() {
    if (that.X > 0) {
      that.setPosition(that.X - 5, that.Y);
    }
  }
  that.moveRight = function() {
    if (that.X + that.width < canvas.width) {
      that.setPosition(that.X + 5, that.Y);
    }
  }

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

var nrOfPlatforms = 7;
platforms = [];
platformWidth = 70;
platformHeight = 20;

var Platform = function(x, y, type) {
  var that = this;
  that.firstColor = '#FF8C00';
  that.secondColor = '#EEEE00';
  that.onCollide = function() {
    player.fallStop();
  };
  if (type === 1 ) {
    that.firstColor = '#AADD00';
    that.secondColor = '#698B22';
    that.onCollide = function() {
      player.fallStop();
      player.jumpSpeed = 50;
    };
  }
  that.x = ~~x;
  that.y = y;
  that.type = type;

  that.draw = function() {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    var gradient = ctx.createRadialGradient(that.x + (platformWidth/2), that.y + (platformHeight/2), 5, that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
    gradient.addColorStop(0, that.firstColor);
    gradient.addColorStop(1, that.secondColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
  };

  return that;
};

var generatePlatforms = function() {
  var position = 0, type;
  for (var i = 0; i < nrOfPlatforms; i++) {
    type = ~~(Math.random()*5);
    if (type === 0)
      type = 1;
    else type = 0;
    platforms[i] = new Platform(Math.random() * (canvas.width - platformWidth), position, type);
    if (position < canvas.height - platformHeight)
      position += ~~(canvas.height / nrOfPlatforms);
  }
} ();

document.onmousemove = function(e) {
  if (player.X + canvas.offsetLeft > e.pageX) {
    player.moveLeft();
  } else if (player.X + canvas.offsetLeft < e.pageX) {
    player.moveRight();
  }

}

player.setPosition(Math.floor((canvas.width - player.width)/2), Math.floor((canvas.height - player.height) /2));
player.jump();

var GameLoop = function () {
  clear();
  MoveCircles();
  DrawCircles();
  if (player.isJumping) {
    player.checkJump();
  }
  if (player.isFalling) {
    player.checkFall();
  }
  player.draw();
  platforms.forEach(function(platform) {
    platform.draw();
  });
  gLoop = setTimeout (GameLoop, 1000 / 50);
}
// setInterval(GameLoop, 1000 / 50);
GameLoop();