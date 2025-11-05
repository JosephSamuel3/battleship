import Player from "./player.js"

export default class GameController {
    constructor(domController) {
        this.dom = domController
        this.player = new Player()
        this.computer = new Player("computer")
        this.currTurn = "player";
        this.gameOver = false;
    }

    startGame() {
        this.gameOver = false;
        // Randomize ship placement for both players
        this.player.gameboard.randomizeFleet();
        this.computer.gameboard.randomizeFleet();

        // Render initial boards
        this.dom.renderBoards(this.player.gameboard, this.computer.gameboard);
        this.dom.updateTurnDisplay(this.currTurn);

        // Attach DOM listeners
        this.dom.attachEventListeners();
    }

    playerAttack(x, y) {
        if (this.isGameOver || this.currTurn !== "player") return;

        const result = this.computer.gameboard.receiveAttack(x, y);
        this.dom.updateBoardCell("computer", x, y, result.result);

        if (result.result === "invalid") return; // already attacked that cell

        if (this.computer.gameboard.allShipSunk()) {
            this.isGameOver = true;
            this.dom.displayWinner("Player");
            return;
        }

        this.switchTurn();
        setTimeout(() => this.computersTurn(), 700);
    }

    switchTurn() {
        this.currTurn = this.currTurn === "player" ? "computer" : "player";
        this.dom.updateTurnDisplay(this.currTurn)
    }

    computersTurn() {
        if (this.isGameOver) return;

        const { x, y, result } = this.computer.smartAttack(this.player.gameboard);
        this.dom.updateBoardCell("player", x, y, result.result);

        if (result.result === "invalid") return;

        if (this.player.gameboard.allShipSunk()) {
            this.isGameOver = true;
            this.dom.displayWinner("Computer");
            return;
        }

        this.switchTurn();
    }

    resetGame() {
        this.isGameOver = false;
        this.player.gameboard.resetBoard();
        this.computer.gameboard.resetBoard();
        this.currTurn = "player";
        this.startGame();
    }
}