import { words } from "./asset/words.js";

const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endgameEl = document.querySelector("#end-game-container");
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const settingsForm = document.querySelector("#settings-form");
const difficultySelect = document.querySelector("#difficulty");

//init words
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set difficulty (normalize to lowercase)
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
difficulty = difficulty.toLowerCase();

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : difficulty;

// time bonus map and current bonus (reduces as levels increase)
const baseTimeBonusMap = { easy: 5, medium: 4, hard: 3 };
let currentBonus = baseTimeBonusMap[difficulty] || 4;

// level tracking
let level = 1;
const wordsPerLevel = 4; // every 4 correct words -> level up
let correctCount = 0;
const levelBadge = document.querySelector("#level-badge");
if (levelBadge) levelBadge.innerText = `Level ${level}`;

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

    // increment correct counter and possibly level up
    correctCount++;
    if (correctCount % wordsPerLevel === 0) {
      level++;
      if (levelBadge) {
        levelBadge.innerText = `Level ${level}`;
        levelBadge.classList.add("level-up");
        setTimeout(() => levelBadge.classList.remove("level-up"), 800);
      }

      // make game harder by reducing time bonus (min 1)
      currentBonus = Math.max(1, currentBonus - 1);
    }

    // add time based on current bonus (which decreases with level)
    time += currentBonus;

    updateTime();
  }
});

//settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value.toLowerCase();
  localStorage.setItem("difficulty", difficulty);
  // reset current bonus according to chosen difficulty
  currentBonus = baseTimeBonusMap[difficulty] || 4;
});
