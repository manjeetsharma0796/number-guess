class GuessController {
  #guessGame;

  constructor(guessGame) {
    this.#guessGame = guessGame;
  }

  guessAndFeedBack(number) {
    if (this.#guessGame.isGuessCorrect(number)) {
      return `Correct ${number}`;
    }

    const feedback = this.#guessGame.isGreaterThan(number) ? "Lesser" : "Greater";
    return `${feedback} ${number}`;
  }

  isGameOver() {
    const { isGameOver } = this.#guessGame.status;
    return isGameOver;
  }
}

exports.GuessController = GuessController;
