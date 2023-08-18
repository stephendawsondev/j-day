import generateScenes from "./scenes.js";

// initialize kaboom context
kaboom({
  background: [255, 153, 51],
  width: 800,
  height: 600,
  canvas: document.getElementById("game-canvas"),
  fullscreen: true,
  scale: 1,
});

loadRoot("../../public/scene_background_images/");
loadSprite("welcome-background", "welcome.png");
loadSprite("instructions-background", "instructions.png");


generateScenes();

go("welcome");

// canvas focus enables user keyboard input register
canvas.focus();
