// Word selection
// New word = ["Word name", "Hint"]
let word = [
  ["Hangman", "That game you are playing right now."],
  ["Mrigank", "My Instructor"],
  ["Shubham", "My Mentor"][("Amazon", "My Dream Company")],
  ["CSS", "Wep page styles"],
  [
    "Python",
    "Jack of all trades, master of none programming scripting language."
  ],
  ["JavaScript", "Make web-page dynamic without reload the web page."],
  ["Java", "Most funny yet important programming language for coding"],
  ["Newton School", "Our ray of sunshine\nName of this institute"],
  ["Document", "A lot of text in the a file."],
  ["Playground", "There school kids go to."],
  ["Run", "Usain bolt."],
  ["Code", "first line = 'Hello World';"],
  [
    "Samsung",
    "A company create Phone, Tv, Monitor, Exynos Chips, Memory chip..."
  ],
  ["Super Mario", "A very popular game in Nintendo and now in Smart Phones."],
  ["Star", "Super Mario like to get."],
  ["Clock", "14:12 or 02 pm"],
  ["Binary Clock", "A clock that only use 0 or 1."],
  ["Needle", "Name of Arya Stark's sword"],
  ["Girl", "Not boy but ?"],
  ["Boy", "Not girl but ?"],
  ["Female", "Other name as girl."],
  ["Male", "Other name as boy."],
  ["Smartphone", "Something you've always on you."]
];

// Game keyboard
let tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Game memory
let select = 0;
let wordLeft = [];
let fail = 0;

// Web-page onload
window.onload = function () {
  document.getElementById("moveKeybord").addEventListener(
    "touchmove",
    function (e) {
      let wH = window.innerHeight;
      let tY = e.touches[0].clientY;
      let eL = document.getElementById("tastatur");
      let resY = wH - tY - eL.offsetHeight;
      if (resY < 0) {
        resY = 0;
      } else if (resY > wH / 2) {
        resY = wH / 2;
      }
      eL.style.bottom = resY + "px";
    },
    false
  );
  createTastur();
};

// Start game
function startGame() {
  let headTab = document.getElementById("start");
  let game = document.getElementById("game-container");
  headTab.classList.add("hide");
  game.classList.remove("hide");
  newGame();
}

const resetGame = () => {
  document.location.reload();
  clearInterval(interval); // Needed for Chrome to end game
};

// New game
function newGame() {
  clearTastatur();
  clearPlayer();
  createWord();
}

// Clear keyboard
function clearTastatur() {
  let e = document.getElementsByClassName("b");
  for (let a = 0; a < e.length; a++) {
    e[a].setAttribute("data", "");
  }
}

// Clear player
function clearPlayer() {
  fail = 0;
  wordLeft = [];
  document.getElementById("g0").setAttribute("data", "false");
  document.getElementById("g1").setAttribute("data", "false");
  document.getElementById("g2").setAttribute("data", "false");
  document.getElementById("g3").setAttribute("data", "false");
  document.getElementById("g4").setAttribute("data", "false");
  document.getElementById("g5").setAttribute("data", "false");
  document.getElementById("g6").setAttribute("data", "false");
  document.getElementById("hintButton").setAttribute("data", "false");
  document.getElementById("hint").style.display = "none";
}

// Get new word
function createWord() {
  let d = document.getElementById("letter");
  d.innerHTML = "";
  select = Math.floor(Math.random() * word.length);
  for (let a = 0; a < word[select][0].length; a++) {
    let x = word[select][0][a].toUpperCase();
    let b = document.createElement("span");
    b.className = "l" + (x === " " ? " ls" : "");
    b.innerHTML = "&nbsp";
    b.id = "l" + a;
    d.appendChild(b);

    if (x !== " ") {
      if (wordLeft.indexOf(x) === -1) {
        wordLeft.push(x);
      }
    }
  }
}

// Create keyboard
function createTastur() {
  let tas = document.getElementById("keybord");
  tas.innerHTML = "";
  for (let a = 0; a < tastatur.length; a++) {
    let b = document.createElement("span");
    b.className = "b";
    b.innerText = tastatur[a];
    b.setAttribute("data", "");
    b.onclick = function () {
      bTas(this);
    };
    tas.appendChild(b);
  }
}

// Game check, If show next error / game end
function bTas(a) {
  if (a.getAttribute("data") === "") {
    let x = isExist(a.innerText);
    a.setAttribute("data", x);
    if (x) {
      if (wordLeft.length === 0) {
        gameEnd(true);
      }
    } else {
      showNextFail();
    }
  }
}

// If letter "X" exist
function isExist(e) {
  e = e.toUpperCase();
  let x = wordLeft.indexOf(e);
  if (x !== -1) {
    wordLeft.splice(x, 1);
    typeWord(e);
    return true;
  }
  return false;
}

// Show next fail drawing
function showNextFail() {
  fail++;
  switch (fail) {
    case 1:
      document.getElementById("g0").setAttribute("data", "true");
      break;

    case 2:
      document.getElementById("g1").setAttribute("data", "true");
      break;

    case 3:
      document.getElementById("g2").setAttribute("data", "true");
      break;

    case 4:
      document.getElementById("g3").setAttribute("data", "true");
      document.getElementById("hintButton").setAttribute("data", "true");
      break;

    case 5:
      document.getElementById("g4").setAttribute("data", "true");
      break;

    case 6:
      document.getElementById("g5").setAttribute("data", "true");
      break;

    case 7:
      document.getElementById("g6").setAttribute("data", "true");
      gameEnd(false);
  }
}

function typeWord(e) {
  for (let a = 0; a < word[select][0].length; a++) {
    if (word[select][0][a].toUpperCase() === e) {
      document.getElementById("l" + a).innerText = e;
    }
  }
}

// Game result
function gameEnd(e) {
  let d = document.getElementById("result");
  d.setAttribute("data", e);
  if (e) {
    document.getElementById("rT").innerText = "You Win!";
    document.getElementById("rM").innerHTML =
      "Congratulations, you found the word!<br/><br/>Good Job!";
  } else {
    document.getElementById("rT").innerText = "You Lose!";
    document.getElementById("rM").innerHTML =
      'The word was <br/><br/>"' +
      word[select][0].toUpperCase() +
      '"<br/><br/>Better luck next time.';
  }
  d.className = "";
}

// Show hint
function hint() {
  document.getElementById("hintText").innerText = word[select][1];
  document.getElementById("hint").style.display = "block";
}

// Exit hint
function hintExit() {
  document.getElementById("hint").style.display = "none";
}
