import { spawnBasicEnemy, spawnTerminatorEnemy } from "../enemy.js";
import { spawnPlayer } from "../player.js";

// Spawn points for basic enemies
const spawnPoints = [
  { x: 450, y: 520 },
  { x: 720, y: 290 },
  { x: 450, y: 40 },
  { x: 40, y: 290 },
];
const randomIndex = Math.floor(Math.random() * spawnPoints.length);
const randomSpawnPoint = spawnPoints[randomIndex];

const createGameScene = () => {
  // add the game scene
  return scene("game", ({ score, livesLeft }) => {
    layers(["bg", "game", "ui"], "game");

    const mainMusic = play("main_music", { loop: true, volume: 0.4 });

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
    const animFrames = [
      "arcade_1",
      "arcade_2",
      "arcade_3",
      "arcade_4",
      "arcade_5",
      "arcade_6",
      "arcade_7",
      "arcade_8",
      "arcade_9",
      "arcade_10",
      "arcade_11",
      "arcade_12",
      "arcade_13",
      "arcade_14",
      "arcade_15",
      "arcade_16",
    ];

    const animatedObject = add([
      sprite(animFrames[0]),
      pos(80, 80),
      scale(2),
      layer("game"),
    ]);

    // Function to update animation frames
    function updateAnimation() {
      let currentFrameIndex = animFrames.indexOf(animatedObject.frame);
      currentFrameIndex = (currentFrameIndex + 1) % animFrames.length;
      animatedObject.use(animFrames[currentFrameIndex]);
    }

    // Update animation frames every 0.2 seconds
    action(() => {
      every(0.2, updateAnimation);
    });

    const objectarea = [
      { x: 400, y: 400, spriteName: "burger" },
      { x: 200, y: 300, spriteName: "hotdog" },
      { x: 600, y: 10, spriteName: "pink_neon" },
      { x: 200, y: 10, spriteName: "green_neon" },
      { x: 600, y: 34, spriteName: "pinball" },
      { x: 650, y: 34, spriteName: "pinball" },
      { x: 700, y: 34, spriteName: "pinball" },

      // Add more objects as needed
    ];

    for (const obj of objectarea) {
      add([sprite(obj.spriteName), pos(obj.x, obj.y), scale(1), layer("bg")]);
    }

    // spawn player as placeholder
    var player = spawnPlayer(enemy, terminator);

    // spawn basic enemy example
    var enemy = spawnBasicEnemy(randomSpawnPoint.x, randomSpawnPoint.y, player);

    // spawn terminator example
    var terminator = spawnTerminatorEnemy(
      randomSpawnPoint.x,
      randomSpawnPoint.y,
      player
    );

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
};

export default createGameScene;
