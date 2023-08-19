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
      scale(3.6),
    ]);

    const introMusic = play("intro_music", { loop: true, volume: 0.4 });

    const musicText = add([
      text("Toggle Music", {
        size: 30,
        font: "sink",
      }),
      color(YELLOW),
      pos(650, 480),
      scale(0.5),
      origin("center"),
      area(),
      "music-text",
    ]);

    const heading = add([
      text("Judgement Day", {
        size: 65,
        font: "sinko",
      }),
      color(rgb(138, 43, 226)),
      pos(40, 24),
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
          btn.color = rgb(255, 255, 0);
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
      }
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
      let positionY = 32;
      for (let i = 0; i < width(); i++) {
        if (positionX > width()) {
          positionX = 0;
          positionY += 200;
        }
        add([
          sprite("background_tile"),
          pos(positionX, positionY),
          scale(1),
          layer("bg"),
        ]);

        positionX += 200;
      }
    };

    generateFloorTiles();

    //Generate tiles for walls

    const generateWallTiles = () => {
      const tileWidth = 34;
      const tileHeight = 34;
      const screenWidth = 800;
      const screenHeight = 600;
    
      // Generate tiles along the top border
      for (let x = 0; x < screenWidth; x += tileWidth) {
        add([
          sprite("wall_tile"),
          pos(x, 0),
          scale(1),
          layer("bg"),
        ]);
      }
    
      // Generate tiles along the bottom border
      for (let x = 0; x < screenWidth; x += tileWidth) {
        add([
          sprite("wall_tile"),
          pos(x, screenHeight - tileHeight),
          scale(1),
          layer("bg"),
        ]);
      }
    
      // Generate tiles along the left border
      for (let y = tileHeight; y < screenHeight - tileHeight; y += tileHeight) {
        add([
          sprite("wall_tile"),
          pos(0, y),
          scale(1),
          layer("bg"),
        ]);
      }
    
      // Generate tiles along the right border
      for (let y = tileHeight; y < screenHeight - tileHeight; y += tileHeight) {
        add([
          sprite("wall_tile"),
          pos(screenWidth - tileWidth, y),
          scale(1),
          layer("bg"),
        ]);
      }
    
      // Generate tiles at the corners
      add([
        sprite("wall_tile"),
        pos(0, 0),
        scale(1),
        layer("bg"),
      ]);
    
      add([
        sprite("wall_tile"),
        pos(screenWidth - tileWidth, 0),
        scale(1),
        layer("bg"),
      ]);
    
      add([
        sprite("wall_tile"),
        pos(0, screenHeight - tileHeight),
        scale(1),
        layer("bg"),
      ]);
    
      add([
        sprite("wall_tile"),
        pos(screenWidth - tileWidth, screenHeight - tileHeight),
        scale(1),
        layer("bg"),
      ]);
    };
    
    generateWallTiles();
    
    
  generateWallTiles();
   /** 

    const generateDoorTiles = () => {
      const tileWidth = 34;
      const tileHeight = 32;
      const screenHeight = 600;
      const screenWidth = 800;
    
      // Center tile coordinates
      const centerTiles = [
        { x: 400, y: 0 },
        { x: 432, y: 0 },
        { x: 336, y: screenHeight - tileHeight },
        { x: 432, y: screenHeight - tileHeight },
        { x: 0, y: 272 },
        { x: 0, y: 368 },
        { x: screenWidth - tileWidth, y: 272 },
        { x: screenWidth - tileWidth, y: 368 }
      ];
    
      // Generate the door tiles
      for (const coord of centerTiles) {
        let doorSprite = "door_tile"; // Default sprite for center tiles
        let rotation = 0; // No rotation by default
    
        // Handle side borders with rotation and different sprite
        if (coord.x === 0 || coord.x === screenWidth - tileWidth) {
          doorSprite = "door_tile"; // Sprite for side tiles
          rotation = coord.y === 272 ? Math.PI / 2 : -Math.PI / 2; // Rotate 90 degrees clockwise or counterclockwise
        }
    
        add([
          sprite(doorSprite),
          pos(coord.x, coord.y),
          scale(1),
          rotate(rotation), // Apply rotation
          layer("bg"),
        ]);
      }
    };
    
    generateDoorTiles();
    */ 

    

    // Generate tiles for doors
      
  
  
    

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
