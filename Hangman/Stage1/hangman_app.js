import { CDKK, cdkkApp } from '../../CDKK/cdkk.js';
import { cdkkNode } from '../../CDKK/cdkk_node.js';
import { HangmanGame } from '../hangman_game.js';
import { HangmanUI } from './hangman_ui.js';

function hangmanWords() {
    let ret = cdkkNode.readFileSync('Hangman/hangman_words.txt');
    let words = [];
    if (ret.contents !== null) {
        words = ret.contents.split('\r\n');
    }
    if (ret.err !== null) {
        console.error(ret.err.message);
    }
    return words;
}

let game = new HangmanGame({ cfgWords: hangmanWords });
let ui = new HangmanUI();
cdkkApp.app = new cdkkApp({ game: game, ui: ui, autoStart: true });
cdkkApp.app.init();
cdkkApp.app.playKeystrokes();