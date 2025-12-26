BaseState = require("./BaseState");
UnknownOpenState = require("./UnknownOpenState");

class PresenceState extends BaseState {
    #info;
    #warn;
    #error;
    #debug;
    #trace;
    
    constructor(context) {
        super(context);
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(context.id()).extend('PresenceState');
        this.#warn = require('debug')('hue-behavior').extend('warn').extend('PresenceNode').extend(context.id()).extend('PresenceState');
        this.#error = require('debug')('hue-behavior').extend('error').extend('PresenceNode').extend(context.id()).extend('PresenceState');
        this.#debug = require('debug')('hue-behavior').extend('debug').extend('PresenceNode').extend(context.id()).extend('PresenceState');
        this.#trace = require('debug')('hue-behavior').extend('trace').extend('PresenceNode').extend(context.id()).extend('PresenceState');
        this.#info("constructor()");

        context.node().clear_motion_timer();
        context.node().clear_absence_timer();
        context.node().send({ "payload": { "state_report": { "state": "presence" }, "type": "state"  } })
        context.node().status({fill: "green", shape: "dot", text: "presence"});
    }

    onOpen(report) {
        this.#info("onOpen(): " + JSON.stringify(report));
        return new UnknownOpenState(this.context());
    }
}

module.exports = PresenceState;
