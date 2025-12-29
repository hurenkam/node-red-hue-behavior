class StateMachine {
    #info;
    #current_state;
    name="StateMachine";

    constructor(initial_state) {
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('StateMachine');
        this.#info("constructor()");
        if (!initial_state) {
            throw new Error("Initial state is not set!");
        }
        this.#current_state = initial_state;
        //initial_state.enter();
    }

    #change_state(state) {
        var instance = this;
        instance.#info("transition() new state:",state);
        if (!state) {
            throw new Error("State is not set!");
        }
        //this.#current_state.exit();
        instance.#current_state = state;
        //this.#current_state.enter();
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


/*
import { Machine } from 'xstate';

const open_machine = Machine({
    key: "open",
    initial: "motion",
    states: {
        "motion": {
            onEntry: ["",() => {
                console.log("open_machine.motion.onEntry()")
            }],
            on: {
                TIMEOUT: "no_motion",
                MOTION: "motion",
            } 
        },
        "no_motion": {
            on: {
                MOTION: "no_motion"
            }
        }
    }
});
const closed_machine = Machine({
    key: "closed",
    initial: "motion",
    states: {
        "motion": {
            on: {
                TIMEOUT: "absence",
                MOTION: "presence",
            } 
        },
        "absence": {
            on: {
                MOTION: "presence"
            }
        },
        "presence": {
            on: {}
        }
    }
});
const presence_machine = Machine({
    key: "presence",
    initial: "open",
    states: {
        "open": {
            on: {
                CLOSED: "closed"
            },
            ...open_machine
        },
        "closed": {
            on: {
                OPEN: "closed"
            },
            ...closed_machine
        }
    }
});

class StateMachine {
    #state;

    constructor() {
    }

    transition(event) {
        var state = presence_machine
            .transtion(this.#state, event)
            .value;
        this.#state = state;
    }

    current_state() {
        this.#state;
    }
}
*/
