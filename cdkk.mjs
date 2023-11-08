class CDKK {
    static setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
}

class cdkkGameStatus {
    #inProgres = false;
    #gameOver = false;
    winner = null;
    reason = null;
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

    init() {
        // Once off initialisation
        this.initComplete();
    }
    prepare() {
        // Per Game preparatipon (initialisation)
        this.prepareComplete();
    }
    start() {
        // Start the game
        this.gameStatus.startGame();
    }
    play(input) {
        // Play the game = Take a turn = Act on user input
        this.update(input);
        this.updateStatus();
        return this.gameStatus.gameOver;
    }
    initComplete() {
        cdkkApp.dispatchEvent({ action: "init-complete" });
    }
    prepareComplete() {
        cdkkApp.dispatchEvent({ action: "prepare-complete" });
    }
}


class cdkkGameUI {
    init() {
        // Once off initialisation
    }
    prepare() {
        // Per Game preparatipon (initialisation)
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
        return input;
    }
    play(input) {
        // Play the game = Take a turn = Act on user input
        input = this.processInput(input);
        return cdkkApp.dispatchEvent({ action: "play", input: input });
    }

    static createSVGElement(name, attrs = []) {
        let svg_elem = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (const a in attrs) {
            svg_elem.setAttribute(a, attrs[a]);
        }
        return svg_elem
    }
}


class cdkkApp {
    game = null;
    ui = null;
    autoStart = false;
    static app = null;

    constructor({ game, ui, autoInit = false, autoStart = false } = {}) {
        this.game = game;
        this.ui = ui;
        this.autoStart = autoStart;
        if (autoInit) {
            this.init();
        }
    }
    init() {
        this.ui.init();
        this.game.init();
        this.cdkkAddEventListener();
    }
    prepare() {
        this.game.prepare();
        this.ui.prepare()
    }
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

