function predictMatch() {

    let teamAScore = parseFloat(document.getElementById("teamAScore").value);
    let runs = parseFloat(document.getElementById("teamBRuns").value);
    let overs = parseFloat(document.getElementById("teamBOvers").value);
    let wickets = parseFloat(document.getElementById("teamBWickets").value);

    if (isNaN(teamAScore) || isNaN(runs) || isNaN(overs) || overs === 0) {
        document.getElementById("result").innerText = "Enter valid values!";
        return;
    }

    let target = teamAScore + 1;
    let currentRunRate = runs / overs;
    let predictedScore = (currentRunRate * 20) - (wickets * 2);

    let remainingOvers = 20 - overs;
    let runsNeeded = target - runs;
    let requiredRunRate = runsNeeded / remainingOvers;

    let winProbability = (predictedScore / target) * 100;
    if (winProbability > 100) winProbability = 100;
    if (winProbability < 0) winProbability = 0;

    document.getElementById("winBar").style.width = winProbability + "%";

    document.getElementById("result").innerHTML =
        "🎯 Target: " + target + "<br>" +
        "📊 Required Run Rate: " + requiredRunRate.toFixed(2) + "<br>" +
        "🔮 Predicted Score: " + Math.round(predictedScore) + "<br>" +
        "📈 Win Probability: " + winProbability.toFixed(1) + "%";

    let status = document.getElementById("status");
    let trophy = document.getElementById("trophy");
    let sound = document.getElementById("cheerSound");

    trophy.style.display = "none";

    if (predictedScore >= target) {

        status.innerText = "🎉 TEAM B WILL WIN!";
        status.style.color = "#00ff00";

        trophy.style.display = "block";

        confetti({
            particleCount: 300,
            spread: 120
        });

        sound.play();

        document.body.style.background =
            "linear-gradient(135deg, #11998e, #22ff77)";
    }
    else {
        status.innerText = "💔 TEAM B MAY LOSE!";
        status.style.color = "red";

        document.body.style.background =
            "linear-gradient(135deg, #cb2d3e, #ef473a)";
    }

    if (requiredRunRate > 12) {
        status.innerText += " 🚨 HIGH PRESSURE!";
    }
}
