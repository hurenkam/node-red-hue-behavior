BaseState = require("../../../../utils/fsm/BaseState");

class AbsenceState extends BaseState {
    #info;

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('closed').extend('AbsenceState');
        this.#info("constructor() context: "+context);
        context.node().send({ "payload": { "state_report": { "state": "absence" }, "type": "state" } })
        context.node().status({fill: "grey", shape: "dot", text: "absence"});
    }

    transition(msg) {
        var instance = this;
        instance.#info("transition(",this._context,",",msg,")");
        if (msg.payload.type=="motion") {
            if (msg.payload.motion.motion_report.motion==true) {

                var closed = { PresenceState: require("./PresenceState") };
                return new closed.PresenceState(instance._context);
            }
        }

        return this;
    }
}

module.exports = AbsenceState;
