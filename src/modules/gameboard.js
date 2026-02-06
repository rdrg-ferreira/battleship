import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.ships = [];
    }

    placeShip(ship, x, y, orientation) {
        let xCopy = x, yCopy = y;
        for (let i = 0; i < ship.length; i++) {
            if (xCopy >= 0 && yCopy >= 0 && !(this.grid[xCopy][yCopy] instanceof Ship)) {
                this.grid[xCopy][yCopy] = ship;
            } else {
                this.removeShip(ship.length, x, y, orientation);
                return false;
            }

            if (orientation === "up") xCopy--;
            else if (orientation === "right") yCopy++;
            else if (orientation === "down") xCopy++;
            else if (orientation === "left") yCopy--;
        }

        this.ships.push(ship);
        return true;
    }

    removeShip(length, x, y, orientation) {
        for (let i = 0; i < length; i++) {
            if (x >= 0 && y >= 0 && this.grid[x][y] !== 0) {
                this.grid[x][y] = 0;
            }

            if (orientation === "up") x--;
            else if (orientation === "right") y++;
            else if (orientation === "down") x++;
            else if (orientation === "left") y--;
        }
    }

    receiveAttack(x, y) {
        if (x < 0 || y < 0 || this.grid[x][y] === 1) return [null, false];

        if (this.grid[x][y] instanceof Ship) this.grid[x][y].hit();
        
        const previousState = this.grid[x][y];
        this.grid[x][y] = 1;
        return [previousState, true];
    }

    haveAllShipsSunk() {
        return this.ships.every(ship => ship.hasSunk);
    }
}