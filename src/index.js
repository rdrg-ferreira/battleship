import "./styles.css";
import { Player } from "./modules/player.js";
import { Ship } from "./modules/ship.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function initGame() {
    const p1 = new Player("Player 1", "real");
    const p2 = new Player("Player 2", "robot");
    const orientations = ["up", "right", "down", "left"];

    for (let i = 0; i < 5; i++) {
        const s1 = new Ship(getRandomInt(5));
        p1.board.placeShip(s1, getRandomInt(10), getRandomInt(10), orientations[getRandomInt(3)]);
        console.log(p1.board.ships[i]);
        

        const s2 = new Ship(getRandomInt(5));
        p2.board.placeShip(s2, getRandomInt(10), getRandomInt(10), orientations[getRandomInt(3)]);
        console.log(p2.board.ships[i]);
    }
}

window.addEventListener("load", initGame());