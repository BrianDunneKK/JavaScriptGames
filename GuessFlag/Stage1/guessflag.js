let flags = new Array();
let offset = 0;
let correctFlag;
let score = 0;

let elemFlag0 = document.getElementById('idFlag0');
let elemFlag1 = document.getElementById('idFlag1');
let elemFlag2 = document.getElementById('idFlag2');
let elemResult = document.getElementById('idResult');
let elemScore = document.getElementById('idScore');

function displayFlags() {
    elemFlag0.src = `../flags/${flags[offset + 0].code}.svg`;
    elemFlag1.src = `../flags/${flags[offset + 1].code}.svg`;
    elemFlag2.src = `../flags/${flags[offset + 2].code}.svg`;
    correctFlag = Math.floor(Math.random() * 3); // 0, 1 or 2
    document.getElementById('idCountry').innerHTML = flags[offset + correctFlag].country;
    offset += 3;
}

// Runs asynchronously
fetch("../flags/countries.json")
    .then(response => response.json())
    .then(json => {
        jsonFlags = json;
        for (const country in json) {
            flags.push({ code: country, country: jsonFlags[country] });
        }
        shuffle(flags);
        displayFlags();
    });

elemFlag0.addEventListener('click', function () { guessFlag(0); });
elemFlag1.addEventListener('click', function () { guessFlag(1); });
elemFlag2.addEventListener('click', function () { guessFlag(2); });

document.getElementById("idNextFlags").addEventListener('click', function () {
    displayFlags();
    elemResult.innerHTML = "";
});

function guessFlag(flagNum) {
    if (flagNum == correctFlag) {
        elemResult.innerHTML = "Correct";
        score++;
    } else {
        elemResult.innerHTML = "Incorrect";
    }
    elemScore.innerHTML = `Score = ${score}`;
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}