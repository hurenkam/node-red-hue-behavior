BaseState = require("../../../../utils/fsm/BaseState");

class MotionState extends BaseState {
    #info;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('closed').extend('MotionState');
        this.#info("constructor()");

        context.node().send({ "payload": { "state_report": { "state": "motion_c" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "motion_c"});

        context.absence_timer().start();
    }

    exit() {
        this.context().absence_timer().cancel();
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",this.context(),",",msg,")");
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                var closed = { PresenceState: require("./PresenceState") };
                return new closed.PresenceState(instance.context());
            }
        }

        if (msg.payload.type=="timeout") {
            if (msg.payload.timeout=="absence") {
                var closed = { AbsenceState: require("./AbsenceState") };
                return new closed.AbsenceState(instance.context());
            }
        }
        return instance;
    }
}

module.exports = MotionState;
