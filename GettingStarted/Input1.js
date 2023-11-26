import * as readline from 'node:readline/promises';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const answer = await rl.question('What do you think of Node.js? ');
console.log(`Thank you for your valuable feedback: ${answer}`);
console.error("This is an error message");
rl.close();
