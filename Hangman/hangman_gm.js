import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkGameManager } from '../cdkk.js';
import { HangmanGame } from './hangman_game.js'
import { HangmanUI } from './hangman_ui.js'

let game = new HangmanGame();
let ui = new HangmanUI();
let gm = new cdkkGameManager(game, ui, true);
