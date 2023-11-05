import { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkGameManager } from '../cdkk.js';

class HangmanGame extends cdkkGame {
    #secretWord = "";  // Word the player is trying to guess
    #guessWord = "";   // Word pattern based o nguesses so far
    #guessMisses = 0;  // Number of incorrect guesses
    #allWords = [];    // List of all words to use

    get view() {
        return ({
            guess: this.#guessWord
            , misses: this.#guessMisses
            , status: this.gameStatus
            , hangman: hangman_txt[this.#guessMisses]
        })
    }
    init() {
        fetch('./hangman_words.txt')
            .then(response => response.text())
            .then((data) => {
                this.#allWords = data.split('\r\n');
                this.initComplete();
            })
    }
    prepare() {
        // Per Game preparatipon (initialisation)
        this.#guessMisses = 0;
        // this.#secretWord = "javascript";
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