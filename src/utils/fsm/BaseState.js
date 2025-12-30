class BaseState {
    #log;
    #info;
    #context;
    
    constructor(log,context) {
        this.#log = log;
        this.#context = context;
        this.#info = log.extend('BaseState');
        this.#info("constructor()");
        if (!context) {
            throw new Error("Context is not set!");
        }
    }

    log() { return this.#log; }
    context() { return this.#context; }

    transition(event) {
        this.#info("transition()");
        return this;
    }

    enter() {
        this.#info("enter()");
    }

    exit() {
        this.#info("exit()");
    }
}

module.exports = BaseState;
