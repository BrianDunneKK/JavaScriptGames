import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../../CDKK/cdkk.js';

class WordleGame extends cdkkGame {
    #cfgPickWords = '';
    #cfgAllWords = '';
    #wordLen = 5;
    #maxGuesses = 6;
    #secretWord = "HOUSE";      // Word the player is trying to guess
    #words = [ "WORDLE", "GAMERS", "ANSWER"];  // Include sample words to test UI
    #scores= [ "000000", "210210", "001122"];  // Include sample scores to test UI

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
        return true;
    }
    
    updateStatus(updated) {
        // Update the game status
        super.updateStatus(updated);
    }

    _colourWordle(guess) {
        // Calculate letter colours
    }
}

export { WordleGame };