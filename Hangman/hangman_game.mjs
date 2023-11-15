// To Do: Replace hangman_txt.length for web game
// To Do: Make init() and processInput() in cosole game configurable ... create cdkkGameCUI in cdkk_node

import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp } from '../cdkk.mjs';

class HangmanGame extends cdkkGame {
    #cfgWords;
    #secretWord = "";      // Word the player is trying to guess
    #guessWord = "";       // Word pattern based on guesses so far
    #guessMisses = 0;      // Number of incorrect guesses
    #guessedLetters = "";  // Letters guessed so far
    #allWords = [];        // List of all words to use

    constructor({ cfgWords }) {
        super();
        this.#cfgWords = cfgWords;
    }

    get view() {
        return ({
            guess: this.#guessWord
            , misses: this.#guessMisses
            , guessed: this.#guessedLetters
            , status: this.gameStatus
            , hangman: hangman_txt[this.#guessMisses]
        })
    }
    init() {
        if (typeof (this.#cfgWords) === 'function') {
            this.#allWords = this.#cfgWords();
            this.initComplete({ init_ok: (this.#allWords.length > 0) });
        } else {
            fetch(this.#cfgWords)
                .then(response => response.text())
                .then((data) => {
                    this.#allWords = data.split('\r\n');
                    this.initComplete();
                });
        }
    }
    prepare() {
        // Per Game preparation (initialisation)
        this.#guessMisses = 0;
        this.#guessedLetters = "";
        this.#secretWord = this.#allWords[Math.floor(Math.random() * this.#allWords.length)];
        console.log(this.#secretWord);
        this.#guessWord = "_".repeat(this.#secretWord.length);
        this.prepareComplete();
    }
    update(input = null) {
        if (input) {
            let miss = 1;
            for (let i = 0; i < this.#secretWord.length; i++) {
                if (input === this.#secretWord[i]) {
                    this.#guessWord = CDKK.setCharAt(this.#guessWord, i, this.#secretWord[i]);
                    miss = 0;
                }
            }
            this.#guessMisses += miss;
            if (!this.#guessedLetters.match(input)) {
                this.#guessedLetters = this.#guessedLetters + input;
            }
        }
    }
    updateStatus() {
        if (this.#guessWord === this.#secretWord) {
            this.gameStatus.endGameWin();
        } else if (this.#guessMisses >= (hangman_txt.length - 1)) {
            this.gameStatus.endGameLose("Too many guesses");
        }
    }
}
let hangman_txt = [`
   _________
    |/        
    |              
    |                
    |                 
    |               
    |                   
    ========`, `
   _________
    |/   |      
    |              
    |                
    |                 
    |               
    |                   
    ========`, `
   _________       
    |/   |              
    |   (_)
    |                         
    |                       
    |                         
    |                          
    ========`, `
   ________               
    |/   |                   
    |   (_)                  
    |    |                     
    |    |                    
    |                           
    |                            
    ========`, `
   _________             
    |/   |               
    |   (_)                   
    |   /|                     
    |    |                    
    |                        
    |                          
    ========`, `
   _________              
    |/   |                     
    |   (_)                     
    |   /|\\                    
    |    |                       
    |                             
    |                            
    ========`, `
   ________                   
    |/   |                         
    |   (_)                      
    |   /|\\                             
    |    |                          
    |   /                            
    |                                  
    ========`, `
   ________
    |/   |     
    |   (_)    
    |   /|\\           
    |    |        
    |   / \\        
    |               
    ========`];

export { HangmanGame };