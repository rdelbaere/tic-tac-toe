import { io } from "socket.io-client";
import "../style/app.scss";

const socket = io("ws://localhost:3000");
const findGameButton = document.getElementById("findGame");
const gridElement = document.getElementById("grid");
const waitingElement = document.getElementById("waiting");

findGameButton.addEventListener("click", () => {
    socket.on("startMatch", matchInfo => {
        findGameButton.classList.add("hide");
        gridElement.classList.remove("hide");
        console.log(matchInfo);
        if (!matchInfo.mainPlayer) {
            displayWaitingPlayerScreen();
        }

        gridElement.addEventListener('click', (e: PointerEvent) => {
            const target = e.target as Element;
            if (target.id === 'grid' || target.classList.contains('cross') || target.classList.contains('circle')) {
                return;
            }

            target.classList.add(matchInfo.symbol);
            socket.emit("played", {
                position: Array.from(gridElement.children).indexOf(target),
                symbol: matchInfo.symbol,
            });
            displayWaitingPlayerScreen();
        });

        socket.on("turnEnd", turn => {
            console.log("Tour :", turn);

            const cell = Array.from(gridElement.children)[turn.position];
            cell.classList.add(turn.symbol);
            hideWaitingScreen();
        });

        socket.on("end", result => {
           if (result.win) {
                displayWinScreen();
           } else {
                displayLooseScreen();
           }
        });
    });

   socket.emit("requestMatch");
});

const displayWaitingPlayerScreen = () => {
    waitingElement.textContent = "En attente de l'autre joueur ...";
    waitingElement.classList.remove("hide");
};

const displayWinScreen = () => {
    waitingElement.textContent = "Gagné !";
    waitingElement.classList.remove("hide");
};

const displayLooseScreen = () => {
    waitingElement.textContent = "PERDU !";
    waitingElement.classList.remove("hide");
};

const hideWaitingScreen = () => {
    waitingElement.classList.add("hide");
};
