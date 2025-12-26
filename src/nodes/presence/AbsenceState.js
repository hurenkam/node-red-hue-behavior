BaseState = require("./BaseState");
PresenceState = require("./PresenceState");
UnknownOpenState = require("./UnknownOpenState");

class AbsenceState extends BaseState {
    #info;
    #warn;
    #error;
    #debug;
    #trace;
    
    constructor(context) {
        super(context);
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(context.id()).extend('AbsenceState');
        this.#warn = require('debug')('hue-behavior').extend('warn').extend('PresenceNode').extend(context.id()).extend('AbsenceState');
        this.#error = require('debug')('hue-behavior').extend('error').extend('PresenceNode').extend(context.id()).extend('AbsenceState');
        this.#debug = require('debug')('hue-behavior').extend('debug').extend('PresenceNode').extend(context.id()).extend('AbsenceState');
        this.#trace = require('debug')('hue-behavior').extend('trace').extend('PresenceNode').extend(context.id()).extend('AbsenceState');
        this.#info("constructor()");

        context.node().clear_motion_timer();
        context.node().clear_absence_timer();
        context.node().send({ "payload": { "state_report": { "state": "absence" }, "type": "state" } })
        context.node().status({fill: "grey", shape: "dot", text: "absence"});
    }

    onOpen(report) {
        this.#info("onOpen(): " + JSON.stringify(report));
        return new UnknownOpenState(this.context());
    }
    onMotion(report) {
        this.#info("onMotion(): " + JSON.stringify(report));
        return new PresenceState(this.context());
    }
}

module.exports = AbsenceState;
