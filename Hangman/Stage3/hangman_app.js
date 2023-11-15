import { CDKK, cdkkApp } from '../../cdkk.mjs';
import { HangmanGame } from '../hangman_game.mjs'
import { HangmanUI } from './hangman_ui.mjs'

// async function hangmanWords() {
//     let response = await fetch('../hangman_words.txt');
//     let words = response.text().split('\r\n');
//     return words;
// }

let game = new HangmanGame({ cfgWords: '../hangman_words.txt' });
let ui = new HangmanUI();
cdkkApp.app = new cdkkApp({ game: game, ui: ui, autoInit: true, autoStart: true });
