var questions = [
    {
        question: "Which built-in method returns the length of the string?",
        choices: ["length()", "size()", "index()", "None of the Above"],
        answer: "length()",
    },
    {
        question: "Which of the following function of Array object reverses the order of the elements of an array?",
        choices: ["reverse()", "push()", "unshift()", "reduce()"],
        answer: "reverse()",
    },
    {
        question: "Which built-in method sorts the elements of an array?",
        choices: ["sort()", "order()", "changeOrder()", "None of the Above"],
        answer: "sort()",
    },
    {
        question: "JavaScript is a ___ -side programming language.",
        choices: ["client", "server", "both", "neither"],
        answer: "both",
    },
    {
        question: "JavaScript File Has An Extension of:",
        choices: [".javascript", ".java", ".js", ".script"],
        answer: ".js"
    },
];
var timerInterval;
var time = 60;
var questionIndex = 0;

var answers = document.querySelector("#answers")
var questionWrapper = document.getElementById("question");
var timerEl = document.getElementById("timeleft");

function startQuiz() {
    var firstScreenEL = document.getElementById('first-screen');
    firstScreenEL.style.display = "none";
    questionWrapper.removeAttribute("class");
    timerInterval = setInterval(startTimer, 1000);
    renderQuestions();


};

function renderQuestions() {
    var currentQuestion = questions[questionIndex];
    var questionTitle = document.querySelector("#question-title");
    questionTitle.textContent = currentQuestion.question;
    answers.innerHTML = "";
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var questionChoice = currentQuestion.choices[i];
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("value", questionChoice);
        choiceButton.textContent = questionChoice;
        document.querySelector("#answers").appendChild(choiceButton);
    };

};

function answerQuestion(event) {
    var buttonClick = event.target;
    if (buttonClick.value !== questions[questionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        window.alert("Incorrect :(");
        

    } else {
        window.alert("Correct!");
    }

    questionIndex++;

    if(time <= 0 || questionIndex === questions.length) {
        finishQuiz();
    } else {
        renderQuestions();
    }

};

function finishQuiz() {
    clearInterval(timerInterval);
    var resultsScreen = document.querySelector("#results");
    resultsScreen.removeAttribute("class");
    var finalScore = document.querySelector("#final-score");
    finalScore.textContent = time;
    questionWrapper.setAttribute("class", "hidden");
};

function saveScore(){
    var initials = document.querySelector("#initials").value;
    var highScores = JSON.parse(window.localStorage.getItem('highScores')) || [];
    var currentScore = {
        score: time,
        initials: initials,
    }
    highScores.push(currentScore);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.href = "highscores.html";
    

}

function startTimer() {
      time--;
      timerEl.textContent = time;
  
      if (time <= 0) {
        finishQuiz;
    
      }
}



document.querySelector("#start-button").addEventListener("click", startQuiz);
answers.addEventListener("click", answerQuestion);
document.querySelector("#submit-score").addEventListener("click", saveScore);




