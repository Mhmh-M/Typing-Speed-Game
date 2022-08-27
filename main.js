// Array Of Word 
const words = [
  "Hello",
  "Code",
  "Programmgin",
  "JavaScript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencaies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "Bootstrab",
  "Good Game",
]

const lvls = {
  "Easy": 6,
  "Normal": 4,
  "Hard": 2,
}

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scorTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let lvlPlay = document.querySelector(".playing-lvl");
let lvlSpan = document.querySelectorAll(".playing-lvl span");
var keys = Object.keys(lvls);


for (let i = 0; i < 3; i++) {
  lvlSpan[i].innerHTML = keys[i];

}
lvlSpan.forEach(e => {
  e.addEventListener("click", (e) => {
    lvlSpan.forEach((el) => {
      el.classList.remove("active")
    })
    e.target.classList.add("active")

    defaultLevelName = e.target.textContent;
    defaultLevelSeconds = lvls[defaultLevelName];

    setPropertyInnerHTML();

  })
});

setPropertyInnerHTML();
scorTotal.innerHTML = words.length;

function setPropertyInnerHTML() {
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
}
input.onpaste = function () {
  return false;
}

startButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();
  lvlPlay.remove();
}

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = '';

  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div)
  }
  startPlay()
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === '0') {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = '';
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement('span');
          span.className = 'good';
          let spanTxt = document.createTextNode("Congratz");
          span.appendChild(spanTxt);
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement('span');
        span.className = 'bad';
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finishMessage.appendChild(span)
      }
    }
  }, 1000)
}