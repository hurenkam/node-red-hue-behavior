BaseState = require("../BaseState");

class MotionState extends BaseState {
    #info;
    name="MotionState";

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('open').extend('MotionState');
        this.#info("constructor() context: "+context);
        context.node().send({ "payload": { "state_report": { "state": "motion_o" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "motion_o"});
        context.start_motion_timer();
    }

    transition(context,msg) {
        var instance = this;
        instance.#info("transition() "+context);
        if (!context) {
            throw new Error("Context is not set!");
        }
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                context.start_motion_timer();
            }
        }
        if (msg.payload.type=="timeout") {
            if (msg.payload.timeout=="motion") {
                var open = { NoMotionState: require("./NoMotionState") };
                return new open.NoMotionState(context);
            }
        }

        return instance;
    }
}

module.exports = MotionState;
