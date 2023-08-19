// add background tiles
const generateFloorTiles = () => {
    let positionX = 0;
    let positionY = 0;
    for (let i = 0; i < width(); i++) {
      if (positionX > width()) {
        positionX = 0;
        positionY += 32;
      }
      add([
        sprite("background-main-tile"),
        pos(positionX, positionY),
        scale(1),
        layer("bg"),
      ]);

      positionX += 32;
    }
  };

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

    // play game
    // is to be changed later
    scene("game", () => {
        const gameBackground = add([
          sprite("game-page"),
          color(YELLOW),
          pos(0, 0),
          origin("topleft"),
          scale(1),
        ]);
    
        add([
          text("Go back"),
          pos(60, 550),
          scale(0.5),
          origin("left"),
          area(),
          "back",
        ]);
    
        onClick("back", () => {
          go("instructions");
        });

        // quit game 
        add([
            text("Quit"),
            pos(600, 550),
            scale(0.5),
            origin("left"),
            area(),
            "quit",
          ]);

          onClick("quit", () => {
            go("gameOver");
          });

      });

      // game over 
    scene("gameOver", () => {
        const quitBackground = add([
          sprite("quit-page"),
          pos(0, 0),
          origin("topleft"),
          scale(1.2),
        ]);
      });
  };

export default generateScenes;