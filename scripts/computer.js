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
                if (gameActive == true) computerMove();
            }
        });
    }
    );

    function computerMove() {
        let emptyCells = Array.from(cells).filter(cell => cell.innerText === "");
        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.classList.add("o");
            randomCell.innerText = "O"; // Computer's move
            randomCell.style.pointerEvents = "none"; // Disable further clicks
            checkWin();
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
        current.innerText = `${currentPlayer}'s turn`;
        toggleRestartButton(); // Hide the restart button
    }

    function toggleRestartButton() {
        const restartButton = document.getElementById("restart");
        restartButton.classList.toggle("toggle_btn");
    }

    document.getElementById("restart").addEventListener("click", resetGame);
}

startComputerMode();