const levelElement = document.querySelector("h1");
const level = localStorage.getItem("currentLevel");
const levelImgElement = document.querySelector(".map img");
const levelImg = localStorage.getItem("currentMap");

levelElement.textContent = "Level : " + level;
levelImgElement.src = levelImg;
