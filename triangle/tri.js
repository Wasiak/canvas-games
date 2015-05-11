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
var circleRadius = 5;
function readMouseMove(e){
  var result_x = document.getElementById('x');
  var result_y = document.getElementById('y');
  result_x.innerHTML = e.clientX - 8;
  result_y.innerHTML = e.clientY - 8;
}

var activeCorner = false;
var activeCornerA = false;
var activeCornerB = false;
var activeCornerC = false;

var canvasPositionModifier = 8;
var makeActiveCorner = function(e){
  if (
    Math.pow(a[0] - e.clientX + canvasPositionModifier , 2) +
    Math.pow(a[1] - e.clientY + canvasPositionModifier, 2) <=
    Math.pow(circleRadius, 2) 
    ) {
    // console.log('no hej');
    activeCorner = true;
    activeCornerA = true;
  }
  else if (
    Math.pow(b[0] - e.clientX + canvasPositionModifier , 2) +
    Math.pow(b[1] - e.clientY + canvasPositionModifier, 2) <=
    Math.pow(circleRadius, 2)
    ) {
    activeCorner = true;
    activeCornerB = true;
  }
  else if (
    Math.pow(c[0] - e.clientX + canvasPositionModifier , 2) +
    Math.pow(c[1] - e.clientY + canvasPositionModifier, 2) <=
    Math.pow(circleRadius, 2)
    ) {
    activeCorner = true;
    activeCornerC = true;
  }
};

var disableActiveCorner = function(){
  activeCorner = false;
  activeCornerA = false;
  activeCornerB = false;
  activeCornerC = false;
 }; 

var drawHeightA = function() {
  //for now just test line wiht angle === angle of AC side
  var xx = [c[0],a[1]];
  var xxA = c[0] - a[0];
  var xxC = c[1] - a [1];
  // console.log('xx = ', xx);
  // console.log('xxA = ', xxA);
  // console.log('xxC = ', xxC);
  // Psi is an angle between X axis and AC side of triangle
  var tgPsi = xxC / xxA;
  // console.log('tgPsi = ', tgPsi);
  //psi in degrees
  var psi = (Math.atan(tgPsi) * 180 / Math.PI);
  // console.log('psi = ', psi);
  var sideA = Math.sqrt(Math.pow(c[0] - b[0], 2) + Math.pow(c[1] - b[1], 2));
  var sideB = Math.sqrt(Math.pow(c[0] - a[0], 2) + Math.pow(c[1] - a[1], 2)); 
  var sideC = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
  // console.log ('bok a = ', sideA);
  // console.log ('bok b = ', sideB);
  // console.log ('bok c = ', sideC);
  // s = (a+b+c)/2 
  var s = (sideA + sideB + sideC)/2;
  var h = (2* Math.sqrt(s*(s-sideA)*(s-sideB)*(s-sideC)))/sideA;
  console.log('wysokosc = ', h);
  //eta is angle between sideB and h
  var cosEta = h / sideB;
  var eta = (Math.acos(cosEta) * 180 / Math.PI);
  console.log('eta = ', eta);

  //now draw line with same angle for test
  ctx.save();
  ctx.strokeStyle = 'rgb(0, 255, 0)';
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.translate(a[0], a[1]);
  ctx.rotate((Math.PI/180) * (psi+eta));  
  ctx.lineTo(h, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

canvas.addEventListener('mousedown', makeActiveCorner);
canvas.addEventListener('mouseup', disableActiveCorner);

var moveCorner = function(e) {
  if (activeCorner){
      clear();
      if (activeCornerA){  
        a = [e.clientX - 8, e.clientY - 8];
      }
      else if (activeCornerB){
        b = [e.clientX - 8, e.clientY - 8];
      }
      else if (activeCornerC){
        c = [e.clientX - 8, e.clientY - 8];
      }
      drawTriangle(a, b, c);
      drawHeightA();
    }
  }

canvas.addEventListener('mousemove', readMouseMove);
canvas.addEventListener('mousemove', moveCorner);

