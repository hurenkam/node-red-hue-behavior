class BaseState {
    #info;
    #warn;
    #error;
    #debug;
    #trace;
    #context;
    
    constructor(context) {
        this.#context = context;
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(context.id()).extend('BaseState');
        this.#warn = require('debug')('hue-behavior').extend('warn').extend('PresenceNode').extend(context.id()).extend('BaseState');
        this.#error = require('debug')('hue-behavior').extend('error').extend('PresenceNode').extend(context.id()).extend('BaseState');
        this.#debug = require('debug')('hue-behavior').extend('debug').extend('PresenceNode').extend(context.id()).extend('BaseState');
        this.#trace = require('debug')('hue-behavior').extend('trace').extend('PresenceNode').extend(context.id()).extend('BaseState');
        this.#info("constructor()");
    }

    id() {
        return this.#context.id();
    }
    context() {
        return this.#context;
    }

    onOpen(report) {
        this.#info("onOpen()");
        return this;
    }
    onClosed(report) {
        this.#info("onClosed()");
        return this;
    }
    onMotion(report) {
        this.#info("onMotion()");
        return this;
    }
    onMotionTimeout(report) {
        this.#info("onMotionTimeout()");
        return this;
    }
    onAbsenceTimeout(report) {
        this.#info("onAbsenceTimeout()");
        return this;
    }
}

module.exports = BaseState;
