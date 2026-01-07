const utils = require("@hurenkam/npm-utils");

class OpenState extends utils.fsm.BaseState {
    #info;
    #state_machine;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('OpenState');
        this.#info("constructor()");
    }

    enter() {
        this.#info("enter()");
        var instance = this;
        var open = { MotionState: require("./MotionState") };
        this.#state_machine = new utils.fsm.StateMachine(instance.#info.extend("StateMachine"), new open.MotionState(instance.#info,instance.context()));
    }

    exit() {
        this.#info("exit()");
        this.#state_machine.destructor();
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",msg,")");
        if (msg.payload && msg.payload.type) {
            if (msg.payload.type=="contact") {
                if (instance.context().all_closed()) {
                    var closed = { ClosedState: require("../closed/ClosedState") };
                    return new closed.ClosedState(instance.log(),instance.context());
                }
            }
        }
        instance.#state_machine.transition(msg);
        return instance;
    }
}

module.exports = OpenState;
