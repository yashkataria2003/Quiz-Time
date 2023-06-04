const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("mainChoice"));
const progressText = document.getElementById("progressText");
const questionScoreText = document.getElementById("score");
const progressBarFill = document.getElementById("progressBarFill");

let currentQuestion = {};
let acceptingAnswer = false;
let score  = 0;
let questionCounter = 0;
let availabelQuestions = [];

// Reading questions from jason file
let questions = [];
fetch("questions.json")
    .then(response => {
        return response.json();
    })

    .then(loadQuestions => {
        // console.log(loadQuestions);
        questions = loadQuestions;
        startGame();
    })


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Loading Questions
startGame = () => {
    questionCounter = 0;
    score = 0;
    availabelQuestions = [...questions];
    // console.log(availabelQuestions);
    getQuestion();
} 


// Setting Questions and choices 
getQuestion = () => {
    if(availabelQuestions==0 || questionCounter >= MAX_QUESTIONS)
    {
        // Ending Game
        localStorage.setItem("mostRecentScore",score);
        window.location.assign("end.html");
    }
    questionCounter++;

    progressBarFill.style.width = `${(questionCounter / MAX_QUESTIONS)*100}%`;

    progressText.innerText = `Question : ${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availabelQuestions.length)
    currentQuestion = availabelQuestions[questionIndex];
    // console.log(currentQuestion.answer);
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+[number]]; 
    });

    availabelQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
}


// Checking correctness of Question
choices.forEach(choice => {
    choice.addEventListener('click',e => 
    {
        if(!acceptingAnswer)
        {
            return;
        }

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // let classToApply = "incorrect";
        // if(selectedAnswer === currentQuestion.answer)
        // {
        //     classToApply = "correct";
        // }
        const classToApply = (selectedAnswer == currentQuestion.answer) ? "correct" : "incorrect";
        console.log(classToApply);

        if(classToApply == "correct")
        {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getQuestion();
        }, 1000);

        // console.log(selectedAnswer);
    })
});

incrementScore = num => {
    score += num;
    questionScoreText.innerText = score;
}
