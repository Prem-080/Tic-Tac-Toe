function startComputerMode() {
    let board = document.getElementById("board");
    let choices = document.querySelectorAll(".choices");
    let choice = document.querySelector(".choice");
    let cells = document.querySelectorAll(".cell");
    let gameActive = true;
    let computer = "O", user = "X";

    choices.forEach(e => {
        e.addEventListener("click", () => {
            user = e.innerText;
            computer = user == "X" ? "O" : "X";
            choice.classList.toggle("toggle_btn");
            board.classList.toggle("toggle_btn");
            pointerEventsOff(choices);
        })
    });

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (cell.innerText === "") {
                cell.classList.add(`${user}`);
                cell.innerText = `${user}`; // Player's move
                cell.style.pointerEvents = "none"; // Disable further clicks
                checkWin();
                if (gameActive == true) {
                    computerMove();
                    checkWin();
                }
            }
        });
    }
    );

    function computerMove() {
        let gameState = Array.from(cells).map(cell => cell.innerText);
        let availableSlots = Array.from(cells).filter(cell => cell.innerText == "").map(cell => cell.dataset.index);

        function checkWinner(gameState, player) {
            const winningCombinations =
                [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ];
            for (const [a, b, c] of winningCombinations) {
                if (gameState[a] == player && gameState[b] == player && gameState[c] == player) return true;
            }
            return false;
        }
        for (const ind of availableSlots) {
            gameState[ind] = computer;
            if (checkWinner(gameState, computer)) {
                cells[ind].innerText = `${computer}`;
                cells[ind].classList.add(`${computer}`);
                cells[ind].style.pointerEventsOff = "true";
                return;
            }
            else {
                gameState[ind] = "";
            }
        }
        for (const ind of availableSlots) {
            gameState[ind] = user;
            if (checkWinner(gameState, user)) {
                gameState[ind] = `${computer}`;
                cells[ind].innerText = `${computer}`;
                cells[ind].classList.add(`${computer}`);
                cells[ind].style.pointerEventsOff = "true";
                return;
            }
            else {
                gameState[ind] = "";
            }
        }

        let firstMove;
        if ((gameState.filter(cell => cell != "").length) == 1) {
            for (let index = 0; index < gameState.length; index++) {
                const element = gameState[index];
                if (element == user) firstMove = index;
            }
        }

        if (firstMove == 0 || firstMove == 8) {
            cells[4].innerText = `${computer}`;
            cells[4].classList.add(`${computer}`);
            cells[4].style.pointerEventsOff = "true";
        }
        else if (firstMove == 4) {
            cells[0].innerText = `${computer}`;
            cells[0].classList.add(`${computer}`);
            cells[0].style.pointerEventsOff = "true";
        }
        else if (firstMove == 2 || firstMove == 6) {
            cells[4].innerText = `${computer}`;
            cells[4].classList.add(`${computer}`);
            cells[4].style.pointerEventsOff = "true";
        }
        else {
            let rand = Math.floor(Math.random() * (availableSlots.length - 0 + 1)) + 0;
            cells[availableSlots[rand]].innerText = `${computer}`;
            cells[availableSlots[rand]].classList.add(`${computer}`);
            cells[availableSlots[rand]].style.pointerEventsOff = "true";
        }
    }

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
                if (cells[a].innerText == computer) {
                    current.innerText = `AI wins!`;
                }
                if (cells[a].innerText == user) {
                    current.innerText = `You win!`;
                }
                gameActive = false; // Set gameActive to false
                pointerEventsOff(cells); // Disable further clicks
                toggleRestartButton(); // Show the restart button
                return; // Exit the function after a win
            }
        }

        if (Array.from(cells).every(cell => cell.innerText !== "")) {
            current.innerText = "Draw!";
            gameActive = false; // Set gameActive to false
            pointerEventsOff(cells); // Disable further clicks
            toggleRestartButton(); // Show the restart button
            return; // Exit the function after a draw
        }
    }

    function pointerEventsOff(c) {
        c.forEach(cell => {
            cell.style.pointerEvents = "none"; // Disable further clicks
        });

    }

    function resetGame() {
        cells.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("x", "o", "win");
            cell.style.pointerEvents = "auto"; // Re-enable clicks
        });
        choices.forEach(c => {
            c.style.pointerEvents = "auto";
        })

        choice.classList.toggle("toggle_btn");
        board.classList.toggle("toggle_btn");
        currentPlayer = "X";
        gameActive = true;
        current.innerText = ``;
        toggleRestartButton(); // Hide the restart button

    }

    function toggleRestartButton() {
        const restartButton = document.getElementById("restart");
        restartButton.classList.toggle("toggle_btn");
    }

    document.getElementById("restart").addEventListener("click", resetGame);
}

startComputerMode();