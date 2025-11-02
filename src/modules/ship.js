export default class Ship {
    constructor(name, length) {
        if(typeof length !== "number" || length <= 0){
            throw new Error ("Enter a number greater than 0!")
        }
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        if (this.hits < this.length) {
            this.hits++;
        }
        this.#checkIfSunk();
    }

    #checkIfSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }
    isSunk(){
        return this.sunk
    }
}