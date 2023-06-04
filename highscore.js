let highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreList.innerHTML = highScores.map(innerScore => {
    return (`<li class="highScoreItems">${innerScore.name} - ${innerScore.score}</li>`);
}).join("");