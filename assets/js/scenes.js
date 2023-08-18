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
        sprite("background_main_tile"),
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