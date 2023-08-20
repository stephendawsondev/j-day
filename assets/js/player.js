const directions = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

const spawnPlayer = (enemy, terminator, spawnBullet) => {
  console.log(terminator);
  console.log(enemy);
  const player = add([
    sprite("sarah_l"),
    area(scale(0.6)),
    scale(1.5),
    // position in the centre
    pos(width() / 2, height() / 2),
    origin("center"),
    "sarah",
  ]);

  const PLAYER_HEIGHT = 90;
  const PLAYER_WIDTH = 96;
  // set movement speed
  let speed = 200;

  // variable to store player direction to select
  // correct avatar when moving down
  let facingR = false;

  let current_direction = directions.LEFT;

  // Define keyboard keys for the player movements
  onKeyDown("a", () => {
    if (player.pos.x > 0) {
      player.use(sprite("sarah_l"));
      player.move(-speed, 0);
      facingR = false;
      current_direction = directions.LEFT;
    }
  });

  onKeyDown("d", () => {
    if (player.pos.x <= width() - PLAYER_WIDTH) {
      player.use(sprite("sarah_r"));
      player.move(speed, 0);
      facingR = true;
      current_direction = directions.RIGHT;
    }
  });

  onKeyDown("w", () => {
    if (player.pos.y > 20) {
      player.use(sprite("sarah_b"));
      player.move(0, -speed);
      current_direction = directions.UP;
    }
  });

  onKeyDown("s", () => {
    if (player.pos.y <= height() - PLAYER_HEIGHT) player.move(0, speed);
    facingR ? player.use(sprite("sarah_r")) : player.use(sprite("sarah_l"));
    current_direction = directions.DOWN;
  });

  // onUpdate("sarah", () => console.log(current_direction));

  //shooting function
  onKeyPress("space", () => {
    if (player.exists()) {
      spawnBullet(player.pos, current_direction);
    }
  });

  // Destroy enemies
  onCollide("enemy", "playerBullet", (enemy, playerBullet) => {
    destroy(playerBullet);
    destroy(enemy);
    addKaboom(playerBullet.pos);
  });

  // Destroy terminator
  onCollide("terminator", "playerBullet", (terminator, playerBullet) => {
    destroy(playerBullet);
    destroy(terminator);
    addKaboom(playerBullet.pos);
  });

  return player;
};

function spawnPlayerBullet(bulletpos, current_direction) {
  //player shooting
  const BULLET_SPEED = 400;
  // set up starting point for bullets depending on direction
  if (current_direction == directions.LEFT) {
    bulletpos = bulletpos.add(-30, 10);
  } else if (current_direction == directions.RIGHT) {
    bulletpos = bulletpos.add(30, 10);
  } else if (current_direction == directions.UP) {
    bulletpos = bulletpos.add(0, -30);
  } else if (current_direction == directions.DOWN) {
    bulletpos = bulletpos.add(0, 30);
  }
  //add bullet
  add([
    sprite("bullet_yellow"),
    scale(0.3),
    pos(bulletpos),
    origin("center"),
    color(255, 255, 255),
    cleanup(),
    area(),
    "playerBullet",
    {
      bulletSpeed:
        current_direction == directions.LEFT ||
        current_direction == directions.UP
          ? -1 * BULLET_SPEED
          : BULLET_SPEED,
    },
  ]);
  onUpdate("playerBullet", (b) => {
    if (
      current_direction === directions.LEFT ||
      current_direction === directions.RIGHT
    ) {
      b.move(b.bulletSpeed, 0);
    } else {
      b.move(0, b.bulletSpeed);
    }

    // if (b.pos.x < 0 || b.pos.x > width()) {
    //   destroy(b);
    // }
  });
}

// play("shoot", {
//   volume: 0.2,
//   detune: rand(-1200, 1200),
// });

export { spawnPlayer, spawnPlayerBullet };
