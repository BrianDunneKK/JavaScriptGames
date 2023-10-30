const game1 = {
    title: "Pacman"
    ,type: "arcade"
    ,year: 1923
    ,rel_date: new Date(1923, 5, 1)
    ,is_free: false
}
const obj_game1 = new Object({title: "Pacman", type: "arcade", year: 1923, rel_date: new Date(1923, 5, 1), is_free: false})
json_game1 = JSON.stringify(game1)
console.log(`game1 = ${game1} = `);
console.log(game1);
console.log(`obj_game1 = ${obj_game1} = `);
console.log(obj_game1);
console.log(`json_game1 = ${json_game1}`);
console.log("----------");

const game2 = {
    title: "Mario Kart"
    ,type: "racing"
    ,year: 1945
    ,rel_date: new Date(1945, 11, 25)
    ,is_free: true
}
const games = [ game1, game2 ]
json_games = JSON.stringify(games)
console.log(`games = ${games}`);
console.log(`json_games = ${json_games}`);
console.log("----------");

const obj_games = [ new Object(game1), new Object(game2) ]
json_obj_games = JSON.stringify(games)
console.log(`obj_games = ${obj_games}`);
console.log(`json_obj_games = ${json_obj_games}`);
console.log("----------");

const json_book1 = `{"title":"Hamlet", "author":"Shakespeare", "play":true}`
const book1 = JSON.parse(json_book1)
console.log(`Book1 = ${book1}`)
console.log("----------");

const json_books = `[
    {"title":"Hamlet", "author":"Shakespeare", "play":true}
    ,{"title":"Dracula", "author":"Bram Stoker", "play":false}
    ]`
const books = JSON.parse(json_books)
console.log("Books =")
console.log(books[0])
console.log(books[1])
 