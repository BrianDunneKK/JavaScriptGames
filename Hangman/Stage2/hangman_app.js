import { CDKK, cdkkApp } from '../../CDKK/cdkk.js';
import { HangmanGame } from '../hangman_game.js'
import { HangmanUI } from './hangman_ui.js'

let game = new HangmanGame({ cfgWords: '../hangman_words.txt' });
let ui = new HangmanUI();
cdkkApp.app = new cdkkApp({ game: game, ui: ui, autoInit: true, autoStart: true });
