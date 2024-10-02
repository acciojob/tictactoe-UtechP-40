let row1 = document.querySelectorAll(".tac1");
let row2 = document.querySelectorAll(".tac2");
let row3 = document.querySelectorAll(".tac3");

let board = [row1, row2, row3];
let message = document.querySelector(".message");

let btn = document.querySelector("#submit");
let player1;
let player2;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  player1 = document.querySelector("#player1").value;
  player2 = document.querySelector("#player2").value;
  document.querySelector(".users").style.display = "none";
  document.querySelector(".container").style.display = "block";
});

let i = 1;
for (let board1 of board) {
  for (let box of board1) {
    box.addEventListener("click", () => {
      if (box.innerText == "") {
        if (i % 2 !== 0) {
          message.innerText = `${player1}, you're up`;
          box.innerText = "X";
          if (checkWin("X")) {
            message.innerText = `${player1}, congratulations you won!`;
            disableBoard();
          }
        }
        if (i % 2 === 0) {
          message.innerText = `${player2}, you're up`;
          box.innerText = "O";
          if (checkWin("O")) {
            message.innerText = `${player2}, congratulations you won!`;
            disableBoard();
          }
        }
        i++;
        if (i === 10 && !checkWin("X") && !checkWin("O")) {
          message.innerText = "It's a draw!";
          disableBoard();
        }
      }
    });
  }
}

function checkWin(player) {
  let n = board.length;
  for (let i = 0; i < board.length; i++) {
    let countRows = 0;
    let countColumns = 0;

    for (let j = 0; j < board.length; j++) {
      if (board[i][j].innerText == player) {
        countRows++;
      }
      if (board[j][i].innerText == player) {
        countColumns++;
      }
    }
    if (countRows == 3 || countColumns == 3) {
      return true;
    }
  }

  let countDiagonals = 0;
  for (let i = 0; i < n; i++) {
    if (board[i][i].innerText == player) {
      countDiagonals++;
    }
  }
  if (countDiagonals == 3) {
    return true;
  }
  countDiagonals = 0;
  for (let i = 0; i < n; i++) {
    if (board[i][n - 1 - i].innerText == player) {
      countDiagonals++;
    }
  }
  if (countDiagonals == 3) {
    return true;
  }
  return false;
}

function disableBoard() {
  for (let row of board) {
    for (let box of row) {
      box.style.pointerEvents = "none";
    }
  }
}
