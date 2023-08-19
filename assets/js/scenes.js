import createInstructionsScene from "./scenes/instructionsScene.js";
import createWelcomeScene from "./scenes/welcomeScene.js";
import createGameScene from "./scenes/gameScene.js";

/**
 * Generates the scenes for the game - called by go("sceneName")
 */

const generateScenes = () => {
  createWelcomeScene();
  createInstructionsScene();
  createGameScene();
};

export default generateScenes;
