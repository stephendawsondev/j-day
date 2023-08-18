/**
 * Generates the scenes for the game - called by go("sceneName")
 */
 const generateScenes = () => {    
    // add welcome screen
    scene("welcome", () => {
      const welcomeBackground = add([
        sprite("welcome-background"),
        pos(0, 0),
        origin("topleft"),
        scale(1),
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
  
  
      onClick("instructions-text", () => {
        go("instructions");
      });
  
    });
  
    // add instructions
    scene("instructions", () => {
      const instructionsBackground = add([
        sprite("instructions-background"),
        pos(0, 0),
        origin("topleft"),
        scale(1),
      ]);
  
      add([
        text("Go back"),
        pos(600, 550),
        scale(0.5),
        origin("left"),
        area(),
        "back",
      ]);
  
      onClick("back", () => {
        go("welcome");
      });
    });
  };

export default generateScenes;