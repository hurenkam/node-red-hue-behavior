BaseState = require("../BaseState");

class ClosedState extends BaseState {
    #info;
    #state_machine;
    name="ClosedState";

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('closed').extend('ClosedState');
        this.#info("constructor() context: "+context);

        var closed = { MotionState: require("./MotionState") };
        this.#state_machine = new StateMachine(new closed.MotionState(context));
    }

    transition(context,msg) {
        var instance = this;
        instance.#info("transition(",context,",",msg,")");
        if (!context) {
            throw new Error("Context is not set!");
        }
        if (msg.payload && msg.payload.type) {
            if (msg.payload.type=="contact") {
                if (msg.payload.contact_report.state=="no_contact") {

                    var open = { OpenState: require("../open/OpenState") };
                    return new open.OpenState(context);
                }
            }
        }
        instance.#state_machine.transition(context,msg);
        return instance;
    }
}

module.exports = ClosedState;
