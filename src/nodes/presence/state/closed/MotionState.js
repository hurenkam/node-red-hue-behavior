BaseState = require("../../../../utils/fsm/BaseState");

class MotionState extends BaseState {
    #info;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('closed').extend('MotionState');

        context.node().send({ "payload": { "state_report": { "state": "motion_c" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "motion_c"});
        //context.start_absence_timer();

        var absence_timer = context.absence_timer();
        this.#info("constructor() context: ",context, "absence_timer: ",absence_timer);
        absence_timer.start();
    }

    transition(context,msg) {
        var instance = this;
        instance.#info("transition() "+context);
        if (!context) {
            throw new Error("Context is not set!");
        }
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                //context.clear_absence_timer();
                context.absence_timer().cancel();

                var closed = { PresenceState: require("./PresenceState") };
                return new closed.PresenceState(context);
            }
        }

        if (msg.payload.type=="timeout") {
            if (msg.payload.timeout=="absence") {
                var closed = { AbsenceState: require("./AbsenceState") };
                return new closed.AbsenceState(context);
            }
        }
        return instance;
    }
}

module.exports = MotionState;
