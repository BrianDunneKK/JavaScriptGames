// JavaScript for the Piano Game

let synth = new Tone.Synth().toDestination();

document.getElementById("idSynth1").addEventListener('click', () => synth = new Tone.Synth().toDestination());
document.getElementById("idSynth2").addEventListener('click', () => synth = new Tone.AMSynth().toDestination());
document.getElementById("idSynth3").addEventListener('click', () => synth = new Tone.FMSynth().toDestination());
document.getElementById("idSynth4").addEventListener('click', () => synth = new Tone.DuoSynth().toDestination());

const keys = document.querySelectorAll('.key');
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

