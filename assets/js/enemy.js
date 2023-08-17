/**
 * creates an enemy object - the function is
 * imported and called in the main.js file
 */
const spawnEnemy = (randX, randY) => {
  const enemy = add([
    rect(40, 40), // placeholder until we have a sprite
    color("black"), // colour of the box until we have a sprite
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

// export the function so we have access to it in main.js
export default spawnEnemy;
