StateMachine = require("./state/StateMachine");

class PresenceNode {
    #info;
    #node;
    #config;
    #api;
    #fsm;
    name="PresenceNode";

    constructor(node,config,api) {
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend(config.id);
        this.#info("constructor()");
        this.#node = node;
        this.#config = config;
        this.#api = api;

        this.init();
    }

    node() { return this.#node; }
    config() { return this.#config; }
    api() { return this.#api; }

    init() {
        var instance = this;
        instance.#info("init() instance: "+JSON.stringify(instance));

        var open = { OpenState: require("./state/open/OpenState") };
        instance.#fsm = new StateMachine(new open.OpenState(instance));

        instance.#node.on('input', function (msg) {
            instance.#input(msg,instance);
        });
        instance.#node.on('close', function () {
            instance.#close();
        });
    }

    #close() {
        this.#info("close()");
    }

    #input(msg,instance) {
        this.#info("input(",msg,")");
        this.#fsm.transition(instance,msg);
    }

    #absence_timer;
    clear_absence_timer() {
        this.#info("clear_absence_timer())");
        if (this.#absence_timer) {
            clearTimeout(this.#absence_timer);
        }
    }
    start_absence_timer() {
        this.#info("start_absence_timer())");
        this.clear_absence_timer();
        this.#absence_timer = setTimeout(() => {
            this.absence_timeout();
        }, 60000);
    }
    absence_timeout() {
        var instance = this;
        this.#info("absence_timeout()");
        this.#fsm.transition(instance,{
            "payload": {
                "type": "timeout",
                "timeout": "absence"
            }
        });
    }

    #motion_timer;
    start_motion_timer() {
        this.#info("start_motion_timer())");
        this.clear_motion_timer();
        this.#motion_timer = setTimeout(() => {
            this.motion_timeout();
        }, 300000);
    }
    clear_motion_timer() {
        this.#info("clear_motion_timer())");
        if (this.#motion_timer) {
            clearTimeout(this.#motion_timer);
        }
    }
    motion_timeout() {
        var instance = this;
        this.#info("motion_timeout()");
        this.#fsm.transition(instance,{
            "payload": {
                "type": "timeout",
                "timeout": "motion"
            }
        });
    }
}

module.exports = PresenceNode;
