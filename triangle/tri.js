var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

var clear = function() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 500, 500);
}
var a = [200, 200];
var b = [200, 300];
var c = [300, 300];

ctx.strokeStyle = '#f40101';
var drawTriangle = function(a, b, c) {
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.lineTo(c[0], c[1]);
  ctx.closePath();
  ctx.stroke();
}
drawTriangle(a, b, c);

// just for test
var makeBigger = function() {
  clear();
  a[0]++;
  drawTriangle(a, b, c);
  console.log('A= ', a[0], ',', a[1], ', B= ', b[0], ',', b[1], ', C= ', c[0], ',', c[1]);
}
// setInterval(makeBigger, 500);

function readMouseMove(e){
  var result_x = document.getElementById('x');
  var result_y = document.getElementById('y');
  result_x.innerHTML = e.clientX - 8;
  result_y.innerHTML = e.clientY - 8;
}

var activeCorner = false;

// canvas margin (should be calculated from Element.getBoundingClientRect())
var canvasPositionModifier = 8;

// how far from the point we are listening for the mousedown. If the user
// clicks further than 5px form the point then we skip the action
var circleRadius = 5;

var makeActiveCorner = function(e){
  if (
    // point -> circle collision
    // calculate distance between point & center of the circle and check if
    //it's bigger than the radius
    // Math.pow(a, b) will take number 'a' to the power of 'b',
    // so Math.pow(3, 2) === 9, etc.
    Math.pow(a[0] - e.clientX + canvasPositionModifier , 2) +
    Math.pow(a[1] - e.clientY + canvasPositionModifier, 2) <=
    Math.pow(circleRadius)
    ) {
    activeCorner = true;
  }
};

// it will be simpler and more efficient to have another function for this.
var disableActiveCorner = function(){
  activeCorner = false;
};

canvas.addEventListener('mousedown', makeActiveCorner);
canvas.addEventListener('mouseup', disableActiveCorner);

var moveCorner = function(e) {
  if (activeCorner){

      clear();
      a = [e.clientX - 8, e.clientY - 8];
      drawTriangle(a, b, c);
    }
  }


canvas.addEventListener('mousemove', readMouseMove);
canvas.addEventListener('mousemove', moveCorner);
