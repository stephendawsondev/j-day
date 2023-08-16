// initialize kaboom context
kaboom({
  background: [255, 153, 51],
  width: 800,
  height: 600,
  canvas: document.getElementById("game-canvas"),
  fullscreen: true,
  scale: 1,
});

// canvas focus enables user keyboard input register
canvas.focus();
