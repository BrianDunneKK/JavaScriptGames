let num_sw = document.querySelectorAll('.clsSWFrame').length;  // Number of stopwatches
let elemSWStartPause = document.querySelectorAll('.clsSWStartPause');
let elemSWLap = document.querySelectorAll('.clsSWLap');
let elemSWReset = document.querySelectorAll('.clsSWReset');
let elemSWDisplay = document.querySelectorAll('.clsSWDisplay');
let elemSWLaps = document.querySelectorAll('div.clsSWLaps');

let sw = [];
let uiUpdateInterval = [];
for (let i = 0; i < num_sw; i++) {
    sw.push(new Stopwatch());
    uiUpdateInterval.push(null);
    uiInitListeners(i);
    uiReset(i);
}

function uiInitListeners(sw_num) {
    elemSWStartPause[sw_num].addEventListener('click', function (event) { uiStartPause(sw_num); });
    elemSWLap[sw_num].addEventListener('click', function (event) { uiLap(sw_num); });
    elemSWReset[sw_num].addEventListener('click', function (event) { uiReset(sw_num); });
}

function uiStartPause(sw_num) {
    if (!sw[sw_num].isRunning) {
        sw[sw_num].start();
        elemSWStartPause[sw_num].innerHTML = "Pause";
        elemSWStartPause[sw_num].classList.add('clsSWButtonRed');
        elemSWReset[sw_num].disabled = false;
        elemSWLap[sw_num].disabled = false;
        uiUpdateInterval[sw_num] = setInterval(uiDisplay, 57, sw_num); // update every 57 msecs
    } else {
        sw[sw_num].pause();
        elemSWStartPause[sw_num].innerHTML = "Start";
        elemSWStartPause[sw_num].classList.remove('clsSWButtonRed');
        elemSWLap[sw_num].disabled = true;
        clearInterval(uiUpdateInterval[sw_num]);
        uiUpdateInterval[sw_num] = null;
    }
}

function uiReset(sw_num) {
    sw[sw_num].reset()
    uiDisplay(sw_num);
    elemSWStartPause[sw_num].innerHTML = "Start";
    elemSWStartPause[sw_num].classList.remove('clsSWButtonRed');
    elemSWLap[sw_num].disabled = true;
    elemSWReset[sw_num].disabled = true;
    elemSWLaps[sw_num].innerHTML = "";
}

function uiDisplay(sw_num) {
    elemSWDisplay[sw_num].innerHTML = Stopwatch.msecs_text(sw[sw_num].elapsed_msecs);
}

function uiLap(sw_num) {
    let lap_time = sw[sw_num].lap();
    elemSWLaps[sw_num].insertAdjacentHTML('beforeend', `<p>${Stopwatch.msecs_text(lap_time)}</p>`);
}
