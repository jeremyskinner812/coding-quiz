function renderHighScores() {
    var highScores = JSON.parse(window.localStorage.getItem('highScores')) || [];
    highScores.sort(function (a,b) {
        return b.score - a.score;
    });
    for (var i = 0; i < highScores.length; i++) {
        var liScore = document.createElement("li");
        liScore.textContent = highScores[i].initials + " : " + highScores[i].score;
        document.getElementById("high-scores").appendChild(liScore);
    }
    

}

renderHighScores();