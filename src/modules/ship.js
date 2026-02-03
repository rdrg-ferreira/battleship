export class Ship {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this.hasSunk = false;
    }

    hit() {
        this.hitCount++;
        this.isSunk();
    }

    isSunk() {
        this.hasSunk = this.length === this.hitCount;
    }
}