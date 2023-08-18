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