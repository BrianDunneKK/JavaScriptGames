const now = new Date();
console.log(`now = ${now}`)

const ny = new Date(2023, 0, 1)  // Jan = 0
console.log(`ny = ${ny}`)

const xmas = new Date()
xmas.setFullYear(2023)
xmas.setMonth(11)
xmas.setDate(25)
xmas.setHours(14)
xmas.setMinutes(41)
xmas.setSeconds(22)
console.log(`xmas = ${xmas}`)
console.log(`xmas (msecs) = ${xmas.getTime()}`)
console.log(`xmas (DOW) = ${xmas.getDay()}`)  // Sunday = 0
