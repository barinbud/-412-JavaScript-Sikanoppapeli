let numPlayers = 2;
let currentPlayer = 0;
let players = [];
let currentRoll = 0;
let diceCount = 1; 
let winScore = 100; 


function startGame() {
  numPlayers = parseInt(document.getElementById("num-players").value, 10);
  diceCount = parseInt(document.getElementById("dice-count").value, 10);
  winScore = parseInt(document.getElementById("win-score").value, 10);
  if (winScore < 50) {
    winScore = 50;
  }

  players = [];
  for (let i = 0; i < numPlayers; i++) {
    let playerName = prompt(`Anna pelaajan ${i + 1} nimi:`);
    if (!playerName || playerName.trim() === "") {
      players.push({ name: `Pelaaja ${i + 1}`, score: 0, roundScore: 0 });
    } else {
      players.push({ name: playerName.trim(), score: 0, roundScore: 0 });
    }
  }

  document.getElementById("player-setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  updateScoreboard();
  updatePlayerTurn();
}


function updatePlayerTurn() {
  document.getElementById("current-player").textContent = `${players[currentPlayer].name}`;
  currentRoll = 0;
  document.getElementById("dice-rolls").textContent = "Heitä noppaa!";
  document.getElementById("thrown-points").textContent = "Pistemäärä: 0";
}


function updateScoreboard() {
  let scoreboard = "<h2>Pisteet</h2><ul>";
  players.forEach(player => {
    scoreboard += `<li>${player.name}: ${player.score} pistettä</li>`;
  });
  scoreboard += "</ul>";
  document.getElementById("scoreboard").innerHTML = scoreboard;
}


function rollDice() {
  let roll1 = Math.floor(Math.random() * 6) + 1;
  let roll2 = 0;
  let diceOutput = "";

  if (diceCount === 2) {
    roll2 = Math.floor(Math.random() * 6) + 1;
    diceOutput = `Heitit: ${roll1}, ${roll2}`;
  } else {
    diceOutput = `Heitit: ${roll1}`;
  }
  document.getElementById("dice-rolls").textContent = diceOutput;

  
  if (diceCount === 2 && roll1 === roll2) {
    
    if (roll1 === 1) { 
      players[currentPlayer].roundScore += 25;
      updateThrownPoints();
      setTimeout(() => {
        alert("Heitit kaksi ykköstä! Saat 25 pistettä.");
      }, 50);
    } else {
      players[currentPlayer].roundScore += (roll1 + roll2) * 2; 
      updateThrownPoints();
    }
  } else {
    if (
      (diceCount === 2 && (roll1 === 1 || roll2 === 1)) ||
      (diceCount === 1 && roll1 === 1)
    ) {
      
      players[currentPlayer].roundScore = 0;
      updateThrownPoints();
      setTimeout(() => {
        alert("Heitit ykkösen! Vuoro päättyy.");
        endTurn();
      }, 50);
      return;
    } else {
      
      players[currentPlayer].roundScore += diceCount === 2 ? roll1 + roll2 : roll1;
      updateThrownPoints();
    }
  }

  
  if (players[currentPlayer].score + players[currentPlayer].roundScore >= winScore) {
    setTimeout(() => {
      alert(`${players[currentPlayer].name} voitti pelin!`);
      resetGame();
    }, 50);
  }
}


function updateThrownPoints() {
  document.getElementById("thrown-points").textContent = `Pistemäärä: ${players[currentPlayer].roundScore}`;
}


function endTurn() {
  players[currentPlayer].score += players[currentPlayer].roundScore;
  players[currentPlayer].roundScore = 0;
  updateThrownPoints();
  updateScoreboard();
  currentPlayer = (currentPlayer + 1) % numPlayers;
  updatePlayerTurn();


  if (players[currentPlayer].score >= winScore) {
    setTimeout(() => {
      alert(`${players[currentPlayer].name} voitti pelin!`);
      resetGame();
    }, 50);
  }
}


function resetGame() {
  numPlayers = 2;
  currentPlayer = 0;
  players = [];
  document.getElementById("player-setup").style.display = "block";
  document.getElementById("game").style.display = "none";
}
