const colourQuizDisplay = document.getElementById("colourQuizDisplay");
const finalScoreContainer = document.getElementById("finalScoreDisplay");

const colourDisplay = document.getElementById("colour");
const answerButtons = document.querySelectorAll("[data-answer-btn]");
const questionNumberDisplay = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("finalScore");

//Get the number of questions
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const NUMBER_OF_QUESTIONS = urlParams.get("numberOfQuestions");

let correctColour = "";
let possibleColours = [];
let currentQuestionNumber = 1;
let score = 0;
let answerInProgress = false;

function getRandomColour() {
  const redValue = getRandomColourValue();
  const blueValue = getRandomColourValue();
  const greenValue = getRandomColourValue();

  return convertRGBToHex(redValue, greenValue, blueValue);
}

function getRandomColourValue() {
  return Math.floor(Math.random() * 256);
}

function colourToHex(colour) {
  let hexColour = colour.toString(16);
  return hexColour.length < 2 ? "0" + hexColour : hexColour;
}

function convertRGBToHex(red, green, blue) {
  return `#${colourToHex(red)}${colourToHex(green)}${colourToHex(blue)}`;
}

function updateColourDisplay(newColour) {
  colourDisplay.style.backgroundColor = newColour;
}

function updateAnswers() {
  answerButtons.forEach((answerBtn, index) => {
    answerBtn.innerText = possibleColours[index];
  });
}

function getNewQuestion() {
  questionNumberDisplay.innerText = currentQuestionNumber;
  correctColour = getRandomColour();
  updateColourDisplay(correctColour);
  possibleColours.push(correctColour);
  for (let i = 0; i < 3; i++) {
    possibleColours.push(getRandomColour());
  }
  possibleColours = possibleColours.sort(() => Math.random() - 0.5);
  updateAnswers();
  answerInProgress = false;
}

function resetAnswers() {
  possibleColours = [];
  answerButtons.forEach((answerBtn) => {
    answerBtn.classList.remove("correct");
    answerBtn.classList.remove("incorrect");
  });
}

function showCorrectAnswer() {
  answerButtons.forEach((answer) => {
    if (answer.innerText === correctColour) {
      answer.classList.add("correct");
    }
  });
}

function updateScore() {
  score++;
  scoreDisplay.innerText = score;
}

function endGame() {
  finalScoreContainer.classList.remove("hidden");
  finalScoreDisplay.innerText = score;
  colourQuizDisplay.classList.add("hidden");
}

getNewQuestion();

answerButtons.forEach((answerBtn) => {
  answerBtn.addEventListener("click", (e) => {
    if (!answerInProgress) {
      answerInProgress = true;
      if (e.target.innerText === correctColour) {
        updateScore();
        e.target.classList.add("correct");
      } else {
        e.target.classList.add("incorrect");
        showCorrectAnswer();
      }

      currentQuestionNumber++;
      if (currentQuestionNumber <= NUMBER_OF_QUESTIONS) {
        setTimeout(() => {
          resetAnswers();
          getNewQuestion();
        }, 1000);
      } else {
        setTimeout(() => {
          endGame();
        }, 1000);
      }
    }
  });
});
