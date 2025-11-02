// player.js
import { Gameboard } from "./gameboard.js";

export default class Player {
    constructor(type = "real") {
        this.type = type; // "real" or "computer"
        this.gameboard = new Gameboard();
    }

    attack(enemyBoard, x, y) {
        return enemyBoard.receiveAttack(x, y);
    }

    randomAttack(enemyBoard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (
            enemyBoard.successfullHits.some(coord => coord[0] === x && coord[1] === y) ||
            enemyBoard.missedHits.some(coord => coord[0] === x && coord[1] === y)
        );

        return this.attack(enemyBoard, x, y);
    }
}
