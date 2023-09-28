import { Server, Socket } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "*",
    },
});

const pendingPlayers: Socket[] = [];

io.on("connection", (socketPlayer1) => {
    socketPlayer1.on("requestMatch", () => {
        if (pendingPlayers.length > 0) {
            const socketPlayer2 = pendingPlayers.shift();
            if (socketPlayer2 === undefined) {
                throw Error();
            }

            const player1 = {
                mainPlayer: true,
                symbol: 'cross',
                socket: socketPlayer1,
            };
            player1.socket.emit("startMatch", {
                mainPlayer: player1.mainPlayer,
                symbol: player1.symbol,
            });

            const player2 = {
                mainPlayer: false,
                symbol: 'circle',
                socket: socketPlayer2,
            };
            player2.socket.emit("startMatch", {
                mainPLayer: player2.mainPlayer,
                symbol: player2.symbol,
            });


            const board = Array(9).fill(null);
            player1.socket.on("played", turn => playerPlayed(board, turn, player1, player2));
            player2.socket.on("played", turn => playerPlayed(board, turn, player2, player1));
        } else {
            pendingPlayers.push(socketPlayer1);
        }
    });
});

const playerPlayed = (board: string[], turn: any, currentPlayer: any, nextPlayer: any) => {
    board[turn.position] = turn.symbol;
    nextPlayer.socket.emit("turnEnd", turn);

    const result = checkEnd(board);
    if (result !== null) {
        currentPlayer.socket.emit("end", {
            win: currentPlayer.symbol === result,
        });
        nextPlayer.socket.emit("end", {
            win: nextPlayer.symbol === result,
        });
    }
};

const checkEnd = (board: string[]) => {
   const lines = [
       [0, 1, 2],
       [0, 3, 6],
       [0, 4, 8],
       [3, 4, 5],
       [6, 7, 8],
       [2, 4, 6],
       [1, 4, 7],
       [2, 5, 8],
   ];

   for (let line of lines) {
      let countCross = 0;
      let countCircle = 0;

      for (let i of line) {
         if (board[i] === "cross") {
            countCross++;
         } else if (board[i] === "circle") {
            countCircle++;
         }
      }

      if (countCross === 3) {
         return 'cross';
      } else if (countCircle === 3) {
         return 'cricle';
      }
   }

   return null;
}
