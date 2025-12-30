class StateMachine {
    #log;
    #current_state;

    constructor(log,initial_state) {
        this.#log = log.extend('StateMachine');
        this.#log("constructor()");
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
            this.#log("change_state()  from:",this.#current_state,"to:",state);
            this.#current_state.exit();
            instance.#current_state = state;
            this.#current_state.enter();
        }
    }

    transition(event) {
        var instance = this;
        var state = this.#current_state;
        instance.#log("transition(",event,")");
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
