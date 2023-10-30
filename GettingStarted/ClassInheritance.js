// Note: Only run one testStopwatch function at a time. Comment out the other two.

class Stopwatch1 {
    startTime = null;
    running = false;

    constructor(autoStart = false) {
        this.reset();
        if (autoStart) {
            this.start()
        }
    }
    get timeNow() {
        return (new Date().getTime());
    }
    get elapsed_msecs() {
        if (this.running) {
            return (this.timeNow - this.startTime);
        } else {
            return 0;
        }
    }
    start() {
        if (!this.running) {
            this.startTime = this.timeNow;
            this.running = true;
            return true
        }
        return false;
    }
    reset() {
        this.startTime = null;
        this.running = false;
    }
    pad(x = 0, zeros = 2) {
        return x.toString().padStart(zeros, '0')
    }
    msecs_text(elapsedTime) {
        let msecs = this.pad(elapsedTime % 1000, 3);
        let secs = this.pad(Math.floor(elapsedTime / 1000) % 60);
        let mins = this.pad(Math.floor(elapsedTime / 1000 / 60) % 60);
        let hrs = this.pad(Math.floor(elapsedTime / 1000 / 60 / 60));
        let str = `${hrs}:${mins}:${secs}.${msecs}`;
        return str;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testStopwatch1() {
    const sw1A = new Stopwatch1();
    console.log("SW1A: Start now ...")
    sw1A.start();

    const sw1B = new Stopwatch1(true);
    console.log("SW1B: Auto-start now ...")

    console.log("Sleep for 1 secs ...")
    await sleep(1000);
    console.log(`SW1A = ${sw1A.elapsed_msecs / 1000} secs, SW1B = ${sw1B.elapsed_msecs / 1000} secs`);

    console.log("SW1A: Reset and start. Sleep for 1 sec ...")
    sw1A.reset();
    sw1A.start()
    await sleep(1000);
    console.log(`SW1A = ${sw1A.elapsed_msecs / 1000} secs, SW1B = ${sw1B.elapsed_msecs / 1000} secs`);
}
//testStopwatch1()

// ----------------------------------------

class Stopwatch2 extends Stopwatch1 {
    // Extends the Stopwatch1 class by adding a pause function

    durationAtPause = 0;  // Elapsed msecs when Pause is pressed

    start() {
        if (!this.running) {
            this.startTime = this.timeNow - this.durationAtPause;
            this.running = true;
            return true;
        }
        return false;
    }
    pause() {
        if (this.running) {
            this.durationAtPause = this.elapsed_msecs;
            this.running = false;
            return true;
        }
        return false;
    }
    reset() {
        super.reset()
        this.durationAtPause = 0;
    }
    get elapsed_msecs() {
        if (this.running) {
            return (this.timeNow - this.startTime);
        } else {
            return this.durationAtPause;
        }
    }
}

async function testStopwatch2() {
    console.log("SW2A: Auto-start and sleep for 1 secs ...")
    const sw2A = new Stopwatch2(true);
    await sleep(1000);
    console.log(`SW2A = ${sw2A.elapsed_msecs / 1000} secs`);

    console.log("Pause and sleep for 0.5 secs ...")
    sw2A.pause()
    await sleep(500);
    console.log(`SW2A = ${sw2A.elapsed_msecs / 1000} secs`);

    console.log("SW2A: Start and sleep for 0.7 secs ...")
    sw2A.start();
    await sleep(700);
    console.log(`SW2A = ${sw2A.elapsed_msecs / 1000} secs`);
}
//testStopwatch2()


// ----------------------------------------

class Stopwatch3 extends Stopwatch2 {
    // Extends the Stopwatch1 and Stopwatch2 class by adding a lap timer

    lapStart = null;
    lapAtPause = 0;       // Elapsed laptime when the stopwatch is paused

    start() {
        if (super.start()) {
            this.lapStart = this.timeNow - this.lapAtPause;
        }
    }
    pause() {
        if (super.pause()) {
            this.lapAtPause = this.lap_msecs;
        }
    }
    reset() {
        super.reset()
        this.lapStart = null;
    }
    lap() {
        let ret_msecs = this.lap_msecs;
        if (this.startTime) {
            if (!this.lapStart) {  // First lap
                this.lapStart = this.startTime;
            }
            ret_msecs = this.lap_msecs;
            this.lapStart = this.timeNow;
        }
        return ret_msecs;
    }
    get lap_msecs() {
        if (!this.startTime) {     // Hasn't started
            return 0;
        } else {
            if (!this.lapStart) {  // First lap
                return this.elapsed_msecs;
            } else {
                return (this.timeNow - this.lapStart);
            }
        }
    }

}

async function testStopwatch3() {
    console.log("SW3A: Auto-start ");
    console.log("Sleep for 0.5 secs ...");
    const sw3A = new Stopwatch3(true);
    await sleep(500);
    console.log(`SW3A = ${sw3A.elapsed_msecs / 1000} secs`);

    console.log("Sleep for 0.2 secs ...")
    await sleep(200);

    let lap_time = sw3A.lap();
    console.log(`SW3A: First lap ... Lap time = ${lap_time / 1000} secs`);
    console.log("Sleep for 0.3 secs ...");
    await sleep(300);
    console.log(`SW3A: Elapsed = ${sw3A.elapsed_msecs / 1000} secs, Lap = ${sw3A.lap_msecs / 1000} secs`);

    lap_time = sw3A.lap();
    console.log(`SW3A: Second lap ... Lap time = ${lap_time / 1000} secs`);
    console.log("Sleep for 0.5 secs ...");
    await sleep(500);
    console.log(`SW3A: Elapsed = ${sw3A.elapsed_msecs / 1000} secs, Lap = ${sw3A.lap_msecs / 1000} secs`);

    console.log(`SW3A: Third lap ... Lap time = ${sw3A.lap() / 1000} secs`);
}
testStopwatch3()
