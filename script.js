// Gameboard module (IIFE to encapsulate it)
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = ()=> board; // Returns the current state of the board

  const setMove = (index, mark)=> {
    if (board[index] === "") {
      board[index] = mark; // Marks the board with either "X" or "O" if the cell is empty
      return true; 
  }
  return false; // If the cell is not empty, no move is made
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];  // Resets the board to empty
  };

  return { getBoard, setMove, resetBoard };  // Makes these methods available outside
  
})();

// Player Factory
const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  let players = []; // Holds the two players objects
  let currentPlayerIndex = 0; // Tracks whose turn it is
  let gameOver = false; // Flag to indicate if the game is over

  // Add counters for wins and draws
  let player1Wins = 0;
  let player2Wins = 0;
  let ties = 0;

  const addPlayers = (player1Name, player2Name) => {
    players.push(Player(player1Name, "X")); 
    players.push(Player(player2Name, "O")); 
  }

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

     // Check if any winning condition is met

    for(let condition of winConditions){
      const [a, b, c] = condition;
      if(board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning mark (either "X" or "O")
      }
    }

    if(!board.includes("")){
      return "tie"; // If no winning condition is met and the board is full
    }

    return null; // No winner yet
  };

  const playRound = (index) => {
    if (gameOver) return;

    const currentPlayer = getCurrentPlayer(); // Get current player
    if(Gameboard.setMove(index, currentPlayer.mark)) {// Make the move
      const winner = checkWinner(); // Check if there's a winner
      if(winner) {
        gameOver = true; // End the game if there's a winner or tie
        if(winner === "tie"){
          ties++;
          return "It's a tie!";
        } else {
          if (currentPlayerIndex === 0){
            player1Wins++;
          } else {
            player2Wins++;
          }
          return `${currentPlayer.name} wins!`;
        }
      } else {
        switchPlayer(); 
      }
    }
    return null;
  };

  const resetGame = () => {
    Gameboard.resetBoard(); // Reset the gameboard
    currentPlayerIndex = 0; // Reset to player 1's turn
    gameOver = false; // Reset game over flag
  };

  const getScores = () => ({
    player1Wins,
    player2Wins,
    ties
  });

  return { addPlayers, playRound, resetGame, getCurrentPlayer, getScores };  // Return the functions we need to control the game
})();

const DisplayController = (() => {
  const gameboardDiv = document.getElementById("gameboard");
  const restartButton = document.getElementById("restart-game");
  const startButton = document.getElementById("start-game");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");
  const gameStatus = document.getElementById("game-status");

  // DOM elements for displaying scores
  const player1Score = document.getElementById("player1-score");
  const player2Score = document.getElementById("player2-score");
  const tieScore = document.getElementById("tie-score");

  const renderBoard = () => {
    gameboardDiv.innerHTML = ""; // Clear the current board on the screen
    const board = Gameboard.getBoard();  // Get the current board state
    board.forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.textContent = mark;  // Set the mark (either "X", "O", or "")
      cell.addEventListener("click", () => handleCellClick(index));  // Add a click event to the cell
      gameboardDiv.appendChild(cell);  // Add the cell to the gameboard div
      });
  };

  const updateScores = () => {
    const scores = GameController.getScores();
    player1Score.textContent = `Player 1 Wins: ${scores.player1Wins}`;
    player2Score.textContent = `Player 2 Wins: ${scores.player2Wins}`;
    tieScore.textContent = `Ties: ${scores.ties}`;
  };

  const handleCellClick = (index) => {
    const result = GameController.playRound(index);  // Play the round
        if (result) {
            gameStatus.textContent = result;  // Display the result (who won or if it's a tie)
            gameStatus.classList.remove("hidden");
            restartButton.classList.remove("hidden");
            updateScores();
        }
        renderBoard();  // Re-render the board after the move
    };

    const startGame = () => {
      const player1Name = player1Input.value || "Player 1";
      const player2Name = player2Input.value || "Player 2";

      GameController.addPlayers(player1Name, player2Name);
      gameStatus.classList.add("hidden");
      restartButton.classList.add("hidden");
      renderBoard();
      updateScores();
    };

    startButton.addEventListener("click", startGame);

    restartButton.addEventListener("click", () => {
        GameController.resetGame();
        renderBoard();
        gameStatus.classList.add("hidden");
        restartButton.classList.add("hidden");
    });

    renderBoard();

    return { renderBoard };
})();

