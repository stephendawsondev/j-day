import { spawnBasicEnemy, spawnTerminatorEnemy } from "../enemy.js";
import { spawnPlayer } from "../player.js";

// Spawn points for basic enemies and terminator
const spawnPoints = [
  { x: 450, y: 520 },
  { x: 720, y: 290 },
  { x: 450, y: 40 },
  { x: 40, y: 290 },
];

const randomIndexTerminator = Math.floor(Math.random() * spawnPoints.length);

const createGameScene = () => {
  // add the game scene

  
  return scene("game", ({ score, livesLeft, isIntroMusicPaused}) => {
    layers(["bg", "game", "ui"], "game");

    const mainMusic = play("main_music", { loop: true, volume: 0.4 });

    if (isIntroMusicPaused) {
      mainMusic.pause();
    }
    
    

    // add background tiles
    const generateFloorTiles = () => {
      let positionX = 0;
      let positionY = 0;
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

    

    const generateWallTiles = () => {
      const tileWidth = 34;
      const tileHeight = 34;
      const screenWidth = 800;
      const screenHeight = 600;

      // Generate tiles along the top border (excluding specific columns)
      for (let x = tileWidth; x < screenWidth - tileWidth; x += tileWidth) {
        if (
          x !== tileWidth * 12 &&
          x !== tileWidth * 13 &&
          x !== tileWidth * 14 &&
          x !== tileWidth * 15
        ) {
          add([
            sprite("wall_tile"),
            pos(x, 0),
            scale(1),
            area({ width: tileWidth, height: tileHeight }),
            layer("bg"),
          ]);
        }
      }

      // Generate tiles along the bottom border (excluding specific columns)
      for (let x = tileWidth; x < screenWidth - tileWidth; x += tileWidth) {
        if (
          x !== tileWidth * 12 &&
          x !== tileWidth * 13 &&
          x !== tileWidth * 14 &&
          x !== tileWidth * 15
        ) {
          add([
            sprite("wall_tile"),
            pos(x, screenHeight - tileHeight),
            scale(1),
            area({ width: tileWidth, height: tileHeight }),
            layer("bg"),
          ]);
        }
      }

      // Generate tiles along the left border (excluding specific rows)
      for (let y = tileHeight; y < screenHeight - tileHeight; y += tileHeight) {
        if (
          y !== tileHeight * 7 &&
          y !== tileHeight * 8 &&
          y !== tileHeight * 9 &&
          y !== tileHeight * 10
        ) {
          add([
            sprite("wall_tile"),
            pos(0, y),
            scale(1),
            area({ width: tileWidth, height: tileHeight }),
            layer("bg"),
          ]);
        }
      }

      // Generate tiles along the right border (excluding specific rows)
      for (let y = tileHeight; y < screenHeight - tileHeight; y += tileHeight) {
        if (
          y !== tileHeight * 7 &&
          y !== tileHeight * 8 &&
          y !== tileHeight * 9 &&
          y !== tileHeight * 10
        ) {
          add([
            sprite("wall_tile"),
            pos(screenWidth - tileWidth, y),
            scale(1),
            area({ width: tileWidth, height: tileHeight }),
            layer("bg"),
          ]);
        }
      }

      // Generate tiles at the corners
      add([
        sprite("wall_tile"),
        pos(0, 0),
        scale(1),
        area({ width: tileWidth, height: tileHeight }),
        layer("bg"),
      ]);

      add([
        sprite("wall_tile"),
        pos(screenWidth - tileWidth, 0),
        scale(1),
        area({ width: tileWidth, height: tileHeight }),
      ]);

      add([
        sprite("wall_tile"),
        pos(0, screenHeight - tileHeight),
        scale(1),
        area({ width: tileWidth, height: tileHeight }),
        layer("bg"),
      ]);

      add([
        sprite("wall_tile"),
        pos(screenWidth - tileWidth, screenHeight - tileHeight),
        scale(1),
        area({ width: tileWidth, height: tileHeight }),
        layer("bg"),
      ]);
    };

    generateWallTiles();

    const objectarea = [
      { x: 600, y: 10, spriteName: "pink_neon" },
      { x: 200, y: 10, spriteName: "green_neon" },
      { x: 600, y: 34, spriteName: "pinball" },
      { x: 650, y: 34, spriteName: "pinball" },
      { x: 700, y: 34, spriteName: "pinball" },
      { x: 34, y: 15, spriteName: "arcade_machine1", scale: 1.2 },
      { x: 84, y: 15, spriteName: "arcade_machine2" , scale: 1.2 },
      { x: 134, y: 15, spriteName: "arcade_machine3", scale: 1.2  },
      { x: 205, y: 450, spriteName: "table" },
      { x: 180, y: 450, spriteName: "chair_left_side" },
      { x: 180, y: 480, spriteName: "chair_left_side" },
      { x: 255, y: 450, spriteName: "chair_right_side" },
      { x: 255, y: 480, spriteName: "chair_right_side" },
      { x: 230, y: 485, spriteName: "pizza" , scale: 0.6},
      { x: 230, y: 460, spriteName: "burger" , scale: 0.6},
      { x: 210, y: 470, spriteName: "mug", scale: 0.6 },
      { x: 650, y: 460, spriteName: "standing_table", scale:1.4},
      { x: 655, y: 455, spriteName: "can", scale: 0.6},
      { x: 680, y: 465, spriteName: "can", scale: 0.6},
      { x: 300, y: 60, spriteName: "table" },
      { x: 275, y: 60, spriteName: "chair_left_side" },
      { x: 275, y: 90, spriteName: "chair_left_side" },
      { x: 350, y: 60, spriteName: "chair_right_side" },
      { x: 350, y: 90, spriteName: "chair_right_side" },
      { x: 310, y: 65, spriteName: "pizza" , scale: 0.6},
      { x: 325, y: 100, spriteName: "pizza" , scale: 0.6},
      { x: 305, y: 90, spriteName: "can", scale: 0.6 },
      



     
    ];

    for (const obj of objectarea) {
      const image = add([
        sprite(obj.spriteName),
        pos(obj.x, obj.y),
        scale(obj.scale !== undefined ? obj.scale : 1), // Use the scale property if defined, or default to 1
        layer("bg"),
      ]);
    }

    // spawn player
    var player = spawnPlayer(enemy, terminator);

    // spawn basic enemy example
    const spawnEnemy = () => {
      let randomIndexEnemy = Math.floor(Math.random() * spawnPoints.length);
      var enemy = spawnBasicEnemy(spawnPoints[randomIndexEnemy].x, spawnPoints[randomIndexEnemy].y, player);
     
      if (!player.exists()) {
        clearInterval(spawnInterval);
      }
    };

    const spawnInterval = setInterval(spawnEnemy, 1500);

    // spawn terminator example
    var terminator = spawnTerminatorEnemy(spawnPoints[randomIndexTerminator].x, spawnPoints[randomIndexTerminator].y, player);
    
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

    // Quit Game
    onKeyDown("escape", () => {
      mainMusic.stop();
      go("welcome");
    });

    // Display Quit Game Text
    add([text("Esc: Quit"), pos(width() * 0.8, 0), layer("ui"), scale(0.4)]);

    // Toggle game music
    let muted = false;

    onKeyDown("m", () => {
      if (muted == false) {
        mainMusic.pause();
        muted = true;
      } else {
        mainMusic.play();
        muted = false;
      }
    });

    // Display Toggle Music Text
    add([
      text("M: Music"),
      pos(width() * 0.8, 0),
      pos(height() * 0.8, 0),
      layer("ui"),
      scale(0.4),
    ]);

    // Game Over if lives hit 0
    if (livesLeft == 0) {
      mainMusic.stop();
      go("game_over_scene", { final_score: `${score}` });
    }
  });
};

export default createGameScene;
