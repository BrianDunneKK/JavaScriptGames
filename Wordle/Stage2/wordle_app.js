import { CDKK, cdkkApp } from '../../CDKK/cdkk.js';
import { WordleGame } from './wordle_game.js'
import { WordleUI } from './wordle_ui.js'

let game = new WordleGame({ cfgPickWords: '../words_wordle.txt', cfgAllWords: '../words_5letters.txt' });
let ui = new WordleUI();
cdkkApp.app = new cdkkApp({ game: game, ui: ui, autoInit: true, autoStart: true });
