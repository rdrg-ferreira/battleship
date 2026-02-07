import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { buildGameboards, initShips, renderBoardShips } from "./ui.js";

let shipContainerTemp;
let players, currentPlayer;
function getCurrentPlayer() {return currentPlayer;}
function changeCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    if (currentPlayer.type === "robot") playComputerTurn(players[0]);
}

export function initGame() {
    shipContainerTemp = document.querySelector("#ship-container").cloneNode(true);
    players = createPlayers();
    currentPlayer = players[0];
    initShips();
    placeTestShips(players[1]);
    buildGameboards(players[0], players[1]);

    initBoard();
    placeComputerShips();

    document.querySelector("#start").addEventListener("click", () => {
        toggleBoard(players[0]);
        toggleBoard(players[1]);
    }, { once: true });
}

function createPlayers() {
    const p1 = new Player("Player-1", "real");
    const p2 = new Player("Player-2", "robot");
    return [p1, p2];
}

function placeComputerShips() {
    // TODO
}

function placeTestShips(p) {
    for (let i = 0; i < 5; i++) {
        const s = new Ship(i + 1);
        p.board.placeShip(s, 0, i * 2, "down");
    }
}

function handleWin(player) {
    const winDialog = document.querySelector("#win-dialog");
    const closeButton = document.querySelector("#close-win-dialog");
    const text = winDialog.querySelector("h1");

    text.textContent = player.name + " has won the game";
    closeButton.addEventListener("click", () => {
        winDialog.close();
        document.querySelector("#reset").click();
    });
    winDialog.showModal();
}

function toggleBoard(player) {
    const board = document.querySelector(`#${player.name}-board > .board`);

    board.addEventListener("click", (e) => {
        if (getCurrentPlayer() === player || !e.target.classList.contains("square")) return;

        const square = e.target;
        const [previousState, success] = player.board.receiveAttack(square.dataset.x, square.dataset.y);

        if (!success) return;

        if (previousState instanceof Ship) square.classList.add("ship");
        square.classList.add("shot");
        square.classList.remove("unknown");

        if (player.board.haveAllShipsSunk()) {
            handleWin(...players.filter(p => p.name !== player.name));
            return;
        }

        changeCurrentPlayer();
    });
}

function initBoard() {
    const board = document.querySelector("#Player-1-board > .board");
    const player = players[0];

    board.addEventListener("dragover", (e) => e.preventDefault());

    board.addEventListener("dragenter", (e) => {
        if (e.target.classList.contains("square")) {
            e.target.classList.add("dragover");
        }
    });

    board.addEventListener("dragleave", (e) => {
        if (e.target.classList.contains("square")) {
            e.target.classList.remove("dragover");
        }
    });

    board.addEventListener("drop", (e) => {
        // prevent default action (open as link for some elements)
        e.preventDefault();

        if (e.target.classList.contains("square")) {
            const dragged = document.querySelector("#ship-container > .ship.dragging");
            e.target.classList.remove("dragover");
            const ship = new Ship(parseInt(dragged.dataset.length));

            const success = player.board.placeShip(ship, parseInt(e.target.dataset.x), parseInt(e.target.dataset.y), dragged.parentNode.dataset.orientation);

            if (success) {
                document.querySelector("#ship-container").removeChild(dragged);
                e.target.appendChild(dragged);
                renderBoardShips(player);
                if (player.board.ships.length === 5) document.querySelector("#start").disabled = false;
            } else {
                dragged.classList.remove("dragging");
            }
        }
    });
}

function playComputerTurn(enemy) {
    let x = getRandomInt(10), y = getRandomInt(10);
    while (enemy.board.grid[x][y] === 1) x = getRandomInt(10), y = getRandomInt(10);
    const square = document.querySelector(`#${enemy.name}-board .square[data-x="${x}"][data-y="${y}"]`);
    square.click();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

document.querySelector("#reset").addEventListener("click", (e) => {
    e.stopPropagation();

    const boards = document.querySelectorAll(".board");
    boards.forEach(b => {
        const newB = b.cloneNode(false);
        b.parentNode.replaceChild(newB, b);
    });

    const shipContainer = document.querySelector("#ship-container");
    document.querySelector("#Player-1-board").replaceChild(shipContainerTemp, shipContainer);

    const axisButton = document.querySelector("#axis");
    if (axisButton.textContent === "Axis: Y") axisButton.click();

    document.querySelector("#start").disabled = true;

    initGame();
});