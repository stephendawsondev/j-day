import generateScenes from "./scenes.js";
import { spawnBasicEnemy, spawnTerminatorEnemy } from "./enemy.js";

// initialize kaboom context
kaboom({
  background: [255, 0, 0],
  width: 800,
  height: 600,
  canvas: document.getElementById("game-canvas"),
  scale: 1,
});

/* Kyle added sprite import */

loadRoot("sprites/");
loadSprite("background-tile", "background-main-tile.png");

loadRoot("sounds/");
loadSound("death_sound", "death.wav");
loadSound("hurt_sound", "hit_hurt.wav");
loadSound("life_pickup", "life_pickup.wav");
loadSound("powerup_sound", "powerup.wav");

loadRoot("scene_background_images");
loadSprite("game_over", "game_over_background.png");

loadRoot("../../public/scene_background_images/");
loadSprite("instructions-page", "instructions.png");

spawnEnemy(300, 300);
const player = add([rect(40, 40), area(), pos(20, 20), color(RED), "player"]);

spawnBasicEnemy(300, 300);
spawnTerminatorEnemy(player);

generateScenes();

go("welcome");

// canvas focus enables user keyboard input register
canvas.focus();
