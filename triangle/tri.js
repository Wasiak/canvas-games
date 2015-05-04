var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var clear = function() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 500, 500);
}