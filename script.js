let currentPlayer = 'X'; // or 'O'
let player1 = '';
let player2 = '';

document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player1').value.trim();
    player2 = document.getElementById('player2').value.trim();

    if (!player1 || !player2) {
        alert('Please enter names for both players.');
        return;
    }

    // Hide input area and show the game board
    // document.querySelector('.player-inputs').style.display = 'none';
    document.querySelector('.game').style.display = 'block';

    document.querySelector('.message').textContent = `${player1}, you're up`;
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        if (!this.textContent && document.querySelector('.game').style.display === 'block') {
            this.textContent = currentPlayer;

            // Check for win after every move
            if (checkWinner()) {
    let winner = currentPlayer === 'X' ? 'Player1' : 'Player2';
    document.querySelector('.message').textContent = `${winner} congratulations you won!`;
    disableBoard();
    return;
}


            // Switch players
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            let nextPlayer = currentPlayer === 'X' ? player1 : player2;
            document.querySelector('.message').textContent = `${nextPlayer}, you're up`;
        }
    });
});

// Winning combinations
const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function checkWinner() {
    return winningCombos.some(combo => {
        const [a, b, c] = combo.map(i => document.getElementById(i).textContent);
        return a && a === b && b === c;
    });
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
}
