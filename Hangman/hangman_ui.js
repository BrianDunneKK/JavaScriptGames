let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class HangmanUI extends cdkkUI {
    init() {
        // Once off initialisation
        this._initCreateLetters();
        document.addEventListener('keypress', (event) => {
            let elemLetter = document.getElementById("letter_" + event.key);
            elemLetter.click();
        }, false);
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
            letter.classList.add('clsLetter');
            letter.addEventListener("click", ev => this.play(alphabet[i]));
            letters.appendChild(letter);
            if ((i + 1) % 9 === 0) {
                let new_line = document.createElement('br');
                letters.appendChild(new_line);
            }
        }
    }

    processInput(input) {
        // Process input before passing to game
        document.getElementById("letter_" + input).disabled = true;
        return input.toLowerCase();
    }

    prepare() {
        // Per Game preparatipon (initialisation)
        for (let i = 0; i < alphabet.length; i++) {
            let elemLetter = document.getElementById("letter_" + alphabet[i]);
            elemLetter.disabled = false;
        }
    }

    displayGame(gameView) {
        // Display the game based on the view provided
        let elemGuess = document.getElementById("idWordGuess");
        elemGuess.innerHTML = gameView.guess;

        let elemOutcome = document.getElementById("idOutcome");
        if (gameView.status.win) {
            elemOutcome.innerHTML = "You won!!";
        } else if (gameView.status.lose) {
            elemOutcome.innerHTML = "You lost!!";
        } else {
            elemOutcome.innerHTML = "";
        }
    }
}
