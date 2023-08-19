import { spawnBasicEnemy, spawnTerminatorEnemy } from "../enemy.js";
import { spawnPlayer } from "../player.js";

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
};

export default createGameScene;
