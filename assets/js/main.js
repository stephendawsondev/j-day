// initialize kaboom context
kaboom({
  background: [255, 153, 51],
  width: 800,
  height: 600,
  canvas: document.getElementById("game-canvas"),
  fullscreen: true,
  scale: 1,
});

/* Kyle added sprite import */

loadRoot("sprites/");
loadSprite("background-tile","background-main-tile.png");

loadRoot("sounds/");
loadSound("death_sound","death.wav");
loadSound("hurt_sound","hit_hurt.wav");
loadSound("life_pickup","life_pickup.wav");
loadSound("powerup_sound","powerup.wav");

loadRoot("scene_background_images")
loadSprite("game_over","game_over_background.png")


// canvas focus enables user keyboard input register
canvas.focus();
