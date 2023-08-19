const createInstructionsScene = () => {
  // add instructions
  return scene("instructions", () => {
    const instructionsBackground = add([
      sprite("instructions-page"),
      pos(0, 0),
      origin("topleft"),
      scale(1.2),
      "start-game",
    ]);

    // start game button
    const startButton = add([
      text("Play"),
      color(YELLOW),
      pos(600, 500),
      origin("topleft"),
      scale(1),
      area(),
      "play",
    ]);

    onClick("play", () => {
      go("game");
    });
  });
};

export default createInstructionsScene;
