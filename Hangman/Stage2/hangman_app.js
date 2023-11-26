import { CDKK, cdkkApp } from '../../CDKK/cdkk.mjs';
import { HangmanGame } from '../hangman_game.mjs'
import { HangmanUI } from './hangman_ui.mjs'

let game = new HangmanGame({ cfgWords: '../hangman_words.txt' });
let ui = new HangmanUI();
cdkkApp.app = new cdkkApp({ game: game, ui: ui, autoInit: true, autoStart: true });
