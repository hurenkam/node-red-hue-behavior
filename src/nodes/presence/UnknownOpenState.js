BaseState = require("./BaseState");
UnknownClosedState = require("./UnknownClosedState");

class UnknownOpenState extends BaseState {
    #info;
    #warn;
    #error;
    #debug;
    #trace;
    
    constructor(context) {
        super(context);
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(context.id()).extend('UnknownOpenState');
        this.#warn = require('debug')('hue-behavior').extend('warn').extend('PresenceNode').extend(context.id()).extend('UnknownOpenState');
        this.#error = require('debug')('hue-behavior').extend('error').extend('PresenceNode').extend(context.id()).extend('UnknownOpenState');
        this.#debug = require('debug')('hue-behavior').extend('debug').extend('PresenceNode').extend(context.id()).extend('UnknownOpenState');
        this.#trace = require('debug')('hue-behavior').extend('trace').extend('PresenceNode').extend(context.id()).extend('UnknownOpenState');
        this.#info("constructor()");

        context.node().send({ "payload": { "state_report": { "state": "motion" }, "type": "state"  } })
        context.node().status({fill: "blue", shape: "dot", text: "motion"});
        context.node().start_motion_timer();
    }

    onClosed(report) {
        this.#info("onClosed(): " + JSON.stringify(report));
        return new UnknownClosedState(this.context());
    }
    onMotion(report) {
        this.#info("onMotion(): " + JSON.stringify(report));
        this.context().node().send({ "payload": { "state_report": { "state": "motion" }, "type": "state"  } })
        this.context().node().status({fill: "blue", shape: "dot", text: "motion"});
        this.context().node().start_motion_timer();
        return this;
    }
    onMotionTimeout(report) {
        this.#info("onMotionTimeout(): " + JSON.stringify(report));
        this.context().node().send({ "payload": { "state_report": { "state": "no_motion" }, "type": "state"  } })
        this.context().node().status({fill: "yellow", shape: "dot", text: "no motion"});
        return this;
    }
}

module.exports = UnknownOpenState;
