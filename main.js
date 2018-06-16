(function frame() {
  requestAnimationFrame(frame);

  handleInput();

  switch (state) {
    case FREE:
      break;
    case RECORD:
      record();
      break;
    case PLAY:
      play();
      break;
  }

  background();
  updateFill();
  circle(x, y);
})();
