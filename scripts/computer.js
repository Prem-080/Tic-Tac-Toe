function startComputerMode() {
    let board = document.getElementById("board");
    let cells = document.querySelectorAll(".cell");
    let gameActive = true;


    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (cell.innerText === "") {
                cell.classList.add("x");
                cell.innerText = "X"; // Player's move
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
            gameState[ind] = "O";
            if (checkWinner(gameState, "O")) {
                cells[ind].innerText = "O";
                cells[ind].classList.add("o");
                cells[ind].style.pointerEventsOff = "true";
                console.log("O winning")
                return;
            }
            else {
                gameState[ind] = "";
            }
        }
        for (const ind of availableSlots) {
            gameState[ind] = "X";
            if (checkWinner(gameState, "X")) {
                gameState[ind] = "O";
                cells[ind].innerText = "O";
                cells[ind].classList.add("o");
                cells[ind].style.pointerEventsOff = "true";
                console.log("X winning")
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
                if (element == "X") firstMove = index;
            }
        }

        if (firstMove == 0 || firstMove == 8) {
            cells[4].innerText = "O";
            cells[4].classList.add("o");
            cells[4].style.pointerEventsOff = "true";
        }
        else if (firstMove == 4) {
            cells[0].innerText = "O";
            cells[0].classList.add("o");
            cells[0].style.pointerEventsOff = "true";
        }
        if (firstMove == 2 || firstMove == 6) {
            cells[4].innerText = "O";
            cells[4].classList.add("o");
            cells[4].style.pointerEventsOff = "true";
        }
        else {
            let rand = Math.floor(Math.random() * (availableSlots.length - 0 + 1)) + 0;
            cells[availableSlots[rand]].innerText = "O";
            cells[availableSlots[rand]].classList.add("o");
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
                current.innerText = `${cells[a].innerText} wins!`;
                gameActive = false; // Set gameActive to false
                pointerEventsOff(); // Disable further clicks
                return; // Exit the function after a win
            }
        }

        if (Array.from(cells).every(cell => cell.innerText !== "")) {
            current.innerText = "It's a draw!";
            gameActive = false; // Set gameActive to false
            pointerEventsOff(); // Disable further clicks
            return; // Exit the function after a draw
        }
    }

    function pointerEventsOff() {
        cells.forEach(cell => {
            cell.style.pointerEvents = "none"; // Disable further clicks
        });
        toggleRestartButton(); // Show the restart button
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("x", "o", "win");
            cell.style.pointerEvents = "auto"; // Re-enable clicks
        });
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