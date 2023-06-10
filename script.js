const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endgameEl = document.querySelector("#end-game-container");
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const settingsForm = document.querySelector("#settings-form");
const difficultySelect = document.querySelector("#difficulty");

// List of words for game
const words = [
  "jumpy",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "normal",
  "blonde",
  "silver",
  "highfalutin",
  "superficial",
  "execute",
  "eight",
  "peace",
  "admit",
  "drag",
  "loving",
];

//init words
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

//set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "Medium";

//set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "Medium";

//focus on text on start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add word to dom
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDom();

//update score

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + " s";

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

//game over
function gameOver() {
  endgameEl.innerHTML = `
  <h1>time ran out </h1>
  <p> your final score is ${score} </p>
  <button onclick = 'location.reload()'>Reload</button>
  `;

  endgameEl.style.display = "flex";
}

//event listener

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 3;
    } else if (difficulty === "medium") {
      time += 4;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
