export class Ship {
    constructor(length) {
        if(typeof length !== Number || length <= 0){
            throw new Error ("Enter a number greater than 0!")
        }

        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    isHit(){
        return this.hits++
    }

    isSunk(){
        if(this.length == this.hits) !this.sunk
        return this.sunk
    }
}