import { spawnBasicEnemy, spawnTerminatorEnemy } from "./enemy.js";
import { spawnPlayer } from "./player.js";
/**
 * Generates the scenes for the game - called by go("sceneName")
 */

 const generateScenes = () => {    
    // add instructions
    scene("instructions", () => {
      const instructionsBackground = add([
        sprite("instructions-page"),
        pos(0, 0),
        origin("topleft"),
        scale(1.2),
        "start-game"
      ]);

      // start game button
      const startButton = add([
        text("Play"),
        color(YELLOW),
        pos(600, 500),
        origin("topleft"),
        scale(1),
        area(),
        "play"
      ]);

      onClick("play", () => {
        go("game");
      });
    });

  const introMusic = play("intro_music", { loop: true, volume: 0.4 });
  
  // add welcome screen
  scene("welcome", () => {
    const welcomeBackground = add([
      sprite("welcome_page"),
      pos(0, 0),
      origin("topleft"),
      scale(4),
    ]);

    const introMusic = play("intro_music", { loop: true, volume: 0.4 });

    const musicText = add([
      text("Toggle Music"),
      color(YELLOW),
      pos(width() / 4, height() / 2 + 200),
      scale(0.5),
      origin("center"),
      area(),
      "music-text",
    ]);

   
    function addButton(txt, p, f) {
      const btn = add([
        text(txt, {
          size: 48,
          font: "apl386o",
        }),
        pos(p),
        area({ cursor: "pointer" }),
        scale(1),
      ]);


      btn.onClick(f);

      btn.onUpdate(() => {
        if (btn.isHovering()) {
          const t = time() * 10;
          btn.color = rgb(
            wave(0, 255, t),
            wave(0, 255, t + 2),
            wave(0, 255, t + 4)
          );
          btn.scale = vec2(1.2);
        } else {
          btn.scale = vec2(1);
          btn.color = rgb();
        }
      });
    }

    addButton("Start", vec2(80, 350), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      introMusic.stop();
      go("game", { score: 0, livesLeft: 3 });
    });

    addButton("How to play", vec2(80, 450), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      go("instructions");
    });

    onClick("music-text", () => {
      if (introMusic.isPaused()) {
        introMusic.play();
      } else {
        introMusic.pause();
      };
     
    });
    // reset cursor to default at frame start for easier cursor management
    onUpdate(() => cursor("default"));

    onKeyDown("enter", () => {
      play("menu_select", { loop: false, volume: 0.5 });
      go("game", { score: 0, livesLeft: 3 });
    });
  });

  // add the game scene
  scene("game", ({ score, livesLeft }) => {
    layers(["bg", "game", "ui"], "game");

    const mainMusic = play("main_music", { loop: true, volume: 0.4 });

    // add background tiles
    const generateFloorTiles = () => {
      let positionX = 0;
      let positionY = 0;
      for (let i = 0; i < width(); i++) {
        if (positionX > width()) {
          positionX = 0;
          positionY += 30;
        }
        add([
          sprite("background_tile"),
          pos(positionX, positionY),
          scale(1),
          layer("bg"),
        ]);

        positionX += 30;
      }
    };

    generateFloorTiles();

    // spawn player as placeholder
    const player = spawnPlayer();
    // const player = add([
    //   rect(40, 40),
    //   area(),
    //   pos(20, 20),
    //   color(RED),
    //   "player",
    // ]);

    // spawn basic enemy example
    spawnBasicEnemy(300, 300);

    // spawn terminator example
    spawnTerminatorEnemy(player);

    // display score
    add([
      text(`Score:${score}`),
      pos(width() * 0.01, 0),
      layer("ui"),
      scale(0.4),
    ]);

    // Display lives remaining
    add([
      text(`Lives left:${livesLeft}`),
      pos(width() * 0.3, 0),
      layer("ui"),
      scale(0.4),
    ]);
  });

  // add the game over scene
  scene("game_over", (score) => {
    layers(["bg", "game", "ui"], "game");
    const gameOverBackground = add([
      sprite("game_over_background"),
      pos(0, 0),
      origin("topleft"),
      scale(1),
      layer("bg"),
      play("game_over", { loop: false, volume: 0.5 }),
    ]);

    // display score
    add([
      text(`Your Score:${score}`),
      pos(width() * 0.25, height() * 0.3),
      color(YELLOW),
      layer("ui"),
      scale(0.8),
    ]);

    const startText = add([
      text("Play again"),
      color(YELLOW),
      pos(width() / 2, height() - height() / 10),
      scale(0.5),
      origin("center"),
      area(),
      "play-again-text",
    ]);

    onClick("play-again-text", () => {
      go("game", { score: 0, livesLeft: 3 });
    });
  });
};

export default generateScenes;
