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
loadSprite("arcade_1", "arcade1.png");
loadSprite("arcade_2", "arcade2.png");
loadSprite("arcade_3", "arcade3.png");
loadSprite("arcade_4", "arcade4.png");
loadSprite("arcade_5", "arcade5.png");
loadSprite("arcade_6", "arcade6.png");
loadSprite("arcade_7", "arcade7.png");
loadSprite("arcade_8", "arcade8.png");
loadSprite("arcade_9", "arcade9.png");
loadSprite("arcade_10", "arcade10.png");
loadSprite("arcade_11", "arcade11.png");
loadSprite("arcade_12", "arcade12.png");
loadSprite("arcade_13", "arcade13.png");
loadSprite("arcade_14", "arcade14.png");
loadSprite("arcade_15", "arcade15.png");
loadSprite("arcade_16", "arcade16.png");
loadSprite("burger", "burger_pixels.png");
loadSprite("pinball", "pinballtemplate.png");
loadSprite("hotdog", "hotdog_pixels.png");
loadSprite("pink_neon", "pink_neon.png");
loadSprite("green_neon", "green_neon.png");

// Load character sprites
loadSprite("sarah_l", "Sarah.png");
loadSprite("sarah_r", "Sarah_r.png");
loadSprite("sarah_b", "Sarah_back.png");
loadSprite("john", "John.png");
loadSprite("terminator", "Terminator.png");
loadSprite("bullet_yellow", "bullet_y.png")

//load sounds
loadRoot(`${relUrl}/sounds/`);
loadSound("death_sound", "death.wav");
loadSound("hurt_sound", "hit_hurt.wav");
loadSound("life_pickup", "life_pickup.wav");
loadSound("powerup_sound", "powerup.wav");
loadSound("intro_music", "intro.wav");
loadSound("main_music", "main.wav");
loadSound("menu_select", "menu_select.wav");

//load scene sprites
loadRoot(`${relUrl}/scene_background_images/`);
loadSprite("welcome_page", "welcome_img.png");
loadSprite("instructions-page", "instructions.png");
loadSprite("game_over", "game_over_background.png");

generateScenes();

go("welcome");

// canvas focus enables user keyboard input register
canvas.focus();
