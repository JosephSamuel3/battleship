// dom.js
export default class DOMManager {
    constructor(gameController) {
        this.game = gameController;
        this.playerBoardContainer = document.getElementById("player-board");
        this.cpuBoardContainer = document.getElementById("cpu-board");
        this.turnDisplay = document.getElementById("turn-display");
        this.messageDisplay = document.getElementById("message");
        this.restartButton = document.getElementById("restart-btn");
    }

    renderBoards(playerBoard, cpuBoard) {
        this.playerBoardContainer.innerHTML = "";
        this.cpuBoardContainer.innerHTML = "";

        // Render player’s board
        playerBoard.board.forEach((row, x) => {
            row.forEach((cell, y) => {
                const div = document.createElement("div");
                div.classList.add("cell", "player-cell");
                div.dataset.x = x;
                div.dataset.y = y;

                // Optionally show player’s ships
                if (cell !== null) div.classList.add("ship-cell");

                this.playerBoardContainer.appendChild(div);
            });
        });

        // Render CPU’s board
        cpuBoard.board.forEach((row, x) => {
            row.forEach((cell, y) => {
                const div = document.createElement("div");
                div.classList.add("cell", "cpu-cell");
                div.dataset.x = x;
                div.dataset.y = y;
                this.cpuBoardContainer.appendChild(div);
            });
        });
    }
    
    attachEventListeners() {
        this.cpuBoardContainer.addEventListener("click", (e) => {
            const cell = e.target.closest(".cpu-cell");
            if (!cell) return 

            if (this.game.currTurn !== "player" || this.game.gameOver) return 
            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);

            this.game.playerAttack(x, y);
        });
        
        this.restartButton.addEventListener("click", () => {
            this.game.resetGame();
            this.messageDisplay.textContent = "";
        });
    }


    updateBoardCell(boardType, x, y, result) {
        const boardContainer = boardType === "player"
            ? this.playerBoardContainer
            : this.cpuBoardContainer;

        const cell = boardContainer.querySelector(
            `[data-x="${x}"][data-y="${y}"]`
        );

        if (!cell) return;

        if (result === "hit") cell.classList.add("hit");
        else if (result === "miss") cell.classList.add("miss");
    }

    updateTurnDisplay(currentTurn) {
        this.turnDisplay.textContent =
        currentTurn === "player" ? "Player's Turn" : "Computer's Turn";

        if (currentTurn === "player") {
            this.playerBoardContainer.classList.add("inactive-turn");
            this.playerBoardContainer.classList.remove("active-turn");
            this.cpuBoardContainer.classList.add("active-turn");
            this.cpuBoardContainer.classList.remove("inactive-turn");
        } else {
            this.cpuBoardContainer.classList.add("inactive-turn");
            this.cpuBoardContainer.classList.remove("active-turn");
            this.playerBoardContainer.classList.add("active-turn");
            this.playerBoardContainer.classList.remove("inactive-turn");
        }
    }

    displayWinner(winner) {
        this.messageDisplay.textContent = `${winner} Wins!`;
        this.turnDisplay.textContent = "Game Over";
    }
}
