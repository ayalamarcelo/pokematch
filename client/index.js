// Add an event listener to ensure the DOM is fully loaded before running the script.

document.addEventListener("DOMContentLoaded", function () {
  const pokemonAPI = {};

  fetch("/pokeAPI")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pokemon) => {
        pokemonAPI[pokemon.id] = pokemon;
      });

      const pokemonIds = [
        "41", "41", "92", "92", "93", "93", "94", "94", "96", "96", "97", "97",
        "104", "104", "105", "105"
      ];

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
        finalTime = `${minutesValue}:${secondsValue}`
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
        const data = pokemonAPI[pokemonId];
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
                    let user = prompt("Ranking");
                    let time = finalTime;
                    let moves = movesCount;
                    fetch('/api/winner', {
                      method: 'POST',
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ user, moves, time })
                    })
                      .then((response) => response.json())
                      .then((data) => console.log(data))
                      .catch((err) => {
                        console.log(`Error ${err}`)
                      });
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

      async function createGame() {
        for (let i = 0; i < shuffledPokemonIds.length; i++) {
          createPokemonBox(shuffledPokemonIds[i]);
        }
      }

      createGame();
    })
    .catch((err) => {
      console.error(`Error getting Pokémon data ${err}`);
    });
});

// Leaderboard

const leaderboard = document.getElementById("leaderboard");
const toggleButton = document.getElementById("toggleLeaderboard");

toggleButton.onclick = function () {
  if (leaderboard.style.display === "none" || leaderboard.style.display === "") {
    leaderboard.style.display = "block";
  } else {
    leaderboard.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/winners')
      .then(response => response.json())
      .then(winners => {
          // Convert time on seconds
          const timeToSeconds = (time) => {
              const [minutes, seconds] = time.split(':').map(Number);
              return (minutes * 60) + seconds;
          };

          // Order winners for time
          winners.sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time));

          const leaderboardList = document.getElementById('leaderboard-list');
          leaderboardList.innerHTML = '';

          winners.forEach((winner, index) => {
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
      })
      .catch(error => {
          console.error('Error fetching winners:', error);
      });
});
