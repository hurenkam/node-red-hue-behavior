const utils = require("@hurenkam/npm-utils");

class AbsenceState extends utils.fsm.BaseState {
    #info;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('AbsenceState');
        this.#info("constructor() context: "+context);
        context.node().send({ "payload": { "state_report": { "state": "absence" }, "type": "state" } })
        context.node().status({fill: "grey", shape: "dot", text: "absence"});
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

                var closed = { PresenceState: require("./PresenceState") };
                return new closed.PresenceState(instance.log(),instance.context());
            }
        }

        return this;
    }
}

module.exports = AbsenceState;
