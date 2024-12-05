const players = [];
const playersList = document.querySelector(".players-list");

window.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("players")) {
		players.push(...JSON.parse(localStorage.getItem("players")));
		renderPlayers();
	}
});

function renderPlayers() {
	playersList.innerHTML = "";
	players.forEach((player) => {
		const li = document.createElement("li");
		const removeButton = document.createElement("button");
		removeButton.classList.add("button-remove");
		li.textContent = player;
		removeButton.innerHTML = '<i class="bx bx-x"></i>';
		removeButton.addEventListener("click", () => {
			removePlayer(player);
		});
		li.appendChild(removeButton);
		playersList.appendChild(li);
	});
}

playersList.textContent = "No players added yet.";
