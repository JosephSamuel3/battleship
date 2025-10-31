export class Gameboard {
    constructor(boardLength = 10) {
        this.boardLength = boardLength
        this.board = Array.from({length: boardLength}), ()=> Array(this.boardLength).fill(null)
        this.successfullHits = []
        this.missedHits =[]
    }
}