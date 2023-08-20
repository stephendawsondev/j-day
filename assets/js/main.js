import generateScenes from "./scenes.js";

// initialize kaboom context
kaboom({
  background: [255, 0, 0],
  width: 800,
  height: 600,
  canvas: document.getElementById("game-canvas"),
  scale: 1,
});

const rootUrl = window.location.href;
const relUrl = rootUrl.includes("github.io")
  ? "../../j-day/public"
  : "../../public";

/* Scence design objects*/

loadRoot(`${relUrl}/sprites/`);
loadSprite("background_tile", "arcade_carpet.png");
loadSprite("wall_tile", "wall_tile.png");
loadSprite("door_tile", "door_pixels.png");
loadSprite("burger", "burger_pixels.png");
loadSprite("pinball", "pinballtemplate.png");
loadSprite("hotdog", "hotdog_pixels.png");
loadSprite("pink_neon", "pink_neon.png");
loadSprite("green_neon", "green_neon.png");
loadSprite("arcade_machine1", "arcade_machine1.png");
loadSprite("arcade_machine2", "arcade_machine2.png");
loadSprite("arcade_machine3", "arcade_machine3.png");
loadSprite("table", "table.png");
loadSprite("chair_left_side", "chair_left_side.png");
loadSprite("chair_right_side", "chair_right_side.png");
loadSprite("pizza", "pizza_pixels.png");
loadSprite("mug", "mug_pixels.png");
loadSprite("standing_table", "standing_table.png");
loadSprite("can", "can_pixels.png");

// Load character sprites
loadSprite("sarah_l", "Sarah.png");
loadSprite("sarah_r", "Sarah_r.png");
loadSprite("sarah_b", "Sarah_back.png");
loadSprite("john", "John.png");
loadSprite("terminator", "Terminator.png");
loadSprite("bullet_yellow", "bullet_y.png");

//load sounds
loadRoot(`${relUrl}/sounds/`);
loadSound("death_sound", "death.wav");
loadSound("hurt_sound", "hit_hurt.wav");
loadSound("life_pickup", "life_pickup.wav");
loadSound("powerup_sound", "powerup.wav");
loadSound("intro_music", "intro.wav");
loadSound("main_music", "main.wav");
loadSound("menu_select", "menu_select.wav");
loadSound("shoot", "gun_sound_effect.wav");
loadSound("death", "death.wav");
loadSound("game_over_music", "game_over.wav");



//load scene sprites
loadRoot(`${relUrl}/scene_background_images/`);
loadSprite("welcome_page", "welcome_img.png");
loadSprite("instructions-page", "instructions.png");
loadSprite("game_over", "game_over_background.png");

generateScenes();

go("welcome");

// canvas focus enables user keyboard input register
canvas.focus();
