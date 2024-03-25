
const questions = [
    {
        question: "Q: Which movie holds the record for the most Academy Awards won?",
        answers: [
            { text:  "Titanic (1997", correct: false },
            { text: "Gone with the Wind (1939)", correct: false },
            { text: "The Lord of the Rings: The Return of the King", correct: false },
            { text: "Ben-Hur", correct: true },
        ]
    },
   
    {
        question: "Q: What was the first-ever animated film to win the Academy Award for Best Picture?",
        answers: [
            { text: "The Lion King", correct: false },
            { text: "Toy Story", correct: false },
            { text: "Beauty and the Beast", correct: true },
            { text: "Frozen", correct: false },
        ]
    },
    {
        question: "Q: Which film won the Oscar for Best Picture in 2021?",
        answers: [
            { text: "Mank", correct: false },
            { text: "The Trial of the Chicago 7", correct: false },
            { text: "Promising Young Woman", correct: false },
            { text: "Nomadland", correct: true },
        ]
    },
    {
        question: "Q: Who won the Oscar for Best Actor in a Leading Role for the film The Revenant (2015)?",
        answers: [
            { text: "Brad Pitt", correct: false },
            { text: "Tom Hanks", correct: false },
            { text: "Leonardo DiCaprio", correct: true },
            { text: "Matt Damon", correct: false },
        ]
    },

    {
        question: "Q: Which film won the Big Five Oscars (Best Picture, Best Director, Best Actor, Best Actress, and Best Screenplay)?",
        answers: [
            { text: "It Happened One Night", correct: true },
            { text: "Gladiator", correct: false },
            { text: "Forrest Gump", correct: false },
            { text: "The Silence of the Lambs", correct: false },
        ]
    },
    {
        question: "Q: Which movie won the Oscar for Best Animated Feature in 2020?",
        answers: [
            { text: "Onward", correct: false },
            { text: "Trolls World Tour", correct: false },
            { text: "Wolfwalkers", correct: false },
            { text: "Soul", correct: true },
        ]
    },
    {
        question: "Q: Who won the Oscar for Best Actress in a Supporting Role for the film 12 Years a Slave (2013)?",
        answers: [
            { text: "Julia Roberts", correct: false },
            { text: "Sandra Bullock", correct: false },
            { text: "Cate Blanchett", correct: false },
            { text: "Lupita Nyong'o", correct: true },
        ]
    },
    {
        question: "Q: Which movie won the Oscar for Best Original Screenplay in 2019?",
        answers: [
            { text: "Green Book", correct: true },
            { text: "The Shape of Water2", correct: false },
            { text: "Three Billboards Outside Ebbing, Missouri", correct: false },
            { text: "Dunkirk", correct: false },
        ]
    },
    {
        question: "Q: Who won the Oscar for Best Director for the movie La La Land (2016)?",
        answers: [
            { text: "Christopher Nolan", correct: false },
            { text: "Quentin Tarantino", correct: false },
            { text: "Martin Scorsese", correct: false },
            { text: "Damien Chazelle", correct: true },
        ]
    },
    {
        question: "Q: Which movie won the Oscar for Best Original Song in 1994?",
        answers: [
            { text: "My Heart Will Go On", correct: false },
            { text: "Can You Feel the Love Tonight", correct: false },
            { text: "Streets of Philadelphia", correct: true },
            { text: "Streets of Philadelphia", correct: false },
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.querySelector('.next-btn');
const startButton = document.querySelector('.start-btn');
const popup = document.querySelector('.popup');
const exitButton = document.querySelector('.exit-btn');
const timerElement = document.getElementById('timer');
const TIME_LIMIT = 60; // 60 seconds

let timeRemaining = TIME_LIMIT;
let timerInterval = null;
let quizStartTime = null;
let currentQuestionIndex = 0;
let score = 0;

startButton.onclick = () => {
    popup.classList.add('active');
    startQuiz();
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

exitButton.onclick = () => {
    popup.classList.remove('active');
    resetState();
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    showQuestion();
    startTimer();
    quizStartTime = Date.now(); // Record the quiz start time
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeRemaining--;
    timerElement.textContent = timeRemaining;

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        showResult();
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => {
            handleAnswerClick(answer.correct);
        });
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button  =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function handleAnswerClick(isCorrect) {
    if (timeRemaining > 0) {
        if (isCorrect) {
            score++;
        }
        nextButton.style.display = "block";
    }
}

function showResult() {
    clearInterval(timerInterval);
    const quizEndTime = Date.now();
    const quizTimeInSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
    const quizTimeInMinutes = Math.floor(quizTimeInSeconds / 60);
    const completedTime = quizTimeInSeconds < 60 ? `${quizTimeInSeconds} seconds` : `${quizTimeInMinutes} minutes`;

    const scorePercentage = (score / questions.length) * 100;
    let resultColorClass = "red-text";

    if (scorePercentage >= 70) {
        resultColorClass = "green-text";
    } else if (scorePercentage >= 40) {
        resultColorClass = "yellow-text";
    }

    questionElement.innerHTML = `You have completed the quiz! Your score: <span class="${resultColorClass}">${score}</span> out of ${questions.length}. Completed Time: ${completedTime}.`;
    resetState();
}
