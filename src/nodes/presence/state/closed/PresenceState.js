const utils = require("@hurenkam/npm-utils");

class PresenceState extends utils.fsm.BaseState {
    #info;

    constructor(log,context) {
        super(log,context);
        this.#info = log.extend('PresenceState');
        this.#info("constructor()");
        context.node().send({ "payload": { "state_report": { "state": "presence" }, "type": "state"  } })
        context.node().status({fill: "green", shape: "dot", text: "presence"});
    }

    enter() {
        this.#info("enter()");
    }

    exit() {
        this.#info("exit()");
    }

    transition(msg) {
        this.#info("transition(",msg,")");
        return this;
    }
}

module.exports = PresenceState;
