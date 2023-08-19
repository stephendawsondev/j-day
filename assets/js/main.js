import generateScenes from "./scenes.js";

// initialize kaboom context
kaboom({
  background: [255, 0, 0],
  width: 800,
  height: 600,
  canvas: document.getElementById("game-canvas"),
  fullscreen: true,
  scale: 1,
});

loadRoot("../../public/scene_background_images/");
loadSprite("instructions-page", "instructions.png");
loadSprite("game-page", "game.png");
loadSprite("quit-page", "game_over.png");


generateScenes();

go("instructions");

// canvas focus enables user keyboard input register
canvas.focus();
