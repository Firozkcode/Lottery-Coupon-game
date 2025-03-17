document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.querySelector(".game");
    const body = document.body;
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const startGameBtn = document.getElementById("startGame");
    const numCardsInput = document.getElementById("numCards");
    const minPrizeInput = document.getElementById("minPrize");
    const maxPrizeInput = document.getElementById("maxPrize");

    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");

    let hasSelected = false;

    // Toggle menu
    burger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    function generateCards(numCards, minPrize, maxPrize) {
        gameContainer.innerHTML = ""; 
        hasSelected = false;
        body.style.height = "auto";
        body.style.overflow = "auto";
        overlay.style.display = "none";

        for (let i = 0; i < numCards; i++) {
            const card = document.createElement("div");
            card.classList.add("card");

            const inside = document.createElement("div");
            inside.classList.add("inside");

            const front = document.createElement("div");
            front.classList.add("front");
            front.innerText = "Tap Me!";

            const back = document.createElement("div");
            back.classList.add("back");
            back.innerHTML = `
                <p>🎉You Won!!🎉</p>
                <h1>Rs.${getRandomPrize(minPrize, maxPrize)}</h1>
                <p>🎉Congratulations!!🎉</p>
                <a href="index.html" class="play-again">Play Again</a>
            `;

            inside.appendChild(front);
            inside.appendChild(back);
            card.appendChild(inside);
            gameContainer.appendChild(card);

            card.addEventListener("click", function () {
                if (!hasSelected) {
                    card.classList.add("flipped");
                    hasSelected = true;
                    playWinSound();

                    body.style.height = "100vh";
                    body.style.overflow = "hidden";
                    overlay.style.display = "block";
                    card.style.position = "fixed";
                    card.style.top = "50%";
                    card.style.left = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(1.2)";
                    card.style.zIndex = "1000";

                    const playAgainBtn = card.querySelector(".play-again");
                    playAgainBtn.style.display = "block";

                    // playAgainBtn.addEventListener("click", function (e) {
                    playAgainBtn.addEventListener("click",  () =>  {
                        // e.preventDefault();
                        generateCards(numCards, minPrize, maxPrize);
                    });
                }
            });
        }
    }

    function getRandomPrize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function playWinSound() {
        const audio = new Audio('win.mp3');
        audio.play();
    }

    startGameBtn.addEventListener("click", function () {
        const numCards = parseInt(numCardsInput.value);
        const minPrize = parseInt(minPrizeInput.value);
        const maxPrize = parseInt(maxPrizeInput.value);

        if (minPrize > maxPrize) {
            alert("Min prize cannot be greater than max prize!");
            return;
        }

        generateCards(numCards, minPrize, maxPrize);
        menu.classList.toggle("active");
    });

    generateCards(10, 10, 100);
});
