import createInstructionsScene from "./scenes/instructionsScene.js";
import createWelcomeScene from "./scenes/welcomeScene.js";
import createGameScene from "./scenes/gameScene.js";
import createGameOverScene from "./scenes/gameOverScene.js";

/**
 * Generates the scenes for the game - called by go("sceneName")
 */

const generateScenes = () => {
  createWelcomeScene();
  createInstructionsScene();
  createGameScene();
  createGameOverScene();
};

export default generateScenes;
