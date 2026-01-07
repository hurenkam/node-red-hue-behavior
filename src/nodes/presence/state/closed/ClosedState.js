const utils = require("@hurenkam/npm-utils");

class ClosedState extends utils.fsm.BaseState {
    #info;
    #state_machine;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('ClosedState');
        this.#info("constructor()");
    }

    enter() {
        this.#info("enter()");
        var instance = this;
        var closed = { MotionState: require("./MotionState") };
        this.#state_machine = new utils.fsm.StateMachine(instance.#info,new closed.MotionState(instance.#info,this.context()));
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
                if (msg.payload.contact_report.state=="no_contact") {
                    var open = { OpenState: require("../open/OpenState") };
                    return new open.OpenState(instance.log(),instance.context());
                }
            }
        }
        instance.#state_machine.transition(msg);
        return instance;
    }
}

module.exports = ClosedState;
