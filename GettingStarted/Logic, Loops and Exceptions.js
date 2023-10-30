const val = 401;
let msg;
if (val === 200) {
    msg = "OK";
} else if (val > 200) {
    msg = "Error";
} else {
    msg = "Unknown error";
}
console.log("Status = " + msg);
const msg2 = (val == 200) ? "OK" : "Not OK";
console.log("Status2 = " + msg2);

switch (val) {
    case 200:
        msg = "OK";
        break;

    case 400:
    case 401:
        msg = "Error";
        break;
    
    default:
        msg = "Unknown error"
        break;
}
console.log("Status3 = " + msg);


try {
    console.log("About to throw an exception");
    throw "Exceptional!!";
    console.log("This never gets run");
}
catch(ex) {
    console.log(`I caught an exception and it was ... ${ex}`);
}
finally {
    console.log("That's it for now");
}

names = ["Adam", "Betty", "Colm"];
let i=0;
while (i < names.length) {
    console.log(`while: i=${i}, names[i]=${names[i]}`);
    i++;
}

for (let i=0; i < names.length; i++) {
    console.log(`for: i=${i}, names[i]=${names[i]}`);
}

for (const n of names) {   // Note const is preferable
    console.log(`for...of: name=${n}`);
}