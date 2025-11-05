import { Ship } from "./ship.js";
export class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.successfullHits = [];
        this.missedHits = [];
        this.ships = [];
    }

    placeShip(ship, startX, startY, orientation) {
        if (!this.#isValidPlacement(ship, startX, startY, orientation)) {
            throw new Error("Invalid ship placement: overlap or out of bounds");
        }

        const coordinates = [];

        if (orientation === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                let x = startX;
                let y = startY + i;
                this.board[x][y] = ship;
                coordinates.push([x, y]);
            }
        }
        else if (orientation === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                let x = startX + i;
                let y = startY;
                this.board[x][y] = ship;
                coordinates.push([x, y]);
            }
        }

        this.ships.push({ ship, coordinates });
        return true;
    }

    #isValidPlacement(ship, startX, startY, orientation) {
        if (orientation === "vertical") {
            if (startX + ship.length > this.board.length) return false;
            for (let i = 0; i < ship.length; i++) {
                if (this.board[startX + i][startY] !== null) return false;
            }
        } else {
            if (startY + ship.length > this.board[0].length) return false;
            for (let i = 0; i < ship.length; i++) {
                if (this.board[startX][startY + i] !== null) return false;
            }
        }
        return true;
    }

    randomPlaceShip(ship) {
        const orientations = ["horizontal", "vertical"];
        let placed = false;

        while (!placed) {
            const orientation = orientations[Math.floor(Math.random() * orientations.length)];
            const startX = Math.floor(Math.random() * this.board.length);
            const startY = Math.floor(Math.random() * this.board.length);

            try {
                this.placeShip(ship, startX, startY, orientation);
                placed = true;
            } catch (error) {
                // Invalid placement — loop again
            }
        }
    }

    randomizeFleet() {
        const fleet = [
            ["carrier", 5],
            ["battleship", 4],
            ["cruiser", 3],
            ["submarine", 3],
            ["destroyer", 2],
        ];

        // Place each ship randomly
        fleet.forEach(([name, length]) => {
            const ship = new Ship(name, length);
            this.randomPlaceShip(ship);
        });
    }


    receiveAttack(x, y) {
        if (this.successfullHits.some(coord => coord[0] === x && coord[1] === y) ||
            this.missedHits.some(coord => coord[0] === x && coord[1] === y)) {
            return { result: "already attacked" }; // coordinate was already hit
        }

        if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length) {
            return { result: "invalid" };
        }

        const cell = this.board[x][y]

        if (cell === null) {
            this.missedHits.push([x, y]);
            return { result: "miss" };
        } else {
            const ship = this.board[x][y];
            ship.hit();
            this.successfullHits.push([x, y]);
            return { result: "hit", ship: ship.name };
        }
    }

    allShipSunk() {
        return this.ships.every(entry => entry.ship.isSunk())
    }

    resetBoard() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = []
        this.missedHits = []
        this.successfullHits = []
    }

    getShipAt(x, y) {
        return this.ships.find(ship =>
            ship.coordinates.some(coord => coord[0] === x && coord[1] === y)
        );
    }
}