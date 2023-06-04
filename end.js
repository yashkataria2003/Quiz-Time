const userName = document.getElementById("userName");
const saveButton = document.getElementById("saveButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const score = document.getElementById("score");
score.innerText = mostRecentScore;

const highScore = JSON.parse(localStorage.getItem("highscores")) || [];
const MAX_HIGH_SCORE = 5;

userName.addEventListener('keyup', () => {
    // console.log(userName.value);
    saveButton.disabled = !userName.value;
})

saveHighScore = e => {
    // console.log("Clicked Save Button");
    e.preventDefault();

    const innerScore = {score: mostRecentScore, name: userName.value};
    highScore.push(innerScore);
    highScore.sort((a,b) => b.score - a.score);  // This functon will sort elemenets and return b if b is greater than a
    highScore.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScore));
    window.location.assign("index.html");
    
}
