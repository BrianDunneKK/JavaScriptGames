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
