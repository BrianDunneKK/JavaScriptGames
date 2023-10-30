objPerson1 = {
    givenName: "Tom"
    ,familyName: "Hanks"
    ,sayHello: function() {
        console.log(`Hi, I'm ${this.givenName} ${this.familyName}!`)
    }
    ,whatIsThis: function() {
        return(this)
    }
};
objPerson1.sayHello();
objPerson1.givenName = "Tim";
objPerson1["familyName"] = "Honks";
objPerson1.sayHello();
console.log(objPerson1.whatIsThis())

function whatIsThis1() {
    return this
}
const whatIsThis2 = () => {
    return this
}
console.log("-- this -----")
console.log(this)
console.log("-- whatIsThis1 -----")
console.log(whatIsThis1)
console.log("-- whatIsThis2 -----")
console.log(whatIsThis2)
console.log("-- whatIsThis1() -----")
console.log(whatIsThis1())
console.log("-- whatIsThis2() -----")
console.log(whatIsThis2())
console.log("-- globalThis -----")
console.log(globalThis)

