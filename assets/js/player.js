const directions = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

// Function to reset the bullet update state
const resetBulletUpdateState = () => {
  bulletUpdateSet = false;
};

// set variable to prevent all bullets updaingin the onUpdate function
let bulletUpdateSet = false;

//Create player
const spawnPlayer = () => {
  const player = add([
    sprite("sarah_l"),
    area(scale(0.1, 0.3)),
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

  let currentDirection = directions.LEFT;

  function updatateCurrentDirection(direction) {
    currentDirection = direction;
  }

  // Define keyboard keys for the player movements
  onKeyDown("a", () => {
    if (player.pos.x > PLAYER_WIDTH - 34) {
      player.use(sprite("sarah_l"));
      player.move(-speed, 0);
      facingR = false;
      updatateCurrentDirection(directions.LEFT);
    }
  });

  onKeyDown("d", () => {
    if (player.pos.x <= width() - PLAYER_WIDTH + 34) {
      player.use(sprite("sarah_r"));
      player.move(speed, 0);
      facingR = true;
      updatateCurrentDirection(directions.RIGHT);
    }
  });

  onKeyDown("w", () => {
    if (player.pos.y > 20 + 34) {
      player.use(sprite("sarah_b"));
      player.move(0, -speed);
      updatateCurrentDirection(directions.UP);
    }
  });

  onKeyDown("s", () => {
    if (player.pos.y <= height() - 68) player.move(0, speed);
    facingR ? player.use(sprite("sarah_r")) : player.use(sprite("sarah_l"));
    updatateCurrentDirection(directions.DOWN);
  });

  //Call shooting function
  onKeyPress("space", () => {
    if (player.exists()) {
      spawnPlayerBullet(player.pos, currentDirection);
      // play shooting sound
      play("shoot", {
        loop: false,
        volume: 0.1,
        detune: rand(-1200, 1200),
      });
    }
  });

  return player;
};
// has to be outside of player function to prevent bullet position updating along with
// update to the player's position, which causes the bullet to change position following
// player after spawining
function spawnPlayerBullet(bulletpos, currentDirection) {
  const BULLET_SPEED = 400;

  //set volicity of bullets depending on player direction
  let bulletVelocity = vec2(0, 0);

  if (currentDirection === directions.LEFT) {
    bulletVelocity = vec2(-BULLET_SPEED, 0);
  } else if (currentDirection === directions.RIGHT) {
    bulletVelocity = vec2(BULLET_SPEED, 0);
  } else if (currentDirection === directions.UP) {
    bulletVelocity = vec2(0, -BULLET_SPEED);
  } else if (currentDirection === directions.DOWN) {
    bulletVelocity = vec2(0, BULLET_SPEED);
  }

  const playerBullet = add([
    sprite("bullet_yellow"),
    scale(0.2),
    pos(bulletpos),
    origin("center"),
    color(255, 255, 255),
    cleanup(),
    area(),
    "playerBullet",
    {
      velocity: bulletVelocity,
    },
  ]);

  if (!bulletUpdateSet) {
    onUpdate("playerBullet", (b) => {
      b.move(b.velocity.x, b.velocity.y);
    });
    bulletUpdateSet = true;
  }
}

export { spawnPlayer, resetBulletUpdateState };
