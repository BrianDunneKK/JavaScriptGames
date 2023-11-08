import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../../cdkk.mjs';
import * as readline from 'node:readline';

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class HangmanUI extends cdkkGameUI {
    init() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
    }

    processInput(input) {
        // Process input before passing to game
        return input.toLowerCase();
    }

    displayGame(gameView) {
        // Display the game based on the view provided
        console.log(gameView.hangman);
        console.log();
        console.log(gameView.guess);
        console.log();

        if (gameView.status.win) {
            console.log("You won!!");
        } else if (gameView.status.lose) {
            console.log("You lost!!");
        }

    }
}

export { HangmanUI };