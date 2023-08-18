export const spawnPlayer = () => {
  const player = add([
    sprite("sarah_l"),
    area(),
    scale(1.5),
    pos(0, 0),
    "sarah",
  ]);

  // set movement speed
  let speed = 150;

  // Define keyboard keys for the moves
  onKeyDown("left", () => {
    player.use(sprite("sarah_l"));
    player.move(-speed, 0);
  });

  onKeyDown("right", () => {
    player.use(sprite("sarah_r"));
    player.move(speed, 0);
  });

  onKeyDown("up", () => {
    player.use(sprite("sarah_b"));
    player.move(0, -speed);
  });

  onKeyDown("down", () => {
    player.move(0, speed);
  });

  return player;
};
