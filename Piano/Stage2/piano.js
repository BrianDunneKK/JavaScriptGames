// JavaScript for the Piano Game
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('mouseover', () => playSound(key));
});

function playSound(key) {
    const note = key.getAttribute('data-note');
    const audio = new Audio(`../Sounds/${note}.mp3`);
    audio.play();
}

document.addEventListener('keydown', function (event) {
    keys.forEach(key => {
        if (key.getAttribute('data-keyboard') === event.key) {
            playSound(key);
        }
    });
});