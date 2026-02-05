import "./styles.css";
import { Player } from "./modules/player.js";
import { Ship } from "./modules/ship.js";
import { buildGameboards } from "./modules/renderElements.js";

function initGame() {
    const p1 = new Player("Player-1", "real");
    const p2 = new Player("Player-2", "robot");

    for (let i = 0; i < 5; i++) {
        const s1 = new Ship(i + 1);
        p1.board.placeShip(s1, 0, i * 2, "down");
        console.log(p1.board.ships[i]);

        const s2 = new Ship(i + 1);
        p2.board.placeShip(s2, 0, i * 2, "down");
        console.log(p2.board.ships[i]);
    }

    buildGameboards(p1, p2);
    playGame();
}

function playGame() {

}

window.addEventListener("load", initGame());