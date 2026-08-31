// ===============================
// QUIZ QUESTIONS
// ===============================

const questions = [

    {
        question: "What does HTML stand for?",

        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Machine Language",
            "Home Tool Markup Language"
        ],

        answer: 0
    },


    {
        question: "Which language is used to style a webpage?",

        options: [
            "HTML",
            "CSS",
            "Python",
            "Java"
        ],

        answer: 1
    },


    {
        question: "Which language is used to make webpages interactive?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: 2
    },


    {
        question: "Which symbol is used for an ID selector in CSS?",

        options: [
            ".",
            "#",
            "*",
            "@"
        ],

        answer: 1
    },


    {
        question: "Which keyword is used to declare a variable in JavaScript?",

        options: [
            "var",
            "int",
            "string",
            "define"
        ],

        answer: 0
    },


    {
        question: "Which database language is used to manage relational databases?",

        options: [
            "HTML",
            "CSS",
            "SQL",
            "JavaScript"
        ],

        answer: 2
    },


    {
        question: "Which company developed the Java programming language?",

        options: [
            "Microsoft",
            "Sun Microsystems",
            "Google",
            "Apple"
        ],

        answer: 1
    },


    {
        question: "What does CPU stand for?",

        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],

        answer: 0
    },


    {
        question: "Which of these is a programming language?",

        options: [
            "HTML",
            "CSS",
            "Python",
            "HTTP"
        ],

        answer: 2
    },


    {
        question: "Which technology is mainly used to create the structure of a webpage?",

        options: [
            "CSS",
            "HTML",
            "SQL",
            "Python"
        ],

        answer: 1
    }

];


// ===============================
// HTML ELEMENTS
// ===============================

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");


const username =
    document.getElementById("username");

const startBtn =
    document.getElementById("start-btn");

const nextBtn =
    document.getElementById("next-btn");

const restartBtn =
    document.getElementById("restart-btn");


const welcome =
    document.getElementById("welcome");

const timerElement =
    document.getElementById("timer");

const questionNumber =
    document.getElementById("question-number");

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");


const progressBar =
    document.getElementById("progress-bar");


const scoreElement =
    document.getElementById("score");

const percentageElement =
    document.getElementById("percentage");

const resultMessage =
    document.getElementById("result-message");


// ===============================
// QUIZ VARIABLES
// ===============================

let currentQuestion = 0;

let score = 0;

let timeLeft = 15;

let timer;

let userName = "";


// ===============================
// START QUIZ
// ===============================

startBtn.addEventListener("click", startQuiz);


function startQuiz() {

    userName = username.value.trim();


    // Check username

    if (userName === "") {

        alert("Please enter your name!");

        return;

    }


    currentQuestion = 0;

    score = 0;


    startScreen.classList.add("hide");

    resultScreen.classList.add("hide");

    quizScreen.classList.remove("hide");


    welcome.textContent =
        "Hello, " + userName;


    showQuestion();

}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    clearInterval(timer);


    timeLeft = 15;

    timerElement.textContent =
        "Time: " + timeLeft;


    const current =
        questions[currentQuestion];


    // Question

    questionElement.textContent =
        current.question;


    // Question number

    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    // Progress bar

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;


    progressBar.style.width =
        progress + "%";


    // Remove old options

    optionsElement.innerHTML = "";


    // Create new options

    current.options.forEach(
        function(option, index) {

            const button =
                document.createElement("button");


            button.textContent =
                option;


            button.classList.add("option");


            button.addEventListener(
                "click",
                function() {

                    selectAnswer(index);

                }
            );


            optionsElement.appendChild(button);

        }
    );


    startTimer();

}


// ===============================
// TIMER
// ===============================

function startTimer() {

    timer =
        setInterval(function() {

            timeLeft--;


            timerElement.textContent =
                "Time: " + timeLeft;


            if (timeLeft <= 0) {

                clearInterval(timer);

                disableOptions();

                setTimeout(
                    nextQuestion,
                    500
                );

            }

        }, 1000);

}


// ===============================
// SELECT ANSWER
// ===============================

function selectAnswer(selectedAnswer) {

    clearInterval(timer);


    const correctAnswer =
        questions[currentQuestion].answer;


    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(
        function(button, index) {

            button.disabled = true;


            // Show correct answer

            if (index === correctAnswer) {

                button.classList.add("correct");

            }

        }
    );


    // Check selected answer

    if (selectedAnswer === correctAnswer) {

        score++;

    } else {

        buttons[selectedAnswer]
            .classList.add("wrong");

    }

}


// ===============================
// DISABLE OPTIONS
// ===============================

function disableOptions() {

    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(
        function(button) {

            button.disabled = true;

        }
    );

}


// ===============================
// NEXT QUESTION
// ===============================

nextBtn.addEventListener(
    "click",
    nextQuestion
);


function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    } else {

        showResult();

    }

}


// ===============================
// SHOW RESULT
// ===============================

function showResult() {

    clearInterval(timer);


    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");


    const percentage =
        (score / questions.length) * 100;


    scoreElement.textContent =
        "Score: " +
        score +
        " / " +
        questions.length;


    percentageElement.textContent =
        "Percentage: " +
        percentage +
        "%";


    if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent! 🎉";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "Good Job! 👍";

    } else {

        resultMessage.textContent =
            "Keep Practicing! 💪";

    }

}


// ===============================
// RESTART QUIZ
// ===============================

restartBtn.addEventListener(
    "click",
    function() {

        username.value = "";

        resultScreen.classList.add("hide");

        startScreen.classList.remove("hide");

    }
);