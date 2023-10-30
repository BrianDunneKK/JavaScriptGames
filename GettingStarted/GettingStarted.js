const greeting = "Hello";
console.log('%s world 🌍', greeting);
console.log(`${greeting} again world 🌍`);  // Template literal
console.log("Final " + greeting + ' to the world 🌍');

var x = 1;   // Function scope, mutable ... unnecessary
let y = 2;   // Block scope, mutable
const z = 3; // Block scope, immutable

console.log(`y = ${y}`);
console.log(`typeof(y) = ${typeof(y)}`);
console.log(`typeof(y+"1") = ${typeof(y+"1")}`);
console.log(`typeof(y+"1") = ${typeof(y+"1")}`);
console.log(`y instanceof number = ${y instanceof Number}`);
console.log(`(y+"1") instanceof String = ${(y+"1") instanceof String}`);
console.log(`y=="2" = ${y=="2"}`);      // Test equality after type conversion
console.log(`y==="2" = ${y==="2"}`);    // Test equality of value and type ... Use this one
console.log(`y!="2" = ${y!="2"}`);      // Test inequality ignoring types
console.log(`y!=="2" = ${y!=="2"}`);    // Test inequality of value and type ... Use this one


let yN = new Number(2);
let yS = new String(2);
console.log(`yS instanceof String = ${yS instanceof String}`);
console.log(`yN instanceof Number = ${yN instanceof Number}`);

const ninjas = ["Alan", "Bernie", "Colm", "Deirdre"];
console.log(`typeof(ninjas) = ${typeof(ninjas)}`);
console.log(`ninjas instanceof Array = ${ninjas instanceof Array}`);

const project = {
    title: "Pacman"
    ,type: "Game"
    ,language: "Python"
}
console.log(`typeof(project) = ${typeof(project)}`);
console.log(`project instanceof Object = ${project instanceof Object}`);

let side1 = 3;
let side2 = 4;
console.log(`Side3 = ${Math.sqrt(side1*side1 + side2*side2)}`);
++side1;
++side2;
console.log(`Side3 = ${Math.sqrt(side1*side1 + side2*side2)}`);

const num = "5.67";
const iStr = parseInt(num);
const fStr = parseFloat(num);
console.log(`iStr=${iStr}, fStr=${fStr}, iStr.toString()=${iStr.toString()}`);

const arr1 = [5, "five", false];
console.log(`arr1=${arr1}, arr1[0]=${arr1[0]}, arr1.length=${arr1.length}`);
