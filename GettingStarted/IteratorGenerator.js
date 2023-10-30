function rangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
        next() {
            let result;
            if (nextIndex < end) {
                result = { value: nextIndex, done: false };
                nextIndex += step;
                iterationCount++;
                return result;
            }
            return { value: iterationCount, done: true };
        },
    };
    return rangeIterator;
}


const it1 = rangeIterator(1, 10, 2);
let result1 = it1.next();
while (!result1.done) {
    console.log(result1.value); // 1 3 5 7 9
    result1 = it1.next();
}
console.log("Iterated over sequence of size:", result1.value); // [5 numbers returned, that took interval in between: 0 to 10]

// ----------------------------------------

function* rangeGenerator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}

const it2 = rangeGenerator(1, 10, 2);
let result2 = it2.next();
while (!result2.done) {
    console.log(result2.value); // 1 3 5 7 9
    result2 = it2.next();
}
console.log("Iterated over sequence of size:", result2.value);

let result3 = [...rangeGenerator(1, 10, 2)];
console.log("Using spread operator");
console.log(result3);

// ----------------------------------------

function* fibonacci() {
    let current = 0;
    let next = 1;
    while (true) {
        const reset = yield current;
        [current, next] = [next, next + current];
        if (reset) {
            current = 0;
            next = 1;
        }
    }
}

console.log("Fibonacci sequence 1");
const fibSeq = fibonacci();
for (let i = 0; i < 10; i++) {
    console.log(fibSeq.next().value);
}

console.log("Fibonacci sequence 2");
console.log(fibSeq.next(true).value);
console.log(fibSeq.next().value);
console.log(fibSeq.next().value);
console.log(fibSeq.next().value);
