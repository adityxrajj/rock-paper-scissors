//  * Rock Paper Scissors Game: Advanced Implementation

//  * Features:
//  * - Multiple game modes
//  * - Responsive design
//  * - Touch and click support
//  * - Detailed game state management

class RockPaperScissors {
  constructor() {
    // Game state management
    this.state = {
      playerScore: 0,
      computerScore: 0,
      gameMode: 'classic',
      round: 0,
      history: []
    };

    // DOM Element Caching
    this.elements = {
      playerChoice: document.getElementById('player-choice'),
      computerChoice: document.getElementById('computer-choice'),
      playerScore: document.getElementById('player-score'),
      computerScore: document.getElementById('computer-score'),
      result: document.getElementById('result'),
      modeButtons: document.querySelectorAll('.mode-button'),
      weapons: document.querySelectorAll('.weapon')
    };

    this.initializeGameEvents();
  }

  initializeGameEvents() {
    // Weapon Selection Event Listeners
    this.elements.weapons.forEach(weapon => {
      weapon.addEventListener('click', (e) => {
        const choice = e.target.dataset.choice;
        this.playRound(choice);
      });
    });

    // Game Mode Selection
    this.elements.modeButtons.forEach(button => {
      button.addEventListener('click', () => this.setGameMode(button.id.replace('-mode', '')));
    });
  }

  setGameMode(mode) {
    // Update game mode with visual feedback
    this.state.gameMode = mode;
    this.elements.modeButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${mode}-mode`).classList.add('active');

    this.updateDisplay(`${mode.toUpperCase()} mode activated!`);
  }

  playRound(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Update visual choices
    this.elements.playerChoice.textContent = this.getEmoji(playerChoice);
    this.elements.computerChoice.textContent = this.getEmoji(computerChoice);

    // Determine round result
    const result = this.determineWinner(playerChoice, computerChoice);
    this.updateGameState(result);
  }

  determineWinner(player, computer) {
    if (player === computer) return 'draw';

    const winConditions = {
      'rock': 'scissors',
      'paper': 'rock',
      'scissors': 'paper'
    };

    return winConditions[player] === computer ? 'win' : 'lose';
  }

  updateGameState(result) {
    this.state.round++;

    // Update scores
    if (result === 'win') this.state.playerScore++;
    if (result === 'lose') this.state.computerScore++;

    // Update score displays
    this.elements.playerScore.textContent = `${this.state.playerScore} Points`;
    this.elements.computerScore.textContent = `${this.state.computerScore} Points`;

    // Display result with appropriate styling
    this.updateDisplay(result);

    // Optional: Save game history
    this.state.history.push({
      round: this.state.round,
      result: result
    });
  }

  updateDisplay(result) {
    const resultElement = this.elements.result;
    resultElement.classList.remove('result-win', 'result-lose', 'result-draw');

    switch (result) {
      case 'win':
        resultElement.textContent = 'You Win! 🎉';
        resultElement.classList.add('result-win');
        break;
      case 'lose':
        resultElement.textContent = 'Computer Wins! 🤖';
        resultElement.classList.add('result-lose');
        break;
      case 'draw':
        resultElement.textContent = 'Draw! 🤝';
        resultElement.classList.add('result-draw');
        break;
      default:
        resultElement.textContent = result;
    }
  }

  getEmoji(choice) {
    const emojiMap = {
      'rock': '✊',
      'paper': '✋',
      'scissors': '✌️'
    };
    return emojiMap[choice] || '❓';
  }
}

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', () => new RockPaperScissors());