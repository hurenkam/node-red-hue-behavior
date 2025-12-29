const motion_timout_msg = { "payload": { "type": "timeout", "timeout": "motion" } };
const absence_timeout_msg = { "payload": { "type": "timeout", "timeout": "absence" } };

class PresenceNode {
    #info;
    #node;
    #config;
    #api;

    constructor(node,config,api) {
        this.#info = require('debug')('info').extend('hue-behavior').extend('PresenceNode').extend(config.id);
        this.#info("constructor()");
        this.#node = node;
        this.#config = config;
        this.#api = api;
    }

    #fsm;
    #motion_timer;
    #absence_timer;
    init() {
        this.#info("init()");

        var instance = this;
        var utils = { Timer: require("../../utils/Timer") }
        var fsm = { StateMachine: require("../../utils/fsm/StateMachine") };
        var open = { OpenState: require("./state/open/OpenState") };

        this.#motion_timer = new utils.Timer(300000,() => { 
            instance.#fsm.transition(motion_timout_msg); 
        });
        this.#absence_timer = new utils.Timer(60000,() => { 
            instance.#fsm.transition(absence_timeout_msg); 
        });
        this.#node.on('input', function (msg) {
            instance.#input(msg);
        });
        this.#node.on('close', function () {
            instance.#close();
        });

        this.#fsm = new fsm.StateMachine(new open.OpenState(instance));
    }

    node() { return this.#node; }
    config() { return this.#config; }
    api() { return this.#api; }
    motion_timer() { return this.#motion_timer; }
    absence_timer() { return this.#absence_timer; }

    #close() {
        this.#info("close()");
    }

    #input(msg) {
        this.#info("input(",msg,")");
        this.#fsm.transition(msg);
    }
}

module.exports = function(RED) {
    function createPresenceNode(config) {
        RED.nodes.createNode(this, config);
        this.node = new PresenceNode(this,config,RED);
        this.node.init();
    }
    RED.nodes.registerType("@hurenkam/hue-behavior/Presence", createPresenceNode);
}
