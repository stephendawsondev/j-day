/**
 * creates an enemy object - the function is
 * imported and called in the main.js file
 */
const spawnBasicEnemy = (randX, randY) => {
  const enemy = add([
    rect(40, 40), // placeholder until we have a sprite
    color(GREEN), // colour of the box until we have a sprite
    pos(randX, randY),
    "enemy", // tagged with enemy to reference later on
  ]);

  // set the initial enemy speed
  let enemyXSpeed = 75;
  let enemyYSpeed = 75;

  // add randomness to enemy movement
  enemy.onUpdate(() => {
    let randDir = rand() * 10 >= 5 ? rand() * 10 : rand() * -10; // generate random number for shifting position slightly so we don't have to change the speed

    // if the enemy hits the edge of the screen, reverse the direction
    if (
      (enemy.pos.x + 40 > width() && enemyXSpeed > 0) ||
      (enemy.pos.x <= 0 && enemyXSpeed < 0)
    ) {
      enemyXSpeed = -enemyXSpeed;
      enemy.pos.y = enemy.pos.y + randDir;
    }
    if (
      (enemy.pos.y > height() - 40 && enemyYSpeed > 0) ||
      (enemy.pos.y < 0 && enemyYSpeed < 0)
    ) {
      enemyYSpeed = -enemyYSpeed;
      enemy.pos.x = enemy.pos.x + randDir;
    }

    enemy.move(enemyXSpeed, enemyYSpeed);
  });

  return enemy;
};

// Code taken from https://2000.kaboomjs.com/play?demo=ai
const spawnTerminatorEnemy = (player) => {
  const ENEMY_SPEED = 160;
  const BULLET_SPEED = 700;

  const enemy = add([
    rect(40, 80), // placeholder until we have a sprite
    color(BLUE), // colour of the box until we have a sprite
    pos(width() - 80, height() - 80),
    origin("center"),
    // This enemy cycle between 3 states, and start from "idle" state
    state("move", ["idle", "attack", "move"]),
  ]);

  // Run the callback once every time we enter "idle" state.
  // Here we stay "idle" for 0.5 second, then enter "attack" state.
  enemy.onStateEnter("idle", async () => {
    await wait(0.5);
    enemy.enterState("attack");
  });

  // When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
  enemy.onStateEnter("attack", async () => {
    // Don't do anything if player doesn't exist anymore
    if (player.exists()) {
      const dir = player.pos.sub(enemy.pos).unit();

      add([
        pos(enemy.pos),
        move(dir, BULLET_SPEED),
        rect(12, 12),
        area(),
        cleanup(),
        origin("center"),
        color(BLUE),
        "bullet",
      ]);
    }

    await wait(1);
    enemy.enterState("move");
  });

  // Run the callback once every time we enter "idle" state.
  // Here we stay "idle" for 0.5 second, then enter "attack" state.
  enemy.onStateEnter("idle", async () => {
    await wait(0.5);
    enemy.enterState("attack");
  });

  enemy.onStateEnter("move", async () => {
    await wait(2);
    enemy.enterState("idle");
  });

  // Like .onUpdate() which runs every frame, but only runs when the current state is "move"
  // Here we move towards the player every frame if the current state is "move"
  enemy.onStateUpdate("move", () => {
    if (!player.exists()) return;
    const dir = player.pos.sub(enemy.pos).unit();
    enemy.move(dir.scale(ENEMY_SPEED));
  });

  // Have to manually call enterState() to trigger the onStateEnter("move") event we defined above.
  enemy.enterState("move");

  // Taking a bullet makes us disappear
  player.onCollide("bullet", (bullet) => {
    destroy(bullet);
    destroy(player);
    addKaboom(bullet.pos);
  });
};

// export the function so we have access to it in main.js
export { spawnBasicEnemy, spawnTerminatorEnemy };
