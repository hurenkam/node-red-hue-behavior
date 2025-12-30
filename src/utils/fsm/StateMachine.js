class StateMachine {
    #info;
    #current_state;

    constructor(initial_state) {
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('StateMachine');
        this.#info("constructor()");
        if (!initial_state) {
            throw new Error("constructor(): Initial state is not set!");
        }
        this.#current_state = initial_state;
        initial_state.enter();
    }

    #change_state(state) {
        var instance = this;
        if (!state) {
            throw new Error("change_state(): State is not set!");
        }
        if (this.#current_state != state) {
            this.#info("change_state()  from:",this.#current_state,"to:",state);
            this.#current_state.exit();
            instance.#current_state = state;
            this.#current_state.enter();
        }
    }

    transition(event) {
        var instance = this;
        var state = this.#current_state;
        instance.#info("transition(",event,")");
        if (!state) {
            throw new Error("transition(): State is not set!");
        }
        instance.#change_state(state.transition(event));
    }

    destructor() {
        this.#current_state.exit();
    }
};

module.exports = StateMachine;
