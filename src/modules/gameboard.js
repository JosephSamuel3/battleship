import Ship from "./ship.js"

export class Gameboard {
    constructor() {
        this.board = Array.from({length: 10}, ()=> Array(10).fill(null));
        this.successfullHits = [];
        this.missedHits =[];
        this.ships = [];
    }

    placeship(ship, startX, startY, orientation){
        if (!this.#isValidPlacement(ship, startX, startY, orientation)){
            return false;
        }

        const coordinates = [];

        if (orientation === "horizontal"){
            for(let i = 0; i < ship.length; i++){
                let x = startX;
                let y = startY + i;
                this.board[x][y] = ship;
                coordinates.push([x,y]);
            }
        }
        else if (orientation === "vertical") {
            for(let i = 0; i < ship.length; i++){
                let x = startX + i;
                let y = startY;
                this.board[x][y] = ship;
                coordinates.push([x,y]);
            }
        }

        this.ships.push({ ship, coordinates });
        return true;
    }

    #isValidPlacement(ship, startX, startY, orientation){
        if(orientation === "vertical"){
            if(startX + ship.length > this.board.length) return false;
            for(let i = 0; i < ship.length; i++){
                if(this.board[startX + i][startY] !== null) return false;
            }
        }else {
            if(startY + ship.length > this.board[0].length) return false;
            for(let i = 0; i < ship.length; i++){
                if(this.board[startX][startY + i] !== null) return false;
            }
        }
        return true;
    }

    receiveAttack(x,y){
        if(this.successfullHits.some(coord => coord[0] === x && coord[1] === y) || 
            this.missedHits.some(coord => coord[0] === x && coord[1] === y)){
            return false; // coordinate was already hit
        }

        if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length) {
            return { result: "invalid" };
        }

        const cell = this.board[x][y]

        if(cell === null){
            this.missedHits.push([x,y]);
            return false;
        }else {
            const ship = this.board[x][y];
            ship.hit();
            this.successfullHits.push([x,y]);
            return true;
        }

    }

    allShipSunk(){
        this.ships.every(entry => entry.ship.sunk())
    }

    resetBoard(){
        this.board = Array.from({length: 10}, ()=> Array(10).fill(null));
        this.ships = []
        this.missedHits = []
        this.successfullHits = []
    }
}