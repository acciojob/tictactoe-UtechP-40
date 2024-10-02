let row1 = document.querySelectorAll(".tac1");
let row2 = document.querySelectorAll(".tac2");
let row3 = document.querySelectorAll(".tac3");

let board = [row1, row2, row3];
let message = document.querySelector(".message");

let btn = document.querySelector("#submit");
let player1;
let player2;
let currentPlayer;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  player1 = document.querySelector("#player1").value || "Player 1";
  player2 = document.querySelector("#player2").value || "Player 2";
  currentPlayer = player1;

  document.querySelector(".users").style.display = "none";
  document.querySelector(".container").style.display = "block";
  message.innerText = `${currentPlayer}, you're up`;
});

let moveCount = 1;
for (let boardRow of board) {
  for (let box of boardRow) {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
        if (moveCount % 2 !== 0) {
          box.innerText = "X";
          if (checkWin("X")) {
            message.innerText = `${player1}, congratulations you won!`;
            return;
          }
          currentPlayer = player2;
        } else {
          box.innerText = "O";
          if (checkWin("O")) {
            message.innerText = `${player2}, congratulations you won!`;
            return;
          }
          currentPlayer = player1;
        }
        message.innerText = `${currentPlayer}, you're up`;
        moveCount++;
      }
    });
  }
}

function checkWin(player) {
  let n = board.length;
  for (let i = 0; i < n; i++) {
    let countRows = 0;
    let countColumns = 0;

    for (let j = 0; j < n; j++) {
      if (board[i][j].innerText == player) {
        countRows++;
      }
      if (board[j][i].innerText == player) {
        countColumns++;
      }
    }

    if (countRows === 3 || countColumns === 3) {
      return true;
    }
  }

  let countDiagonals1 = 0;
  let countDiagonals2 = 0;
  for (let i = 0; i < n; i++) {
    if (board[i][i].innerText == player) {
      countDiagonals1++;
    }
    if (board[i][n - 1 - i].innerText == player) {
      countDiagonals2++;
    }
  }

  if (countDiagonals1 === 3 || countDiagonals2 === 3) {
    return true;
  }

  return false;
}
