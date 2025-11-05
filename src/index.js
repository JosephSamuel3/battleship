import GameController from "./modules/gamecontroller.js";
import DOMManager from "./modules/domManager.js";
import "./styles.css"

document.addEventListener("DOMContentLoaded", () => {
  const domManager = new DOMManager();
  const gameController = new GameController(domManager);
  domManager.game = gameController; // link both ways
  gameController.startGame();
});