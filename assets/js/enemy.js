/**
 * creates an enemy object - the function is
 * imported and called in the main.js file
 */
const spawnBasicEnemy = (spawnX, spawnY) => {
  const enemy = add([
    rect(40, 40), // placeholder until we have a sprite
    color(GREEN), // colour of the box until we have a sprite
    pos(spawnX, spawnY),
    area(),
    "enemy", // tagged with enemy to reference later on
  ]);

  return enemy;
};

// Code taken from https://2000.kaboomjs.com/play?demo=ai
const spawnTerminatorEnemy = (spawnX, spawnY, player) => {
  const ENEMY_SPEED = 10; //160
  const BULLET_SPEED = 30; //700

  const enemy = add([
    rect(40, 80), // placeholder until we have a sprite
    color(BLUE), // colour of the box until we have a sprite
    area(),
    pos(spawnX, spawnY),
    origin("center"),
    area(),
    // This enemy cycle between 3 states, and start from "idle" state
    state("move", ["idle", "attack", "move"]),
    "enemy",
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
};

// export the function so we have access to it in main.js
export { spawnBasicEnemy, spawnTerminatorEnemy };
