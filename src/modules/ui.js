import { Ship } from "./ship.js";

export function buildGameboards(p1, p2) {
    function buildGrid(player) {
        const board = document.querySelector(`#${player.name}-board > .board`);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const state = player.board.grid[i][j];
                const square = document.createElement("div");
                square.classList.add("square");

                if (player.type === "robot") square.classList.add("unknown");
                else if (player.type === "real" && state instanceof Ship) square.classList.add("ship");

                square.dataset.x = i;
                square.dataset.y = j;
                board.appendChild(square);
            }
        }
    }

    buildGrid(p1);
    buildGrid(p2);
}