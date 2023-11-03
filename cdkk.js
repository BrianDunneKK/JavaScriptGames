function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

class GameStatus {
    inProgres = false;
    gameOver = false;
    winner = null;
    reason = null;
    get win() {
        return (!this.inProgres && this.gameOver && this.winner > 0);
    }
    get lose() {
        return (!this.inProgres && this.gameOver && this.winner < 0);
    }
    get draw() {
        return (!this.inProgres && this.gameOver && this.winner == 0);
    }
    startGame() {
        this.inProgres = true;
        this.gameOver = false;
        this.winner = null;
        this.reason = null;
    }
    endGame(winner, reason = "") {
        this.inProgres = false;
        this.gameOver = true;
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


class cdkkGGame {
    gameStatus = new GameStatus();

    init() {
        // Once off initialisation
    }
    prepare() {
        // Per Game preparatipon (initialisation)
    }
    start() {
        // Start the game
        this.gameStatus.startGame();
    }
    play(input) {
        // Play the game = Take a turn = Act on user input
        this.update(input);
        this.updateStatus();
    }
}


class cdkkUI {
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
        const ev = new CustomEvent("game", { detail: { action: "play", input: input } });
        document.dispatchEvent(ev);
    }

}


class GameManager {
    game = null;
    ui = null;

    constructor(game, ui, autostart = true) {
        this.game = game;
        this.ui = ui;
        this.init();
        this.prepare();
        if (autostart) {
            this.start();
        }
    }
    init() {
        this.ui.init();
        this.game.init();
        document.addEventListener("game", ev => this.event(ev));
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
        if (ev.detail.action === "play") {
            this.game.play(ev.detail.input);
            this.game.updateStatus();
            this.ui.displayGame(this.game.view);
        } else if (ev.detail.action === "restart") {
            this.prepare()
            this.start();
        }

    }
}
