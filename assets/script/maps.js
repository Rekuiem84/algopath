const levels = document.querySelectorAll(".map");
let currentLevel = "";

levels.forEach((level) => {
	level.addEventListener("click", (e) => {
		let currentLevelImg = level.querySelector("img").src;
		// e.preventDefault();
		currentLevel = level.dataset.level;
		localStorage.setItem("currentLevel", currentLevel);
		localStorage.setItem("currentMap", currentLevelImg);
	});
});
