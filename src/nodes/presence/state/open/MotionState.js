const utils = require("@hurenkam/npm-utils");

class MotionState extends utils.fsm.BaseState {
    #info;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('MotionState');
        this.#info("constructor()");
        context.node().send({ "payload": { "state_report": { "state": "motion_o" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "motion_o"});
    }

    enter() {
        this.#info("enter()");
        this.context().motion_timer().start();
    }
    
    exit() {
        this.#info("exit()");
        this.context().motion_timer().cancel();
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",msg,")");
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                instance.context().motion_timer().start();
            }
        }
        if (msg.payload.type=="timeout") {
            if (msg.payload.timeout=="motion") {
                var open = { NoMotionState: require("./NoMotionState") };
                return new open.NoMotionState(instance.log(),instance.context());
            }
        }

        return instance;
    }
}

module.exports = MotionState;
