let elemSWStartPause = document.querySelector('.clsSWStartPause');
let elemSWReset = document.querySelector('.clsSWReset');
let elemSWDisplay = document.querySelector('.clsSWDisplay');

sw = new Stopwatch();
elemSWStartPause.addEventListener('click', function (event) { uiStartPause(); });
elemSWReset.addEventListener('click', function (event) { uiReset(); });
uiReset();

function uiStartPause() {
    if (!sw.isRunning) {
        sw.start();
        uiUpdateInterval = setInterval(uiDisplay, 57); // update every 57 msecs
    } else {
        sw.pause();
        clearInterval(uiUpdateInterval);
        uiUpdateInterval = null;
    }
}

function uiReset() {
    sw.reset()
    uiDisplay();
}

function uiDisplay() {
    elemSWDisplay.innerHTML = Stopwatch.msecs_text(sw.elapsed_msecs);
}
