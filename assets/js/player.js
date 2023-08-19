const spawnPlayer = () => {
  const player = add([
    sprite("sarah_l"),
    area(),
    scale(1.5),
    // position in the centre, accounting for the size of the sprite
    pos(width() / 2 - 64, height() / 2 - 64),
    "sarah",
  ]);

  const playerHeight = 90;
  const playerWidth = 96;
  // set movement speed
  let speed = 200;

  // variable to store player direction to select
  // correct avatar when moving down
  let facingR = false;

  // Define keyboard keys for the player movements
  onKeyDown("a", () => {
    if (player.pos.x > 0) {
      player.use(sprite("sarah_l"));
      player.move(-speed, 0);
      facingR = false;
    }
  });

  onKeyDown("d", () => {
    if (player.pos.x <= width() - playerWidth) {
      player.use(sprite("sarah_r"));
      player.move(speed, 0);
      facingR = true;
    }
  });

  onKeyDown("w", () => {
    if (player.pos.y > 20) {
      player.use(sprite("sarah_b"));
      player.move(0, -speed);
    }
  });

  onKeyDown("s", () => {
    if (player.pos.y <= height() - playerHeight) player.move(0, speed);
    facingR ? player.use(sprite("sarah_r")) : player.use(sprite("sarah_l"));
  });
  return player;
};

export { spawnPlayer };
