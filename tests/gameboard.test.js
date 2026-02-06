import { Gameboard } from '../src/modules/gameboard';
import { Ship } from '../src/modules/ship';

beforeEach(() => {
    g = new Gameboard();
});

describe("placeShip function", () => {
    beforeEach(() => s = new Ship(3)); // ex of a ship sent by a player to place on the chosen coords

    test("gameboard can place a ship at specific coords with horizontal orientation", () => {
        const x = 3, y = 2, orientation = "right";
        g.placeShip(s, x, y, orientation);
        expect(g.grid[3][2]).toBeInstanceOf(Ship);
        expect(g.grid[3][3]).toBeInstanceOf(Ship);
        expect(g.grid[3][4]).toBeInstanceOf(Ship);
    });

    test("gameboard can place a ship at specific coords with vertical orientation", () => {
        const x = 3, y = 2, orientation = "up";
        g.placeShip(s, x, y, orientation);
        expect(g.grid[3][2]).toBeInstanceOf(Ship);
        expect(g.grid[2][2]).toBeInstanceOf(Ship);
        expect(g.grid[1][2]).toBeInstanceOf(Ship);
    });

    test("gameboard doesnt place a ship on an impossible position", () => {
        const x = 1, y = 2, orientation = "up";
        g.placeShip(s, x, y, orientation);
        expect(g.grid[1][2]).toBe(0);
        expect(g.grid[0][2]).toBe(0);
    });
});

describe("receiveAttack function", () => {
    test("function registers hits correctly", () => {
        const x = 3, y = 2;
        expect(g.receiveAttack(x, y)).toBeTruthy();
        expect(g.grid[x][y]).toBe(1);
    });

    test("function doesn't register hits made on a grid space that has already been shot", () => {
        const x = 3, y = 2;
        expect(g.receiveAttack(x, y)[1]).toBeTruthy();
        expect(g.receiveAttack(x, y)).toBeFalsy();
    });

    test("if a ship was it, the function sends a hit to the correct ship", () => {
        const s = new Ship(3)
        const x = 2, y = 2, orientation = "down";
        g.placeShip(s, x, y, orientation);
        expect(s.hitCount).toBe(0);

        g.receiveAttack(x, y);
        expect(s.hitCount).toBe(1);
    });
});

describe("haveAllShipsSunk function", () => {
    beforeEach(() => {
        s1 = new Ship(1);
        s2 = new Ship(1);
        g.placeShip(s1, 3, 2, "up");
        g.placeShip(s2, 6, 3, "right");
    });

    test("function works correctly if not all ships have sunk", () => {
        expect(g.haveAllShipsSunk()).toBeFalsy();

        g.receiveAttack(3, 2);
        expect(g.haveAllShipsSunk()).toBeFalsy();
    });

    test("function works correctly if all ships have sunk", () => {
        expect(g.haveAllShipsSunk()).toBeFalsy();

        g.receiveAttack(3, 2);
        g.receiveAttack(6, 3);
        expect(g.haveAllShipsSunk()).toBeTruthy();
    });
});