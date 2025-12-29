class BaseState {
    #info;
    #context;
    
    constructor(context) {
        this.#context = context;
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('BaseState');
        this.#info("constructor()");
        if (!context) {
            throw new Error("Context is not set!");
        }
    }

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
