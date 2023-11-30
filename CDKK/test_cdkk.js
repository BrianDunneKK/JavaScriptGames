import { CDKK } from './cdkk.js';
import { cdkkNode } from './cdkk_node.js'

if (CDKK.ìsBrowser) {
    console.log("Browser");
} else {
    console.log("Not a Browser");
}
if (CDKK.isNode) {
    console.log("Node");
} else {
    console.log("Not node");
}

if (CDKK.isNode) {
    let ret1 = cdkkNode.readFileSync('Wordle/Wordle_words.txt');
    if (ret1.contents !== null) {
        console.log("1.Contents OK");
    }
    if (ret1.err !== null) {
        console.log("1.Error reading file: " + ret1.err.message);
    }
    let ret2 = cdkkNode.readFileSync('Wordle/Wordle_words2.txt');
    if (ret2.contents !== null) {
        console.log("2.Contents OK");
    }
    if (ret2.err !== null) {
        console.log("2.Error reading file: " + ret2.err.message);
    }
}
