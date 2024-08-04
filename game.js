document.addEventListener("DOMContentLoaded", function () {
  const pokemonAPI = [
    { id: "41", name: "Zubat", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png" } },
    { id: "41", name: "Zubat", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png" } },
    { id: "92", name: "Gastly", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png" } },
    { id: "92", name: "Gastly", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png" } },
    { id: "93", name: "Haunter", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png" } },
    { id: "93", name: "Haunter", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png" } },
    { id: "94", name: "Gengar", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" } },
    { id: "94", name: "Gengar", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" } },
    { id: "96", name: "Drowzee", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png" } },
    { id: "96", name: "Drowzee", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png" } },
    { id: "97", name: "Hypno", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png" } },
    { id: "97", name: "Hypno", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png" } },
    { id: "104", name: "Cubone", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png" } },
    { id: "104", name: "Cubone", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png" } },
    { id: "105", name: "Marowak", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png" } },
    { id: "105", name: "Marowak", sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png" } }
  ];

  const pokemonIds = pokemonAPI.map(pokemon => pokemon.id);

  let shuffledPokemonIds = pokemonIds.sort(() => Math.random() - 0.5);

  let flippedCards = [];
  let matchedPairs = 0;

  let seconds = 0;
  let minutes = 0;
  let finalTime = '';
  let movesCount = 0;
  let timerInterval;

  let gameStarted = false;
  let disableDeck = false;

  function stopTimer() {
    clearInterval(timerInterval);
    gameStarted = false;
    
    // Trigger confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    gameStarted = true;
  }

  function updateTimer() {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;

    document.getElementById(
      "time"
    ).innerHTML = `<span>Time: ${minutesValue}:${secondsValue}</span>`;
    finalTime = `${minutesValue}:${secondsValue}`;
  }

  function updateMoves() {
    movesCount++;
    document.getElementById("moves").innerHTML = `<span>Moves: ${movesCount}</span>`;
  }

  function initializeTimer() {
    if (!gameStarted) {
      timerInterval = setInterval(updateTimer, 1000);
      gameStarted = true;
    }
  }

  function createPokemonBox(pokemonId) {
    const data = pokemonAPI.find(pokemon => pokemon.id === pokemonId);
    const box = document.createElement("div");
    box.className = "item";
    box.dataset.id = pokemonId;
    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.alt = data.name;
    box.appendChild(img);

    box.onclick = function () {
      initializeTimer();

      if (disableDeck) return;

      if (
        flippedCards.length < 2 &&
        !flippedCards.includes(this) &&
        !this.classList.contains("boxOpen")
      ) {
        this.classList.add("boxOpen");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
          const card1 = flippedCards[0].getAttribute("data-id");
          const card2 = flippedCards[1].getAttribute("data-id");

          if (card1 === card2) {
            flippedCards[0].classList.add("match");
            flippedCards[1].classList.add("match");
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === shuffledPokemonIds.length / 2) {
              setTimeout(() => {
                alert(`Game Over! Your time: ${finalTime}. Moves: ${movesCount}`);
                stopTimer();
              }, 500);
            }
          } else {
            disableDeck = true;

            setTimeout(() => {
              flippedCards.forEach((card) => {
                card.classList.add("shake");
              });

              setTimeout(() => {
                flippedCards.forEach((card) => {
                  card.classList.remove("boxOpen", "shake");
                });
                flippedCards = [];
                disableDeck = false;
              }, 500);

            }, 500);
          }

          updateMoves();
        }
      }
    };

    document.querySelector(".game").appendChild(box);
  }

  function createGame() {
    shuffledPokemonIds.forEach(pokemonId => createPokemonBox(pokemonId));
  }

  createGame();

  // Leaderboard functionality
   // Leaderboard functionality
  const leaderboard = document.getElementById("leaderboard");
  const toggleButton = document.getElementById("toggleLeaderboard");

  toggleButton.onclick = function () {
    if (leaderboard.style.display === "none" || leaderboard.style.display === "") {
      leaderboard.style.display = "block";
    } else {
      leaderboard.style.display = "none";
    }
  }

  // Sample leaderboard data
  const sampleWinners = [
    { user: "Player1", time: "01:23" },
    { user: "Player2", time: "01:30" },
    { user: "Player3", time: "01:45" }
  ];

  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes * 60) + seconds;
  };

  sampleWinners.sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time));

  const leaderboardList = document.getElementById('leaderboard-list');
  sampleWinners.forEach((winner, index) => {
    const li = document.createElement('li');
    let trophyIcon = '';
    switch (index) {
      case 0:
        trophyIcon = '<i class="fas fa-trophy" style="color: gold;"></i>';
        break;
      case 1:
        trophyIcon = '<i class="fas fa-trophy" style="color: silver;"></i>';
        break;
      case 2:
        trophyIcon = '<i class="fas fa-trophy" style="color: peru;"></i>';
        break;
    }
    li.innerHTML = `${winner.user} ${winner.time} ${trophyIcon}`;
    leaderboardList.appendChild(li);
  });
});
