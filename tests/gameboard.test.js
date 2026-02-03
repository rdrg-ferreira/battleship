import { Gameboard } from '../src/modules/gameboard';
import { Ship } from '../src/modules/ship';

beforeEach(() => {
    g = new Gameboard();
    s = new Ship(3); // ex of a ship sent by a player to place on the chosen coords
});

describe("placeShip function", () => {
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