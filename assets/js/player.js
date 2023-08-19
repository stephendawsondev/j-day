const spawnPlayer = () => {
  const player = add([
    sprite("sarah_l"),
    area(),
    scale(1.5),
    // position in the centre, accounting for the size of the sprite
    pos(width() / 2 - 64, height() / 2 - 64),
    "sarah",
  ]);

  const PLAYER_HEIGHT = 90;
  const PLAYER_WIDTH = 96;
  // set movement speed
  let speed = 200;

  // variable to store player direction to select
  // correct avatar when moving down
  let facingR = false;
  const directions = {
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
  };
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

  //player shooting
  const BULLET_SPEED = 400;

  onKeyPress("space", () => {
    if (player.exists()) {
      spawnBullet(player.pos);
    }
  });

  function spawnBullet(bulletpos) {
    // set up starting point for bullets depending on direction

    if (current_direction == directions.LEFT) {
      bulletpos = bulletpos.add(0, 50);
    } else if (current_direction == directions.RIGHT) {
      bulletpos = bulletpos.add(70, 50);
    } else if (current_direction == directions.UP) {
      bulletpos = bulletpos.add(30, 10);
    } else if (current_direction == directions.DOWN) {
      bulletpos = bulletpos.add(30, 80);
    }

    add([
      rect(7, 7),
      pos(bulletpos),
      origin("center"),
      color(255, 255, 255),
      area(),
      "bullet",
      {
        bulletSpeed:
          current_direction == directions.LEFT ||
          current_direction == directions.UP
            ? -1 * BULLET_SPEED
            : BULLET_SPEED,
      },
    ]);
  }

  // play("shoot", {
  //   volume: 0.2,
  //   detune: rand(-1200, 1200),
  // });

  onUpdate("bullet", (b) => {
    if (
      current_direction === directions.LEFT ||
      current_direction === directions.RIGHT
    ) {
      b.move(b.bulletSpeed, 0);
    } else {
      b.move(0, b.bulletSpeed);
    }

    if (b.pos.x < 0 || b.pos.x > width()) {
      destroy(b);
    }
  });

  // enemy.onCollide("bullet", (bullet) => {
  //   destroy(bullet);
  //   destroy(enemy);
  //   addKaboom(bullet.pos);
  // });

  return player;
};

export { spawnPlayer };
