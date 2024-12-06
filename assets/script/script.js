const registerDoc = document.querySelector(".register");
const nameInput = registerDoc.querySelector("#name");
const form = registerDoc.querySelector("form");
const playersList = document.querySelector(".players-list");
const playLink = document.querySelector("[data-link='play']");

const players = [];

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const name = nameInput.value;
	if (name.trim() && players.length < 4) {
		players.push(name);
		localStorage.setItem("players", JSON.stringify(players));
		renderPlayers();
		nameInput.value = "";
		console.log(JSON.parse(localStorage.getItem("players")));

		if (players.length > 0) {
			playLink.setAttribute("href", "/play");
		}
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

function removePlayer(player) {
	const index = players.indexOf(player);
	if (index > -1) {
		players.splice(index, 1);
		localStorage.setItem("players", JSON.stringify(players));
		renderPlayers();
	}
}

window.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("players")) {
		players.push(...JSON.parse(localStorage.getItem("players")));
		renderPlayers();
	}
	if (players.length > 0) {
		playLink.setAttribute("href", "/play");
	}
});
