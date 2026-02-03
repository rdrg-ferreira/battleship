import { Ship } from '../src/modules/ship';

test("hit count increaments correctly", () => {
    const s = new Ship(3);
    s.hit();
    expect(s.hitCount).toBe(1);
});

test("isSunk determines the ship has sunk correctly", () => {
    const s = new Ship(1);
    expect(s.hasSunk).toBeFalsy();

    s.hit();
    expect(s.hasSunk).toBeTruthy();
});