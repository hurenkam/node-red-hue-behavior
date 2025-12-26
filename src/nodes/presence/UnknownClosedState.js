BaseState = require("./BaseState");
PresenceState = require("./PresenceState");
UnknownOpenState = require("./UnknownOpenState");

class UnknownClosedState extends BaseState {
    #info;
    #warn;
    #error;
    #debug;
    #trace;
    
    constructor(context) {
        super(context);
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(context.id()).extend('UnknownClosedState');
        this.#warn = require('debug')('hue-behavior').extend('warn').extend('PresenceNode').extend(context.id()).extend('UnknownClosedState');
        this.#error = require('debug')('hue-behavior').extend('error').extend('PresenceNode').extend(context.id()).extend('UnknownClosedState');
        this.#debug = require('debug')('hue-behavior').extend('debug').extend('PresenceNode').extend(context.id()).extend('UnknownClosedState');
        this.#trace = require('debug')('hue-behavior').extend('trace').extend('PresenceNode').extend(context.id()).extend('UnknownClosedState');
        this.#info("constructor()");

        context.node().start_absence_timer();
        context.node().send({ "payload": { "state_report": { "state": "motion" }, "type": "state"  } })
        context.node().status({fill: "blue", shape: "dot", text: "motion"});
    }

    onOpen(report) {
        this.#info("onOpen(): " + JSON.stringify(report));
        return new UnknownOpenState(this.context());
    }
    onMotion(report) {
        this.#info("onMotion(): " + JSON.stringify(report));
        return new PresenceState(this.context());
    }
    onAbsenceTimeout(report) {
        this.#info("onAbsenceTimeout(): " + JSON.stringify(report));
        return new AbsenceState(this.context());
    }
}

module.exports = UnknownClosedState;
