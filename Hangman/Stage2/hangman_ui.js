import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../../CDKK/cdkk.js';

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class HangmanUI extends cdkkGameUI {
    #elemGuess = document.getElementById("idWordGuess");
    #elemGuesses = document.getElementById("idGuesses");
    #elemOutcome = document.getElementById("idOutcome");
    #elemHangman = document.getElementById("idHangman");

    constructor() {
        super({ toLower: true });
    }

    init() {
        // Once off initialisation
        this._initCreateLetters();
        document.getElementById('idRestart').addEventListener("click", ev => {
            const evt = new CustomEvent("game", { detail: { action: "restart" } });
            document.dispatchEvent(evt);
        });
    }

    _initCreateLetters() {
        let elemLetters = document.getElementById('idLetters');
        let letters = document.createElement('div');
        elemLetters.appendChild(letters);

        for (let i = 0; i < alphabet.length; i++) {
            let letter = document.createElement('button');
            letter.id = "letter_" + alphabet[i];
            letter.innerHTML = alphabet[i];
            letter.style = "width: 50px; height: 50px;"
            letter.addEventListener("click", ev => this.play(alphabet[i]));
            letters.appendChild(letter);
            if ((i + 1) % 9 === 0) {
                let new_line = document.createElement('br');
                letters.appendChild(new_line);
            }
        }
    }

    displayGame(gameView) {
        // Display the game based on the view provided
        this.#elemGuess.innerHTML = gameView.guess;
        this.#elemGuesses.innerHTML = gameView.guessed;

        this.#elemOutcome = document.getElementById("idOutcome");
        if (gameView.status.win) {
            this.#elemOutcome.innerHTML = "You won!!";
        } else if (gameView.status.lose) {
            this.#elemOutcome.innerHTML = "You lost!!";
        } else {
            this.#elemOutcome.innerHTML = "";
        }

        let elemHMSVG = cdkkGameUI.createSVGElement('svg', { "width": "400", "height": "300" });
        this.#elemHangman.replaceChildren(elemHMSVG);

        let fnClass = function (cls) {
            let cssClass = "";
            switch (cls) {
                case "F":
                    cssClass = "clsHangmanSVGFrame";
                    break;
                case "M":
                    cssClass = "clsHangmanSVGMan";
                    break;
            }
            return cssClass;
        }
        let fnLine = function (x1, y1, x2, y2, cls) {
            let cap = "butt";
            if ((x1 == x2) || (y1 == y2)) { cap = "square" }  // Horizontal and vertical lines
            return ({
                "x1": x1, "y1": y1, "x2": x2, "y2": y2
                , "stroke-width": "10", "stroke-linecap": cap, "class": fnClass(cls)
            })
        }
        let fnCircle = function (cx, cy, r, cls) {
            return ({ "cx": cx, "cy": cy, "r": r, "stroke-width": "10", "fill": "white", "class": fnClass(cls) })
        }

        switch (gameView.misses) {
            // No breaks so fall through from each case
            case 7:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(170, 200, 200, 250, "M")));  // Right leg
            case 6:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(170, 200, 140, 250, "M")));  // Left leg
            case 5:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(170, 130, 200, 170, "M")));  // Right arm
            case 4:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(170, 130, 140, 170, "M")));  // Left arm
            case 3:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(170, 120, 170, 200, "M")));  // Body
            case 2:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('circle', fnCircle(170, 90, 30, "M")));     // Head
            case 1:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(170, 20, 170, 60, "F")));    // Rope
            default:
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(20, 280, 220, 280, "F")));  // Frame
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(20, 280, 20, 20, "F")));
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(20, 20, 170, 20, "F")));
                elemHMSVG.appendChild(cdkkGameUI.createSVGElement('line', fnLine(20, 60, 60, 20, "F")));
                break;
        }
    }
}

export { HangmanUI };