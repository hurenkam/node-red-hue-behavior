class BaseState {
    #info;
    
    constructor(context) {
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('BaseState');
        this.#info("constructor() context: "+context);
        if (!context) {
            throw new Error("Context is not set!");
        }
    }

    name() { return "BaseState"; }

    transition(context,event) {
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
