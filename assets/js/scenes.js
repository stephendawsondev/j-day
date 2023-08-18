/**
 * Generates the scenes for the game - called by go("sceneName")
 */
const generateScenes = () => {
  // add welcome screen
  scene("welcome", () => {
    const welcomeBackground = add([
      sprite("welcome"),
      pos(0, 0),
      origin("topleft"),
      scale(1),
    ]);
    const startText = add([
      text("Start Game"),
      color(YELLOW),
      pos(width() / 4, height() / 2),
      scale(0.5),
      origin("center"),
      area(),
      "start-text",
    ]);
    const instructionsText = add([
      text("How to play"),
      color(YELLOW),
      pos(width() / 4, height() / 2 + 100),
      scale(0.5),
      origin("center"),
      area(),
      "instructions-text",
    ]);

    onClick("start-text", () => {
      go("game", {score: 0, livesLeft: 3 });
    });

    onClick("instructions-text", () => {
      go("instructions");
    });

    onKeyDown("enter", () => {
      go("game", { score: 0, livesLeft: 3 });
    });
  });

  // add instructions screen
  scene("instructions", () => {
    const instructionsBackground = add([
      sprite("instructions"),
      pos(0, 0),
      origin("topleft"),
      scale(1),
    ]);

    add([
      text("Go back"),
      pos(600, 550),
      color(YELLOW),
      scale(0.5),
      origin("left"),
      area(),
      "back",
    ]);

    onClick("back", () => {
      go("welcome");
    });
  });

  // add the game scene
  scene("game", ({ timeLeft, score, livesLeft }) => {
    layers(["bg", "game", "ui"], "game");

    // add background tiles
    const generateFloorTiles = () => {
      let positionX = 0;
      let positionY = 0;
      for (let i = 0; i < width(); i++) {
        if (positionX > width()) {
          positionX = 0;
          positionY += 34;
        }
        add([
          sprite("background-floor-tile"),
          pos(positionX, positionY),
          scale(1),
          layer("bg"),
        ]);

        positionX += 34;
      }
    };

    generateFloorTiles();
   
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
      kaboom.audio.play("game_over", { loop: false, volume: 0.5 })

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
      go("game", {score: 0, livesLeft: 3 });
    });
  });
};

export default generateScenes;