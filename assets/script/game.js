const gamemodeButtons = document.querySelectorAll(".gamemode");
const gamemodeRules = document.querySelectorAll(".modes-rules > div");
let selectedMode = "speedrun";

gamemodeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const selected = document.querySelector(".active");
		selected.classList.remove("active");
		button.classList.add("active");

		const mode = button.dataset.mode;
		selectedMode = mode;
		localStorage.setItem("selectedMode", selectedMode);
		gamemodeRules.forEach((rule) => {
			rule.classList.remove("active");

			if (rule.dataset.mode === mode) {
				rule.classList.add("active");
			}
		});
	});
});

window.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("selectedMode")) {
		gamemodeButtons.forEach((button) => {
			button.classList.remove("active");
		});
		selectedMode = localStorage.getItem("selectedMode");
		const selected = document.querySelector(`[data-mode="${selectedMode}"]`);
		selected.classList.add("active");
		gamemodeRules.forEach((rule) => {
			rule.classList.remove("active");

			if (rule.dataset.mode === selectedMode) {
				rule.classList.add("active");
			}
		});
	}
});

// redirect to the register page if no players are added
const players = JSON.parse(localStorage.getItem("players") || "[]");
console.log(players.length);
if (players.length === 0) {
	window.location.href = "/register";
}
