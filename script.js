const size = 5;
let board = [];

function createBoard() {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";
  board = [];

  for (let row = 0; row < size; row++) {
    board[row] = [];
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "is-off"); // start as OFF
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => toggle(row, col));
      board[row][col] = cell;
      boardContainer.appendChild(cell);
    }
  }
}

function toggle(row, col) {
  flip(row, col);
  flip(row - 1, col);
  flip(row + 1, col);
  flip(row, col - 1);
  flip(row, col + 1);
  checkWinState();
}

function flip(row, col) {
  if (row >= 0 && row < size && col >= 0 && col < size) {
    board[row][col].classList.toggle("is-off");
  }
}

function randomizeBoard() {
  for (let i = 0; i < 10; i++) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    toggle(r, c); // simulate click
  }
}

function checkWinState() {
  let allOn = true;
  let allOff = true;

  for (let row of board) {
    for (let cell of row) {
      if (cell.classList.contains("is-off")) {
        allOn = false; // at least one is OFF
      } else {
        allOff = false; // at least one is ON
      }
    }
  }

  const existingPopup = document.querySelector(".popup");
  if (existingPopup) return;

  if (allOff || allOn) {
    const message = allOn
      ? "All lights are ON!"
      : "All lights are OFF!";
    setTimeout(() => showPopup("🎉 You Win!", message), 50);
  }
}

function showPopup(title, message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="popup-content">
      <h2>${title}</h2>
      <p>${message}</p>
      <button onclick="closePopup()">OK</button>
    </div>
  `;
  document.body.appendChild(popup);
  popup.style.display = "flex";
}

function closePopup() {
  const popup = document.querySelector(".popup");
  if (popup) popup.remove();
  setTimeout(() => {
    resetGame();
  }, 100);
}

function resetGame() {
  createBoard();
  randomizeBoard();
}

window.onload = () => {
  resetGame();
};
