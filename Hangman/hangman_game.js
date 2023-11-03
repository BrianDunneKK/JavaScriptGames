class HangmanGame extends cdkkGGame {
    #secretWord = "";  // Word the player is trying to guess
    #guessWord = "";   // Word pattern based o nguesses so far
    #guessMisses = 0;  // Number of incorrect guesses

    get view() {
        return ({
            guess: this.#guessWord
            , status: this.gameStatus
        })
    }
    prepare() {
        // Per Game preparatipon (initialisation)
        this.#guessMisses = 0;
        this.#secretWord = "JavaScript";
        this.#guessWord = "_".repeat(this.#secretWord.length)
    }
    update(input = null) {
        if (input) {
            let miss = 1;
            for (let i = 0; i < this.#secretWord.length; i++) {
                if (input.toLowerCase() === this.#secretWord[i].toLowerCase()) {
                    this.#guessWord = setCharAt(this.#guessWord, i, this.#secretWord[i]);
                    miss = 0;
                }
            }
            this.#guessMisses += miss;
        }
    }
    updateStatus() {
        if (this.#guessWord === this.#secretWord) {
            this.gameStatus.endGameWin();
        } else if (this.#guessMisses >= 3) {
            this.gameStatus.endGameLose("Too many guesses");
        }
    }
}
