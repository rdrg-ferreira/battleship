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

                square.dataset.x = i;
                square.dataset.y = j;
                board.appendChild(square);
            }
        }
    }

    buildGrid(p1);
    buildGrid(p2);
}

export function initShips() {
    const ships = document.querySelectorAll("#ship-container > .ship");

    ships.forEach(s => {
        s.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", "ship");

            // hide original after drag image is created
            requestAnimationFrame(() => {
                s.classList.add("dragging");
            });
        });

        s.addEventListener("dragend", () => {
            s.classList.remove("dragging");
        });
    });
}

export function renderBoardShips(player) {
    const board = document.querySelector(`#${player.name}-board > .board`);

    for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const state = player.board.grid[i][j];
                if (!(state instanceof Ship)) continue;

                const square = board.querySelector(`.square[data-x="${i}"][data-y="${j}"]`);

                square.classList.add("ship");
                square.dataset.x = i;
                square.dataset.y = j;
            }
        }
}