import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { buildGameboards } from "./ui.js";

export function initGame() {
    const players = createPlayers();
    placeTestShips(players[0], players[1]);
    buildGameboards(players[0], players[1]);

    let currentPlayer = players[0];
    function getCurrentPlayer() {return currentPlayer;}
    function changeCurrentPlayer() {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        if (currentPlayer.type === "robot") playComputerTurn();
    }

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

function toggleBoard(player, getCurrentPlayer, changeCurrentPlayer) {
    const board = document.querySelector(`#${player.name}-board > .board`);

    board.addEventListener("click", (e) => {
        if (getCurrentPlayer() === player) return;

        const square = e.target;
        const [previousState, success] = player.board.receiveAttack(square.dataset.x, square.dataset.y);

        if (!success) return;

        if (previousState instanceof Ship) square.classList.add("ship");
        square.classList.add("shot");
        square.classList.remove("unknown");

        changeCurrentPlayer();
    });
}

function playComputerTurn() {

}