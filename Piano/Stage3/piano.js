// JavaScript for the Piano Game
const keys = document.querySelectorAll('.key');
const synth = new Tone.Synth().toDestination();

keys.forEach(key => {
    key.addEventListener('click', () => playSound(key));
});

function playSound(key) {
    let note = key.getAttribute('data-note');
    synth.triggerAttackRelease(note, "4n");
}

document.addEventListener('keydown', function (event) {
    keys.forEach(key => {
        if (key.getAttribute('data-keyboard') === event.key) {
            playSound(key);
        }
    });
});

