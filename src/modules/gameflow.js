import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { buildGameboards } from "./ui.js";

let players, currentPlayer;
function getCurrentPlayer() {return currentPlayer;}
function changeCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    if (currentPlayer.type === "robot") playComputerTurn(players[0]);
}

export function initGame() {
    players = createPlayers();
    currentPlayer = players[0];
    placeTestShips(players[0], players[1]);
    buildGameboards(players[0], players[1]);

    toggleBoard(players[0], getCurrentPlayer, changeCurrentPlayer);
    toggleBoard(players[1], getCurrentPlayer, changeCurrentPlayer);
}

function createPlayers() {
    const p1 = new Player("Player-1", "real");
    const p2 = new Player("Player-2", "robot");
    return [p1, p2];
}

function placeTestShips(p1, p2) {
    for (let i = 0; i < 5; i++) {
        const s1 = new Ship(i + 1);
        p1.board.placeShip(s1, 0, i * 2, "down");

        const s2 = new Ship(i + 1);
        p2.board.placeShip(s2, 0, i * 2, "down");
    }
}

function handleShot(e, player) {
    if (getCurrentPlayer() === player || !e.target.classList.contains("square")) return;

    const square = e.target;
    const [previousState, success] = player.board.receiveAttack(square.dataset.x, square.dataset.y);

    if (!success) return;

    if (previousState instanceof Ship) square.classList.add("ship");
    square.classList.add("shot");
    square.classList.remove("unknown");

    changeCurrentPlayer();
}

function toggleBoard(player) {
    const board = document.querySelector(`#${player.name}-board > .board`);

    board.addEventListener("click", (e) => handleShot(e, player));
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
    initGame();
});