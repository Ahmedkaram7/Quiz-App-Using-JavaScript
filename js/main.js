const questions = [
  {
    question: "Which of the following is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: "false" },
      { text: "let", correct: "false" },
      { text: "const", correct: "false" },
      { text: "All of the above", correct: "true" },
    ],
  },
  {
    question: "What is the correct syntax for a function in JavaScript?",
    answers: [
      { text: "function: myFunction() {}", correct: "false" },
      { text: "function myFunction() {}", correct: "true" },
      { text: "myFunction() function {}", correct: "false" },
      { text: "def myFunction() {}", correct: "false" },
    ],
  },
  {
    question: "Which method is used to convert a JSON object into a string in JavaScript?",
    answers: [
      { text: "JSON.parse()", correct: "false" },
      { text: "JSON.stringify()", correct: "true" },
      { text: "JSON.objectify()", correct: "false" },
      { text: "JSON.convert()", correct: "false" },
    ],
  },
  {
    question: "How can you add a comment in JavaScript?",
    answers: [
      // { text: "<!-- This is a comment -->", correct: "false" },
      { text: "// This is a comment", correct: "false" },
      { text: "/* This is a comment */", correct: "false" },
      { text: "Both A) and B)", correct: "true" },
    ],
  },
  {
    question: "What is the output of the following code?",
    answers: [
      { text: "4", correct: "false" },
      { text: "22", correct: "true" },
      { text: "undefined", correct: "false" },
      { text: "NaN", correct: "false" },
    ],
  },
];

const questionElemente = document.getElementById("question");
const answerElementes = document.querySelector(".answer");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  restState();
  let currerntQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElemente.innerHTML = questionNo + ". " + currerntQuestion.question;

  currerntQuestion.answers.forEach((answer) => {
    let p = document.createElement("p");
    p.innerHTML = answer.text;
    p.classList.add("ansr");
    answerElementes.appendChild(p);
    if (answer.correct) {
      p.dataset.correct = answer.correct;
    }
    p.addEventListener("click", selectAnswer);
  });
}

function restState() {
  nextButton.style.display = "none";
  while (answerElementes.firstChild) {
    answerElementes.removeChild(answerElementes.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerElementes.children).forEach((ansr) => {
    if (ansr.dataset.correct === "true") {
      ansr.classList.add("correct");
    }
    ansr.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  restState();
  questionElemente.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});


startQuiz();
