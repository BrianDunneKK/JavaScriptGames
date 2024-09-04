import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../../CDKK/cdkk.js';

class WordleUI extends cdkkGameUI {
    #elemGuesses = document.getElementById("idGuesses");
    #elemOutcome = document.getElementById("idOutcome");

    constructor() {
        // Convert all letters to upper case
        // Play one word at a time
        // Treat every keystroke as user input
        super({ toUpper: true, toWord: true, playKeys: true });
    }

    init() {
        // Once off initialisation
        super.init();
        document.getElementById('idRestart').addEventListener("click", ev => {
            document.getElementById('idRestart').blur();  // Remove keyboard focus so that Enter does not trigger
            const evt = new CustomEvent("game", { detail: { action: "restart" } });
            document.dispatchEvent(evt);
        });
    }

    displayGame(gameView) {
        // Display the game based on the view provided
        this.#elemOutcome = document.getElementById("idOutcome");
        if (gameView.status.win) {
            this.#elemOutcome.innerHTML = "You won!!";
            this.#elemOutcome.style.visibility = "visible";
        } else if (gameView.status.lose) {
            this.#elemOutcome.innerHTML = "You lost!!";
            this.#elemOutcome.style.visibility = "visible";
        } else {
            this.#elemOutcome.innerHTML = "";
            this.#elemOutcome.style.visibility = "hidden";
        }

        // Blank out previous words
        while (this.#elemGuesses.firstChild && this.#elemGuesses.removeChild(this.#elemGuesses.firstChild));

        for (let i = 0; i <= gameView.words.length; i++) {
            // Add one word at a time
            let word = '';
            let score = '';

            if (i < gameView.words.length) {
                // Display previous guesses first
                word = gameView.words[i];
                score = gameView.scores[i];
            } else {
                // Display any partial words at the end. No score yet against this yet.
                word = this._currentWord;
                score = "000000000000000";
            }

            if (word.length > 0) {
                let divWord = document.createElement('div');
                divWord.classList.add("clsWord");
                this.#elemGuesses.appendChild(divWord);

                for (let j = 0; j < word.length; j++) {
                    // Add one letter of each word at a time
                    let spanLetter = document.createElement('span');
                    spanLetter.innerHTML = word[j];
                    spanLetter.classList.add("clsLetter");

                    switch (score[j]) {
                        // Add colour class based on the score
                        case '1': spanLetter.classList.add("clsLetterYellow"); break;
                        case '2': spanLetter.classList.add("clsLetterGreen"); break;
                    }
                    divWord.appendChild(spanLetter);
                };
            }
        }
    }
}

export { WordleUI };