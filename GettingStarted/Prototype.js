const personPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}, aged ${this.age}!`);
  },
  age: 12
};

function Person(name, age) {
  this.name = name;
  this.age = age
}

Object.assign(Person.prototype, personPrototype);


const reuben = new Person("Reuben", 10);
reuben.greet();

const joe = new Person("Joe", 20);
joe.greet();

reuben.greet();


function Person2(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}

Person2.prototype.nationality = "English";

const jim = new Person2("Jim", "Kelly", 10, "blue");

var x = new Date();
console.log(x);
