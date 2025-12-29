BaseState = require("../BaseState");

class PresenceState extends BaseState {
    #info;
    name="PresenceState";

    constructor(context) {
        super(context);
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend('closed').extend('PresenceState');
        this.#info("constructor() context: "+context);
        context.node().send({ "payload": { "state_report": { "state": "presence" }, "type": "state"  } })
        context.node().status({fill: "green", shape: "dot", text: "presence"});
    }

    transition(context,msg) {
        return this;
    }
}

module.exports = PresenceState;
