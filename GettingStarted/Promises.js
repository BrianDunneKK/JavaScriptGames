function sayHello(name) {
    console.log("Hello " + name + "!!");
}
sayHello("Tom");

//setTimeout(sayHello, 2000, "Jerry");


function promiseTimeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

function promiseTimeoutFails(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(reject, ms);
    })
}

promiseTimeout(3000)
    .then(() => {
        console.log("Success!");
        return promiseTimeout(500);
    })
    .then(() => {
        console.log("Also a success!!");
        return Promise.resolve(123)
    })
    .then((result) => {
        console.log(`Finally the answer ... ${result}`);
    })
    .catch(() => {
        console.log("Failure!")
    })

promiseTimeoutFails(2000)
    .then(() => {
        console.log("Success!")
    })
    .catch(() => {
        console.log("Failure!")
    })


sayHello("to a 2 sec wait for failure and a 3 sec wait for success ...");
