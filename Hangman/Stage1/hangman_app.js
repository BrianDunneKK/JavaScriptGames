import { CDKK, cdkkApp } from '../../cdkk.mjs';
import { cdkkNode } from '../../cdkk_node.mjs';
import { HangmanGame } from '../hangman_game.mjs';
import { HangmanUI } from './hangman_ui.mjs';

function hangmanWords() {
    let ret = cdkkNode.readFileSync('../hangman_words.txt');
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