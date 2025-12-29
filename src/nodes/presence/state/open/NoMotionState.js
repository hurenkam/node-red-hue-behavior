BaseState = require("../BaseState");

class NoMotionState extends BaseState {
    #info;
    name="NoMotionState";

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('open').extend('NoMotionState');
        this.#info("constructor() context: "+context);
        context.node().send({ "payload": { "state_report": { "state": "no_motion" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "no motion"});
    }

    transition(context,msg) {
        var instance = this;
        instance.#info("transition() "+context);
        if (!context) {
            throw new Error("Context is not set!");
        }
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                var open = { MotionState: require("./MotionState") };
                return new open.MotionState(context);
            }
        }
        return instance;
    }
}

module.exports = NoMotionState;
