class BaseState {
    #info;
    _context;
    
    constructor(context) {
        this._context = context;
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('BaseState');
        this.#info("constructor()");
        if (!context) {
            throw new Error("Context is not set!");
        }
    }

    name() { return "BaseState"; }

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
