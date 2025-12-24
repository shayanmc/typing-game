const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endgameEl = document.querySelector("#end-game-container");
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const settingsForm = document.querySelector("#settings-form");
const difficultySelect = document.querySelector("#difficulty");

// List of words for game (expanded)
const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elder",
  "fig",
  "grape",
  "honey",
  "ice",
  "juice",
  "kangaroo",
  "lemon",
  "mango",
  "nectar",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "umbrella",
  "violet",
  "water",
  "xylophone",
  "yacht",
  "zebra",
  "quick",
  "brown",
  "fox",
  "jumps",
  "lazy",
  "dog",
  "sun",
  "moon",
  "star",
  "cloud",
  "rain",
  "snow",
  "wind",
  "storm",
  "mountain",
  "river",
  "ocean",
  "forest",
  "island",
  "desert",
  "valley",
  "plain",
  "meadow",
  "garden",
  "flower",
  "petal",
  "root",
  "branch",
  "leaf",
  "breeze",
  "ember",
  "flame",
  "spark",
  "cinder",
  "ash",
  "coal",
  "smoke",
  "lava",
  "crystal",
  "gem",
  "pearl",
  "gold",
  "silver",
  "bronze",
  "iron",
  "steel",
  "copper",
  "nickel",
  "lead",
  "metal",
  "plastic",
  "paper",
  "canvas",
  "paint",
  "brush",
  "pencil",
  "pen",
  "marker",
  "chalk",
  "chalkboard",
  "book",
  "page",
  "chapter",
  "story",
  "novel",
  "poem",
  "verse",
  "line",
  "sentence",
  "word",
  "letter",
  "alphabet",
  "grammar",
  "syntax",
  "logic",
  "reason",
  "idea",
  "thought",
  "dream",
  "sleep",
  "awake",
  "alert",
  "calm",
  "focus",
  "quiet",
  "loud",
  "music",
  "melody",
  "rhythm",
  "beat",
  "drum",
  "guitar",
  "piano",
  "violin",
  "trumpet",
  "saxophone",
  "sing",
  "dance",
  "move",
  "run",
  "walk",
  "jump",
  "climb",
  "swim",
  "dive",
  "fly",
  "soar",
  "glide",
  "hover",
  "drive",
  "ride",
  "sail",
  "engine",
  "motor",
  "wheel",
  "tire",
  "brake",
  "steer",
  "gear",
  "speed",
  "slow",
  "fast",
  "rapid",
  "swift",
  "steady",
  "stable",
  "fragile",
  "solid",
  "liquid",
  "gas",
  "plasma",
  "quantum",
  "particle",
  "atom",
  "molecule",
  "cell",
  "organ",
  "system",
  "brain",
  "heart",
  "pulse",
  "blood",
  "breath",
  "voice",
  "whisper",
  "shout",
  "laugh",
  "smile",
  "frown",
  "tear",
  "joy",
  "sorrow",
  "anger",
  "fear",
  "bravery",
  "courage",
  "honor",
  "valor",
  "wisdom",
  "knowledge",
  "skill",
  "talent",
  "art",
  "craft",
  "trade",
  "skillful",
  "clever",
  "bright",
  "sharp",
  "dull",
  "soft",
  "hard",
  "rough",
  "smooth",
  "sticky",
  "slippery",
  "cold",
  "hot",
  "warm",
  "chilly",
  "frost",
  "freeze",
  "melt",
  "boil",
  "simmer",
  "cook",
  "bake",
  "roast",
  "grill",
  "serve",
  "eat",
  "drink",
  "taste",
  "smell",
  "touch",
  "feel",
  "hear",
  "see",
  "watch",
  "look",
  "glance",
  "stare",
  "gaze",
  "peer",
  "scan",
  "search",
  "find",
  "seek",
  "discover",
  "explore",
  "travel",
  "journey",
  "venture",
  "quest",
  "mission",
  "pursuit",
  "goal",
  "aim",
  "target",
  "plan",
  "scheme",
  "plot",
  "strategy",
  "tactic",
  "method",
  "approach",
  "process",
  "systematic",
  "random",
  "chaos",
  "order",
  "pattern",
  "signal",
  "noise",
  "echo",
  "silence",
  "shadow",
  "light",
  "bright",
  "dim",
  "glow",
  "shine",
  "sparkle",
  "mirror",
  "window",
  "door",
  "gate",
  "bridge",
  "path",
  "trail",
  "road",
  "street",
  "avenue",
  "lane",
  "alley",
  "corner",
  "square",
  "plaza",
  "market",
  "store",
  "shop",
  "mall",
  "bazaar",
  "vendor",
  "merchant",
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
