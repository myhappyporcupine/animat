const FREE   = 0,
      RECORD = 1,
      PLAY   = 2;

const canvas = document.getElementById('canvas'),
      ctx    = canvas.getContext('2d');

const sequence = [];

const inputs = {
  left  : false,
  up    : false,
  right : false,
  down  : false
}

let state = FREE,
    frame = 0,
    x     = canvas.width/2,
	  y     = canvas.height/2;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft')  inputs.left  = true;
  if (event.key === 'ArrowUp')    inputs.up    = true;
  if (event.key === 'ArrowRight') inputs.right = true;
  if (event.key === 'ArrowDown')  inputs.down  = true; });

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft')  inputs.left  = false;
  if (event.key === 'ArrowUp')    inputs.up    = false;
  if (event.key === 'ArrowRight') inputs.right = false;
  if (event.key === 'ArrowDown')  inputs.down  = false; });

document.addEventListener('keypress', (event) => {
	if (event.key === 'f')   state = FREE;
	if (event.key === 'r') { initRecord();
													 state = RECORD; }
	if (event.key === 'p') { initPlay();
													 state = PLAY; } });

function handleInput() {
  if (inputs.left)  x -= 1;
  if (inputs.up)    y -= 1;
  if (inputs.right) x += 1;
  if (inputs.down)  y += 1;
}

function getAnimationState()               { return {x: x, y: y}; }
function setAnimationState(animationState) { x = animationState.x;
                                             y = animationState.y; }

function initRecord() { sequence.splice(0); }
function record()     { sequence.push(getAnimationState()); }
function initPlay()   { frame = 0; }
function play()       { if (sequence.length == 0) return;
                        if (frame >= sequence.length) frame = 0;
                        setAnimationState(sequence[frame]);
                        frame++; }

function background() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

function updateFill() {
  switch (state) {
    case FREE:
      ctx.fillStyle = 'white';
      break;
    case RECORD:
      ctx.fillStyle = 'red';
      break;
    case PLAY:
      ctx.fillStyle = 'green';
      break;
  }
}

function circle(x, y) { ctx.beginPath();
	ctx.arc(x, y, 25, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}
