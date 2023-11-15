let secret = Math.floor(Math.random() * 10 + 1);
let numGuesses = 1;

let elemResult = document.getElementById("idResult");
let elemGuess = document.getElementById("idGuess");
let elemSubmitGuess = document.getElementById("idSubmitGuess");

elemSubmitGuess.addEventListener('click', uiSubmitGuess);

function uiSubmitGuess() {
    if (elemGuess.value == secret) {
        elemResult.innerHTML = `Congratulations ... You guess it right in ${numGuesses} guesses!`;
    }
    else if (elemGuess.value > secret) {
        numGuesses++;
        elemResult.innerHTML = "That's incorrect ... Try a smaller number.";
    }
    else {
        numGuesses++;
        elemResult.innerHTML = "That's incorrect ... Try a larger number.";
    }
}
