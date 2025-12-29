BaseState = require("../../../../utils/fsm/BaseState");
StateMachine = require("../../../../utils/fsm/StateMachine");

class OpenState extends BaseState {
    #info;
    #state_machine;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('open').extend('OpenState');
        this.#info("constructor()");

        var open = { MotionState: require("./MotionState") };
        this.#state_machine = new StateMachine(new open.MotionState(context));
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",instance.context(),",",msg,")");
        if (msg.payload && msg.payload.type) {
            if (msg.payload.type=="contact") {
                if (msg.payload.contact_report.state=="contact") {
                    var closed = { ClosedState: require("../closed/ClosedState") };
                    return new closed.ClosedState(instance.context());
                }
            }
        }
        instance.#state_machine.transition(msg);
        return instance;
    }
}

module.exports = OpenState;
