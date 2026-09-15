let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game when any key is pressed
document.addEventListener("keydown", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

// Game button flash
function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

// User button flash
function userFlash(btn) {
  btn.classList.add("userFlash");

  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

// Go to next level
function levelUp() {
  userSeq = [];
  level++;

  h2.innerText = "Level: " + level;

  // Random button choose
  let randomIdx = Math.floor(Math.random() * btns.length);
  let randomColor = btns[randomIdx];

  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);

  console.log("Game Sequence:", gameSeq);

  gameFlash(randomBtn);
}

// Check user's answer
function checkAns(idx) {
  // Check if user's current button is correct
  if (userSeq[idx] === gameSeq[idx]) {

    // If the user completed the current level
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }

  } else {
    // Wrong answer
    h2.innerHTML =
      `Game Over! Your score was <b>${level}</b>.<br>Press any key to restart.`;

    resetGame();
  }
}

// When user clicks a button
function btnPress() {
  let btn = this;

  userFlash(btn);

  let userColor = btn.getAttribute("id");

  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Select all game buttons
let allBtns = document.querySelectorAll(".btn");

// Add click event to every button
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Reset game
function resetGame() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
