BaseState = require("../../../../utils/fsm/BaseState");

class MotionState extends BaseState {
    #info;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('MotionState');
        this.#info("constructor()");

        context.node().send({ "payload": { "state_report": { "state": "motion_c" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "motion_c"});

        context.absence_timer().start();
    }

    enter() {
        this.#info("enter()");
    }

    exit() {
        this.#info("exit()");
        this.context().absence_timer().cancel();
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",msg,")");
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                var closed = { PresenceState: require("./PresenceState") };
                return new closed.PresenceState(instance.log(),instance.context());
            }
        }

        if (msg.payload.type=="timeout") {
            if (msg.payload.timeout=="absence") {
                var closed = { AbsenceState: require("./AbsenceState") };
                return new closed.AbsenceState(instance.log(),instance.context());
            }
        }
        return instance;
    }
}

module.exports = MotionState;
