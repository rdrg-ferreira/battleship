import { Ship } from "./ship.js";

export function buildGameboards(player, enemy) {
    function buildGrid(player, enemy) {
        const boardElement = document.querySelector(`#${player.name}-board > .board`);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const state = player.board.grid[i][j];
                const square = document.createElement("div");
                square.classList.add("square");

                if (player.type === "robot") square.classList.add("unknown");
                else if (player.type === "real" && state instanceof Ship) square.classList.add("ship");

                square.dataset.x = i;
                square.dataset.y = j;
                boardElement.appendChild(square);
            }
        }
    }

    buildGrid(player, enemy);
    buildGrid(enemy, player);
}