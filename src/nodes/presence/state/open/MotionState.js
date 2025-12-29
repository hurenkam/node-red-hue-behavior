BaseState = require("../../../../utils/fsm/BaseState");

class MotionState extends BaseState {
    #info;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('open').extend('MotionState');
        context.node().send({ "payload": { "state_report": { "state": "motion_o" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "motion_o"});
        //context.start_motion_timer();

        var motion_timer = context.motion_timer();
        this.#info("constructor() context: ",context, "motion_timer: ",motion_timer);
        motion_timer.start();
    }

    transition(context,msg) {
        var instance = this;
        instance.#info("transition() "+context);
        if (!context) {
            throw new Error("Context is not set!");
        }
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                //context.start_motion_timer();
                context.motion_timer().start();
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
