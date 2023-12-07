import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../../CDKK/cdkk.js';

class WordleGame extends cdkkGame {
    #cfgPickWords = '';
    #cfgAllWords = '';
    #wordLen = 5;
    #maxGuesses = 6;
    #secretWord = "HOUSE";      // Word the player is trying to guess
    #words = [];
    #scores = [];

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
        this.initComplete();
    }

    prepare() {
        // Per Game preparation (initialisation)
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
    }

    _colourWordle(guess) {
        // Calculate letter colours
        let result = guess;
        const solutionLettersCount = {};
        const guessLettersCount = {};

        for (let i = 0; i < this.#secretWord.length; i++) {
            solutionLettersCount[this.#secretWord[i]] = (solutionLettersCount[this.#secretWord[i]] || 0) + 1;
            guessLettersCount[guess[i]] = (guessLettersCount[guess[i]] || 0) + 1;
        }
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === this.#secretWord[i]) {
                result = CDKK.setCharAt(result, i, '2');
                solutionLettersCount[guess[i]]--;
                guessLettersCount[guess[i]]--;
            }
        }
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] !== this.#secretWord[i] && solutionLettersCount[guess[i]] > 0 && guessLettersCount[guess[i]] > 0) {
                result = CDKK.setCharAt(result, i, '1');
                solutionLettersCount[guess[i]]--;
                guessLettersCount[guess[i]]--;
            } else if (guess[i] !== this.#secretWord[i]) {
                result = CDKK.setCharAt(result, i, '0');
            }
        }
        return result;
    }
}

export { WordleGame };