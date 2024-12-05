const players = localStorage.getItem("players")
	? JSON.parse(localStorage.getItem("players"))
	: [];

let currentPlayer = 0;

const playerPlaceholders = document.querySelectorAll(".currentPlayer");
const nextPlayerPlaceholder = document.querySelector(".nextPlayer");
// console.log(nextPlayerPlaceholder);

function renderCurrentPlayer() {
	playerPlaceholders.forEach((playerPlaceholder) => {
		playerPlaceholder.textContent = players[currentPlayer];
	});
}

function getNextPlayer() {
	let nextPlayer = currentPlayer + 1;
	if (nextPlayer >= players.length) {
		nextPlayer = 0;
	}
	return players[nextPlayer];
}
function renderNextPlayer() {
	nextPlayerPlaceholder.textContent = getNextPlayer();
}

function nextPlayer() {
	currentPlayer++;
	if (currentPlayer >= players.length) {
		currentPlayer = 0;
		getNextPlayer();
	}
	renderPlayers();
}

function renderPlayers() {
	renderCurrentPlayer();
	renderNextPlayer();
}
window.addEventListener("DOMContentLoaded", () => {
	renderPlayers();
});

let currentDifficulty = "none";
const difficultyButtons = document.querySelectorAll(".difficulty");
const interface = document.querySelector(".interface");

difficultyButtons.forEach((button) => {
	button.addEventListener("click", () => {
		if (currentDifficulty !== "none") {
			return;
		}
		difficultyButtons.forEach((button) => {
			button.classList.remove("active");
		});
		button.classList.add("active");

		const difficulty = button.dataset.difficulty;
		currentDifficulty = difficulty;
		interface.classList.add("active");
		console.log(currentDifficulty);
		renderQuestion();
	});
});

async function fetchQuestions() {
	const response = await fetch("/assets/questions.json");
	const data = await response.json();
	return data;
}

const questionPlaceholder = document.querySelector(".question");
const propositionsCont = document.querySelector(".propositions");
const answersPlaceholder = document.querySelectorAll(".answer");
const correctAnswerPlaceholder = document.querySelector(".good-answer");

function renderQuestion() {
	fetchQuestions().then((questions) => {
		let diffQuestions = [];
		if (currentDifficulty === "easy") {
			diffQuestions.push(questions.easyQuestions);
			propositionsCont.style.display = "block";
		} else {
			diffQuestions.push(questions.hardQuestions);
			propositionsCont.style.display = "none";
		}

		// // fetch a question based on the current difficulty
		const randomIndex = Math.floor(Math.random() * diffQuestions[0].length);
		const question = diffQuestions[0][randomIndex];
		questionPlaceholder.textContent = question.question;
		if (currentDifficulty === "easy") {
			answersPlaceholder.forEach((answer, index) => {
				answer.textContent += question.answers[index];
			});
		}
		correctAnswerPlaceholder.textContent = question.correctAnswer;
	});
}

const showAnswerButton = document.querySelector(".see-answer");

showAnswerButton.addEventListener("click", () => {
	correctAnswerPlaceholder.classList.add("show");
});

const nextQuestion = document.querySelector(".next-question");
nextQuestion.addEventListener("click", () => {
	reset();
	nextPlayer();
});

function reset() {
	propositionsCont.style.display = "none";
	currentDifficulty = "none";
	correctAnswerPlaceholder.classList.remove("show");
	difficultyButtons.forEach((button) => {
		button.classList.remove("active");
	});
	answersPlaceholder.forEach((answer) => {
		answer.textContent = "";
	});
	interface.classList.remove("active");
	renderQuestion();
}
