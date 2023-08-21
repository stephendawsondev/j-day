const directions = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};
// set variable to prevent all bullets updaingin the onUpdate function
let bulletUpdateSet = false;


//Create player
const spawnPlayer = (spawnBullet) => {
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

  let currentDirection = directions.LEFT;

  function updatateCurrentDirection(direction) {
    currentDirection = direction;
  }

  // Define keyboard keys for the player movements
  onKeyDown("a", () => {
    if (player.pos.x > 0) {
      player.use(sprite("sarah_l"));
      player.move(-speed, 0);
      facingR = false;
      updatateCurrentDirection(directions.LEFT);
    }
  });

  onKeyDown("d", () => {
    if (player.pos.x <= width() - PLAYER_WIDTH) {
      player.use(sprite("sarah_r"));
      player.move(speed, 0);
      facingR = true;
      updatateCurrentDirection(directions.RIGHT);
    }
  });

  onKeyDown("w", () => {
    if (player.pos.y > 20) {
      player.use(sprite("sarah_b"));
      player.move(0, -speed);
      updatateCurrentDirection(directions.UP);
    }
  });

  onKeyDown("s", () => {
    if (player.pos.y <= height() - PLAYER_HEIGHT) player.move(0, speed);
    facingR ? player.use(sprite("sarah_r")) : player.use(sprite("sarah_l"));
    updatateCurrentDirection(directions.DOWN);
  });

  //Call shooting function
  onKeyPress("space", () => {
    if (player.exists()) {
      spawnBullet(player.pos, currentDirection);
    }
  });

  return player;
};

function spawnPlayerBullet(bulletpos, currentDirection) {
  //player shooting
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
      if (cleanup()) {
        console.log("bullets removed");
      }
    });
    bulletUpdateSet = true;
  }
}

// play("shoot", {
//   volume: 0.2,
//   detune: rand(-1200, 1200),
// });

export { spawnPlayer, spawnPlayerBullet };
