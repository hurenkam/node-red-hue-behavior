BaseState = require("../../../../utils/fsm/BaseState");

class NoMotionState extends BaseState {
    #info;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('open').extend('NoMotionState');
        this.#info("constructor()");
        context.node().send({ "payload": { "state_report": { "state": "no_motion" }, "type": "state" } })
        context.node().status({fill: "blue", shape: "dot", text: "no motion"});
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",this._context,",",msg,")");
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {
                var open = { MotionState: require("./MotionState") };
                return new open.MotionState(instance._context);
            }
        }
        return instance;
    }
}

module.exports = NoMotionState;
