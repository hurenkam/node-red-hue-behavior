class StateMachine {
    #info;
    #current_state;

    constructor(initial_state) {
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('StateMachine');
        this.#info("constructor()");
        if (!initial_state) {
            throw new Error("Initial state is not set!");
        }
        this.#current_state = initial_state;
        initial_state.enter();
    }

    #change_state(state) {
        var instance = this;
        instance.#info("transition() new state:",state);
        if (!state) {
            throw new Error("State is not set!");
        }
        this.#current_state.exit();
        instance.#current_state = state;
        this.#current_state.enter();
    }

    transition(context,event) {
        var instance = this;
        var state = this.#current_state;
        instance.#info("transition(",context,",",event,") current state:",state);
        if (!state) {
            throw new Error("State is not set!");
        }
        if (!context) {
            throw new Error("Context is not set!");
        }
        instance.#change_state(state.transition(context,event));
    }
};

module.exports = StateMachine;
