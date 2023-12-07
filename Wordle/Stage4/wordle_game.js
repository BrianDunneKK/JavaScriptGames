import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../../CDKK/cdkk.js';

class WordleGame extends cdkkGame {
    #cfgPickWords = '';
    #cfgAllWords = '';
    #wordLen = 5;
    #maxGuesses = 6;
    #secretWord = '';      // Word the player is trying to guess
    #words = [];
    #scores = [];
    #pickWords = [];  // List of common words to pick the secret word from
    #allWords = [];   // List of all allowed words

    constructor({ cfgPickWords = '', cfgAllWords = '' } = {}) {
        super();
        this.#cfgPickWords = cfgPickWords;
        this.#cfgAllWords = cfgAllWords;
    }

    get view() {
        return ({
            ...super.view
            , words: this.#words
            , scores: this.#scores
        })
    }

    init() {
        // Once off initialisation
        fetch(this.#cfgPickWords)
            .then(response => response.text())
            .then((data) => {
                this.#pickWords = data.split(/\r?\n/);
                fetch(this.#cfgAllWords)
                    .then(response => response.text())
                    .then((data) => {
                        this.#allWords = data.split(/\r?\n/);
                        this.initComplete();
                    });
            })
    }

    prepare() {
        // Per Game preparation (initialisation)
        this.#words.length = 0;
        this.#scores.length = 0;
        this.#secretWord = this.#pickWords[Math.floor(Math.random() * this.#pickWords.length)];
        this.#secretWord = this.#secretWord.toUpperCase()
        console.log(this.#secretWord);
        this.prepareComplete();
    }

    update(input) {
        // Update the game based in this input
        let inputN = input.padEnd(this.#wordLen, ".").substring(0, this.#wordLen);
        this.#words.push(inputN);
        this.#scores.push(this._colourWordle(inputN));
        return true;
    }

    updateStatus(updated) {
        // Update the game status
        super.updateStatus(updated);
        if (this.#words[this.#words.length - 1] === this.#secretWord) {
            this.gameStatus.endGameWin();
        } else if (this.#words.length >= this.#maxGuesses) {
            this.gameStatus.endGameLose("Too many guesses");
        }
    }

    _colourWordle(guess) {
        // Calculate letter colours
        let result = guess;
        const solutionLettersCount = {};
        const guessLettersCount = {};

        for (let i = 0; i < this.#secretWord.toUpperCase().length; i++) {
            solutionLettersCount[this.#secretWord.toUpperCase()[i]] = (solutionLettersCount[this.#secretWord.toUpperCase()[i]] || 0) + 1;
            guessLettersCount[guess[i]] = (guessLettersCount[guess[i]] || 0) + 1;
        }
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === this.#secretWord.toUpperCase()[i]) {
                result = CDKK.setCharAt(result, i, '2');
                solutionLettersCount[guess[i]]--;
                guessLettersCount[guess[i]]--;
            }
        }
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] !== this.#secretWord.toUpperCase()[i] && solutionLettersCount[guess[i]] > 0 && guessLettersCount[guess[i]] > 0) {
                result = CDKK.setCharAt(result, i, '1');
                solutionLettersCount[guess[i]]--;
                guessLettersCount[guess[i]]--;
            } else if (guess[i] !== this.#secretWord.toUpperCase()[i]) {
                result = CDKK.setCharAt(result, i, '0');
            }
        }
        return result;
    }
}

export { WordleGame };