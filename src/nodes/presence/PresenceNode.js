PresenceContext = require("./PresenceContext");
AbsenceState = require("./AbsenceState");

class PresenceNode {
    static nodeAPI = null;
    #onInput;
    #onClose;
    #info;
    #error;
    #trace;
    #state;
    #context;
    #motion_timer;
    #absence_timer;

    constructor(config) {
        PresenceNode.nodeAPI.nodes.createNode(this,config);
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(config.id);
        this.#error = require('debug')('hue-behavior').extend('error').extend('PresenceNode').extend(config.id);
        this.#trace = require('debug')('hue-behavior').extend('trace').extend('PresenceNode').extend(config.id);
        this.#info("constructor()");
        this.#context = new PresenceContext(config.id,this);
        this.#state = new AbsenceState(this.#context);
    
        var instance = this;

        this.#onInput = function (msg) {
            try {
                instance.onInput(msg);
            } catch (error) {
                this.#error(error.message,error.stack);
            }
        }
    
        this.#onClose = function () {
            try {
                instance.destructor();
            } catch (error) {
                this.#error(error.message,error.stack);
            }
        }
    
        this.on('input', this.#onInput);
        this.on('close', this.#onClose);
    }

    onInput(msg) {
        this.#trace("onInput(",msg,")");
        if (msg.payload && msg.payload.type) {
            if (msg.payload.type=="contact") {
                if (msg.payload.contact_report.state=="contact") {
                    this.#state = this.#state.onClosed();
                }
                if (msg.payload.contact_report.state=="no_contact") {
                    this.#state = this.#state.onOpen();
                }
            }
            if (msg.payload.type=="motion") {
                if (msg.payload.motion.motion_report.motion==true) {
                    this.#state = this.#state.onMotion();
                }
            }
        }
    }

    clear_absence_timer() {
        this.#trace("clear_absence_timer())");
        if (this.#absence_timer) {
            clearTimeout(this.#absence_timer);
        }
    }
    start_absence_timer() {
        this.#trace("start_absence_timer())");
        this.clear_absence_timer();
        this.#absence_timer = setTimeout(() => {
            this.absence_timeout();
        }, 60000);
    }
    absence_timeout() {
        this.#trace("absence_timeout()");
        this.#state = this.#state.onAbsenceTimeout();
    }

    start_motion_timer() {
        this.#trace("start_motion_timer())");
        this.clear_motion_timer();
        this.#motion_timer = setTimeout(() => {
            this.motion_timeout();
        }, 300000);
    }
    clear_motion_timer() {
        this.#trace("clear_motion_timer())");
        if (this.#motion_timer) {
            clearTimeout(this.#motion_timer);
        }
    }
    motion_timeout() {
        this.#trace("motion_timeout()");
        this.#state = this.#state.onMotionTimeout();
    }

    destructor() {
        this.#info("destructor()");
        this.off('input',this.#onInput);
        this.off('close',this.#onClose);
    }
}

module.exports = PresenceNode;
