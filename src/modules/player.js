// player.js
import { Gameboard } from "./gameboard.js";

export default class Player {
    constructor(type = "real") {
        this.type = type; // "real" or "computer"
        this.gameboard = new Gameboard();
        this.possibleTargets = []
        this.lastHit = null;
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

        const result = this.attack(enemyBoard, x, y);
        return { x, y, result }
    }

    smartAttack(enemyBoard) {
        let x, y;
        let result;

        if (this.possibleTargets.length > 0) {
            [x, y] = this.possibleTargets.shift(); // remove and use first target
            result = this.attack(enemyBoard, x, y);
        } else {
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (
                enemyBoard.successfullHits.some(coord => coord[0] === x && coord[1] === y) ||
                enemyBoard.missedHits.some(coord => coord[0] === x && coord[1] === y)
            );
            result = this.attack(enemyBoard, x, y);
        }

        if (result.result === "hit") {
            this.lastHit = [x, y];

            // If ship not sunk yet, queue adjacent cells
            const hitShip = enemyBoard.getShipAt(x, y);
            if (!hitShip.sunk) {
                this.possibleTargets.push(...this.#getAdjacentCells(x, y, enemyBoard));
            } else {
                // Reset after a sunk ship
                this.lastHit = null;
                this.possibleTargets = [];
            }
        }

        // If miss or invalid, and no targets left, just stay random
        return { x, y, result };
    }


    #getAdjacentCells(x, y, enemyBoard) {
        const potential = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ];

        // Filter valid and not already attacked
        return potential.filter(([nx, ny]) =>
            nx >= 0 && nx < 10 &&
            ny >= 0 && ny < 10 &&
            !enemyBoard.successfullHits.some(c => c[0] === nx && c[1] === ny) &&
            !enemyBoard.missedHits.some(c => c[0] === nx && c[1] === ny)
        );
    }

}
