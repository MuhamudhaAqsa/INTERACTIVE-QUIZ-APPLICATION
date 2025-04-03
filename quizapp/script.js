document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const scoreElement = document.getElementById("score");
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        },
        {
            question: "What is 5 + 3?",
            options: ["5", "8", "12", "15"],
            answer: "8"
        }
    ];
    
    function loadQuestion() {
        resetState();
        let currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    }
    
    function resetState() {
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
    }
    
    function selectAnswer(button, correctAnswer) {
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
            score++;
        } else {
            button.classList.add("wrong");
        }
        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
        nextButton.style.display = "block";
    }
    
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            quizContainer.innerHTML = `<h2>Your Score: ${score} / ${quizData.length}</h2>`;
        }
    });
    
    loadQuestion();
});