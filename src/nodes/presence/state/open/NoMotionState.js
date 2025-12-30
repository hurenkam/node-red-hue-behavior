BaseState = require("../../../../utils/fsm/BaseState");

class NoMotionState extends BaseState {
    #info;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('NoMotionState');
        this.#info("constructor()");
        context.node().send({ "payload": { "state_report": { "state": "no_motion" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "no motion"});
    }

    enter() {
        this.#info("enter()");
    }

    exit() {
        this.#info("exit()");
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",msg,")");
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                var open = { MotionState: require("./MotionState") };
                return new open.MotionState(instance.log(),instance.context());
            }
        }
        return instance;
    }
}

module.exports = NoMotionState;
