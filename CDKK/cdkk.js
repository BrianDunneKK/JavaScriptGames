/**
 * CoderDojo Kilkenny game and utility module
 * @module cdkk
 */

class CDKK {
    static setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
    static get isBrowser() {
        return (typeof (window) === 'object' && '[object Window]' === window.toString.call(window));
        try { return this === window; }
        catch (e) { return false; }
    }
    static get isNode() {
        return (typeof (global) === 'object' && '[object global]' === global.toString.call(global));
        try { return this === global; }
        catch (e) { return false; }
    }
}

/**
 * Class representing the status of a game
 */
class cdkkGameStatus {
    #inProgres = false;
    #gameOver = false;
    winner = null;
    reason = null;
    updated = false;

    get gameOver() {
        return (!this.#inProgres && this.#gameOver);
    }
    get win() {
        return (!this.#inProgres && this.#gameOver && this.winner > 0);
    }
    get lose() {
        return (!this.#inProgres && this.#gameOver && this.winner < 0);
    }
    get draw() {
        return (!this.#inProgres && this.#gameOver && this.winner == 0);
    }
    startGame() {
        this.#inProgres = true;
        this.#gameOver = false;
        this.winner = null;
        this.reason = null;
    }
    endGame(winner, reason = "") {
        this.#inProgres = false;
        this.#gameOver = true;
        this.winner = winner;
        this.reason = reason;
    }
    endGameWin(winner = 1, reason = "") {
        this.endGame(winner, reason);
    }
    endGameLose(reason = "") {
        this.endGame(-1, reason);
    }
    endGameDraw(reason = "") {
        this.endGame(0, reason);
    }
}


class cdkkGame {
    gameStatus = new cdkkGameStatus();

    get view() {
        return ({
            status: this.gameStatus
        })
    }
    init() {
        // Once off initialisation
        this.initComplete();
    }
    prepare() {
        // Per Game preparation (initialisation)
        this.prepareComplete();
    }
    start() {
        // Start the game
        this.gameStatus.startGame();
    }

    /**
     * Play the game = Take a turn = Act on user input
     * @param {any} input User input = Player's current move
     * @returns {boolean} True if the game is over
     */
    play(input) {
        const updated = this.update(input);
        this.updateStatus(updated);
        return this.gameStatus.gameOver;
    }

    /**
     * Update the game based in this input
     * @param {any} input User input = Player's current move
     * @returns {boolean} True if the game was updated
     */
    update(input) {
        return true;
    }

    /**
     * Update the game status
     * @param {boolean} updated True if the game was updated
     */
    updateStatus(updated) {
        this.gameStatus.updated = updated;
    }

    initComplete({ init_ok = true, err = null } = {}) {
        if (init_ok) {
            cdkkApp.dispatchEvent({ action: "init-complete" });
        } else {
            console.error(`${err.name}: ${err.message}`);
            exit();
        }
    }
    prepareComplete({ prep_ok = true, err = null } = {}) {
        if (prep_ok) {
            cdkkApp.dispatchEvent({ action: "prepare-complete" });
        } else {
            console.error(`${err.name}: ${err.message}`);
            exit();
        }
    }
}


/**
 * Class representing a game user interface
 */
class cdkkGameUI {
    /** @member {toLower} - If true, convert all input to lower case */
    toLower = false;

    /** @member {toUpper} - If true, convert all input to upper case */
    toUpper = false;

    /** @member {toWord} - If true, buffer individual keystrokes and only play when Enter is pressed */
    toWord = false;

    /** @member {toWord} - If true, add an event listener to process/play keyboard input */
    playKeys = false;

    _currentWord = '';
    _currentKey = '';

    constructor({ toLower = false, toUpper = false, toWord = false, playKeys = false } = {}) {
        this.toLower = toLower;
        this.toUpper = toUpper;
        this.toWord = toWord;
        this.playKeys = playKeys;
    }

    init() {
        // Once off initialisation
        if (this.playKeys) {
            document.addEventListener('keypress', (event) => {
                this.play(event.key);
            }, false);
        }
    }

    prepare() {
        // Per Game preparation (initialisation)
        this._currentWord = '';
        this._currentKey = '';

    }

    start(gameView) {
        // Display the game at the start
        this.displayGame(gameView)
    }

    displayGame(gameView) {
        // Display the game based on the view provided
    }

    processInput(input) {
        // Process input before passing to game
        let ret_input = input;
        if (this.toLower) {
            ret_input = ret_input.toLowerCase();
        }
        if (this.toUpper) {
            ret_input = ret_input.toUpperCase();
        }
        if (this.toWord) {
            if (ret_input.toUpperCase() == "ENTER") {
                ret_input = this._currentWord;
                this._currentWord = '';
                this._currentKey = '';
            } else {
                this._currentWord = this._currentWord + ret_input;
                this._currentKey = ret_input;
                ret_input = '';
            }
            // To Do
        }
        return ret_input;
    }

    play(input) {
        // Play the game = Take a turn = Act on user input
        input = this.processInput(input);
        if (input === '') {
            return cdkkApp.dispatchEvent({ action: "display" });
        } else {
            return cdkkApp.dispatchEvent({ action: "play", input: input });
        }
    }

    static createSVGElement(name, attrs = []) {
        let svg_elem = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (const a in attrs) {
            svg_elem.setAttribute(a, attrs[a]);
        }
        return svg_elem
    }
}

/**
 * Class representing a game application
 */
class cdkkApp {
    /** @member {cdkkGame} - Game model object */
    game = null;

    /** @member {cdkkGameUI} - Game user interface */
    ui = null;

    /** @member {boolean} - Automatic initialisation */
    autoStart = false;

    /** @member {cdkkApp} - Game application singleton */
    static app = null;

    /**
     * Create a game application
     * @param {cdkkGame} game - Game model object implementing all the game logic
     * @param {cdkkGameUI} ui - User interface for the game
     * @param {boolean} autoInit - Automatic initialise the game if true
     * @param {boolean} autoStart - Automatically start the game if true
     */
    constructor({ game, ui, autoInit = false, autoStart = false } = {}) {
        this.game = game;
        this.ui = ui;
        this.autoStart = autoStart;
        if (autoInit) {
            this.init();
        }
    }

    /**
     * Once off initialisation of the game
     */
    init() {
        this.cdkkAddEventListener();
        this.ui.init();
        this.game.init();
    }

    /**
     * Per game preparation (initialisation). Get ready to start.
     */
    prepare() {
        this.game.prepare();
        this.ui.prepare()
    }

    /**
     * Start the game
     */
    start() {
        this.game.start();
        this.ui.start(this.game.view)
    }
    event(ev) {
        let ret = null;
        switch (ev.detail.action) {
            case "init-complete":
                this.prepare();
                break;

            case "prepare-complete":
                if (this.autoStart) {
                    this.start();
                }
                break;

            case "display":
                this.ui.displayGame(this.game.view);
                break;

            case "play":
                ret = this.game.play(ev.detail.input);
                this.ui.displayGame(this.game.view);
                break;

            case "restart":
                this.autoStart = true;
                this.prepare();
                break;
        }
        return ret;
    }
    cdkkAddEventListener() {
        if (typeof document !== 'undefined') {
            document.addEventListener("game", ev => this.event(ev));
        }
    }

    static dispatchEvent(detail) {
        let ret = null;
        const evt = new CustomEvent("game", { detail: detail });
        if (typeof document !== 'undefined') {
            document.dispatchEvent(evt);
        } else if (cdkkApp.app !== null) {
            ret = cdkkApp.app.event(evt);
        }
        return ret;
    }

    playKeystrokes() {
        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit();
            } else {
                if (this.ui.play(str)) {
                    process.exit();
                };
            }
        });
    }
}


export { CDKK, cdkkGameStatus, cdkkGame, cdkkGameUI, cdkkApp };

