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
        scale(1),
      ]);
  
      /**add([
        text("Go back"),
        pos(600, 550),
        scale(0.5),
        origin("left"),
        area(),
        "back",
      ]);
  
      onClick("back", () => {
        go("instructions");
      });**/
    });
  };

export default generateScenes;