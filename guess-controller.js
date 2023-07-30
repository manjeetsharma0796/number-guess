class GuessController {
  #guessGame;

  constructor(guessGame) {
    this.#guessGame = guessGame;
  }

  guessAndFeedBack(number) {
    if (this.#guessGame.isGuessCorrect(number)) {
      return `Correct ${number}`;
    }

    const isGreater = this.#guessGame.isGreater(number);
    return { isGreater };
  }

  isGameOver() {
    const { isGameOver } = this.#guessGame.status;
    return isGameOver;
  }
}

exports.GuessController = GuessController;
