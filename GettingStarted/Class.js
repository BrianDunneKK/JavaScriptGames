class Stopwatch {
    #running = false;      // True if the stopwatch is running
    #startTime = null;     // Time when the stopwatch started
    #lapStart = null;      // Time when the current lap started
    #durationAtPause = 0;  // Elapsed msecs when the stopwatch is paused
    #lapAtPause = 0;       // Elapsed laptime when the stopwatch is paused

    constructor(autoStart = false) {
        this.reset();
        if (autoStart) {
            this.start()
        }
    }
    get isRunning() {
        return (this.#running);
    }
    get elapsed_msecs() {
        if (this.#running) {
            return (Stopwatch.now() - this.#startTime);
        } else {
            return this.#durationAtPause;
        }
    }
    get lap_msecs() {
        if (!this.#startTime) {     // Hasn't started
            return 0;
        } else {
            if (!this.#lapStart) {  // First lap
                return this.elapsed_msecs;
            } else {
                return (Stopwatch.now() - this.#lapStart);
            }
        }
    }
    start() {
        if (!this.#running) {
            this.#startTime = Stopwatch.now() - this.#durationAtPause;
            this.#lapStart = Stopwatch.now() - this.#lapAtPause;
            this.#running = true;
            return true;
        }
        return false;
    }
    pause() {
        if (this.#running) {
            this.#durationAtPause = this.elapsed_msecs;
            this.#lapAtPause = this.lap_msecs;
            this.#running = false;
            return true;
        }
        return false;
    }
    lap() {
        let ret_msecs = this.lap_msecs;
        if (this.#startTime) {
            if (!this.#lapStart) {  // First lap
                this.#lapStart = this.#startTime;
            }
            ret_msecs = this.lap_msecs;
            this.#lapStart = Stopwatch.now();
        }
        return ret_msecs;
    }
    reset() {
        this.#running = false;
        this.#startTime = null;
        this.#lapStart = null;
        this.#durationAtPause = 0;
        this.#lapAtPause = 0;
    }
    static now() {
        return (new Date().getTime());
    }
    static pad(x = 0, zeros = 2) {
        return x.toString().padStart(zeros, '0')
    }
    static msecs_text(elapsedTime) {
        let msecs = Stopwatch.pad(elapsedTime % 1000, 3);
        let secs = Stopwatch.pad(Math.floor(elapsedTime / 1000) % 60);
        let mins = Stopwatch.pad(Math.floor(elapsedTime / 1000 / 60) % 60);
        let hrs = Stopwatch.pad(Math.floor(elapsedTime / 1000 / 60 / 60));
        let str = `${hrs}:${mins}:${secs}.${msecs}`;
        return str;
    }
}

// ----------------------------------------

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testStopwatch() {
    console.log("Sw1: Auto-start ");
    console.log("Sleep for 0.5 secs ...");
    const sw1 = new Stopwatch(true);
    await sleep(500);
    console.log(`Sw1 = ${sw1.elapsed_msecs / 1000} secs = ${Stopwatch.msecs_text(sw1.elapsed_msecs)}`);

    console.log("Sleep for 1.2 secs ...")
    await sleep(1200);

    let lap_time = sw1.lap();
    console.log(`Sw1: First lap ... Lap time = ${lap_time / 1000} secs = ${Stopwatch.msecs_text(lap_time)}`);
    console.log("Sleep for 0.3 secs ...");
    await sleep(300);
    console.log(`Sw1: Elapsed = ${sw1.elapsed_msecs / 1000} secs, Lap = ${sw1.lap_msecs / 1000} secs`);

    lap_time = sw1.lap();
    console.log(`Sw1: Second lap ... Lap time = ${lap_time / 1000} secs`);
    console.log("Sleep for 0.5 secs ...");
    await sleep(500);
    console.log(`Sw1: Elapsed = ${sw1.elapsed_msecs / 1000} secs, Lap = ${sw1.lap_msecs / 1000} secs`);

    console.log(`Sw1: Third lap ... Lap time = ${sw1.lap() / 1000} secs`);

    // ----------

    const sw2 = new Stopwatch();
    console.log("Sw2: Manual start")

    console.log("Sleep for 1 secs ...")
    await sleep(1000);
    console.log(`SW2 = ${sw2.elapsed_msecs / 1000} secs`);

    console.log("SW2: Start. Sleep for 1 sec ...")
    sw2.start()
    await sleep(1000);
    console.log(`SW2 = ${sw2.elapsed_msecs / 1000} secs`);

    console.log("SW2: Reset. Start. Sleep for 0.5 sec ...")
    sw2.reset()
    sw2.start()
    await sleep(500);
    console.log(`SW2 = ${sw2.elapsed_msecs / 1000} secs`);

    // Stopewatch sw1 is still running
    console.log(`Sw1: Elapsed = ${sw1.elapsed_msecs / 1000} secs, Lap = ${sw1.lap_msecs / 1000} secs`);
}
testStopwatch()
