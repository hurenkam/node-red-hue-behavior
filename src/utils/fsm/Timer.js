class Timer {
    #timer;
    #timeout;
    #callback;

    constructor(timeout,callback) {
        this.#timeout = timeout;
        this.#callback = callback;
    }

    start() {
        //this.#info("start_motion_timer())");
        this.cancel();
        this.#timer = setTimeout(() => {
            this.timeout();
        }, this.#timeout);
    }
    cancel() {
        //this.#info("clear_motion_timer())");
        if (this.#timer) {
            clearTimeout(this.#timer);
        }
    }
    timeout() {
        this.#callback()
    }
}

module.exports = Timer;