class GuessGame {
  #randomNumber;
  #chances;

  constructor(number, chances) {
    this.#randomNumber = number;
    this.#chances = chances;
    this.isGameOver = false;
  }

  #updateStatus(result) {
    this.isGameOver = this.#chances === 0 || result;
  }

  isGuessCorrect(number) {
    this.#chances -= 1;
    const result = this.#randomNumber === number;
    this.#updateStatus(result);
    
    return result;
  }

  isGreaterThan(number) {
    return number < this.#randomNumber;
  }

  get status() {
    const isGameOver = this.isGameOver;
    return { isGameOver };
  }
}

exports.GuessGame = GuessGame;
