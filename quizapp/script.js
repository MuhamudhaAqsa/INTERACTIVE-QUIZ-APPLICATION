// Run the quiz logic only after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to DOM elements
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const scoreElement = document.getElementById("score");
    
    let currentQuestionIndex = 0; // Track the current question
    let score = 0; // Track the user's score

    // Array of quiz questions, each with options and the correct answer
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

    // Load the current question and its options
    function loadQuestion() {
        resetState(); // Clear previous options and hide Next button
        let currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        // Create buttons for each option
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");

            // Add event listener to handle answer selection
            button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    }

    // Reset the options container and hide the Next button
    function resetState() {
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
    }

    // Handle answer selection and show correct/wrong answers
    function selectAnswer(button, correctAnswer) {
        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
            score++; // Increase score for correct answer
        } else {
            button.classList.add("wrong");
        }

        // Disable all option buttons and show the correct answer
        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });

        // Show Next button after an answer is selected
        nextButton.style.display = "block";
    }

    // Move to the next question or show final score
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion(); // Load the next question
        } else {
            // Display final score
            quizContainer.innerHTML = `<h2>Your Score: ${score} / ${quizData.length}</h2>`;
        }
    });

    // Load the first question when the quiz starts
    loadQuestion();
});
