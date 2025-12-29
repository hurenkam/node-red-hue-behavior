BaseState = require("../../../../utils/fsm/BaseState");
StateMachine = require("../../../../utils/fsm/StateMachine");

class OpenState extends BaseState {
    #info;
    #state_machine;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('open').extend('OpenState');
        this.#info("constructor()"+context);

        var open = { MotionState: require("./MotionState") };
        this.#state_machine = new StateMachine(new open.MotionState(context));
    }

    transition(context,msg) {
        var instance = this;
        instance.#info("transition(",context,",",msg,")");
        if (!context) {
            throw new Error("Context is not set!");
        }
        if (msg.payload && msg.payload.type) {
            if (msg.payload.type=="contact") {
                if (msg.payload.contact_report.state=="contact") {
                    context.motion_timer().cancel();
                    var closed = { ClosedState: require("../closed/ClosedState") };
                    return new closed.ClosedState(context);
                }
            }
        }
        instance.#state_machine.transition(context,msg);
        return instance;
    }
}

module.exports = OpenState;
