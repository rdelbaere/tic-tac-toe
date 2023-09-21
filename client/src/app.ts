import { io } from "socket.io-client";
import '../style/app.scss';

const findGameButton = document.getElementById('findGame');
findGameButton.addEventListener('click', () => {
   const socket = io('ws://localhost:3000');
});


// let mainPlayer = true;
// const grid = document.getElementById('grid');
// grid.addEventListener('click', (e: PointerEvent) => {
//    const target = e.target as Element;
//    if (target.id === 'grid' || target.classList.contains('cross') || target.classList.contains('circle')) {
//       return;
//    }
//
//    target.classList.add(mainPlayer ? 'cross' : 'circle');
//    mainPlayer = !mainPlayer;
//
//    setTimeout(() => {
//       const result = checkEnd();
//       if (result !== null) {
//          alert(result + ' win');
//          window.location.reload();
//       }
//    }, 1);
// });
//
// function checkEnd() {
//    const cells = document.querySelectorAll('#grid > div');
//
//    const lines = [
//        [0, 1, 2],
//        [0, 3, 6],
//        [0, 4, 8],
//        [3, 4, 5],
//        [6, 7, 8],
//        [2, 4, 6],
//        [1, 4, 7],
//        [2, 5, 8],
//    ];
//
//    for (let line of lines) {
//       let countCross = 0;
//       let countCircle = 0;
//
//       for (let i of line) {
//          if (cells[i].classList.contains('cross')) {
//             countCross++;
//          } else if (cells[i].classList.contains('circle')) {
//             countCircle++;
//          }
//       }
//
//       if (countCross === 3) {
//          return 'cross';
//       } else if (countCircle === 3) {
//          return 'cricle';
//       }
//    }
//
//    return null;
// }
