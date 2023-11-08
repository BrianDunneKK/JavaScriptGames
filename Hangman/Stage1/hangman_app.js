import { cdkkApp } from '../../cdkk.mjs';
import { HangmanGame } from './hangman_game.mjs'
import { HangmanUI } from './hangman_ui.mjs'

let game = new HangmanGame();
let ui = new HangmanUI();
cdkkApp.app = new cdkkApp({ game: game, ui: ui, autoStart: true });
cdkkApp.app.init();
cdkkApp.app.playKeystrokes();