import * as readline from 'node:readline/promises';

console.log("Guess the Number - Stage 0");
console.log("We have selected a random number between 1 - 10. See if you can guess it.");
let game_on = true;
let secret = Math.floor(Math.random() * 10 + 1);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

while (game_on) {
  const answer = await rl.question('> ');
  const result = guess(answer);
  console.log(result[1]);
  game_on = result[0];
}

rl.close();

function guess(num) {
  let result = null;
  if (num == secret) {
    result = [false, `Congratulations ... You guess it right!`];
  }
  else if (num > secret) {
    result = [true, "That's incorrect ... Try a smaller number."];
  }
  else {
    result = [true, "That's incorrect ... Try a larger number."];
  }
  return result;
}