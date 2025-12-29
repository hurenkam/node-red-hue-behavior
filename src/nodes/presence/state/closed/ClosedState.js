BaseState = require("../../../../utils/fsm/BaseState");
StateMachine = require("../../../../utils/fsm/StateMachine");

class ClosedState extends BaseState {
    #info;
    #state_machine;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('closed').extend('ClosedState');
        this.#info("constructor()");

        var closed = { MotionState: require("./MotionState") };
        this.#state_machine = new StateMachine(new closed.MotionState(context));
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",this.context(),",",msg,")");
        if (msg.payload && msg.payload.type) {
            if (msg.payload.type=="contact") {
                if (msg.payload.contact_report.state=="no_contact") {
                    var open = { OpenState: require("../open/OpenState") };
                    return new open.OpenState(this.context());
                }
            }
        }
        instance.#state_machine.transition(msg);
        return instance;
    }
}

module.exports = ClosedState;
