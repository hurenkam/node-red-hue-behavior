const BaseNode = require("../BaseNode");

class SceneCyclerNode extends BaseNode {
    #info;

    constructor(node,config,api) {
        var info = require('debug')('info').extend('hue-behavior').extend('SceneCycler').extend(config.id);
        info("constructor()");
        super(node,config,api);
        this.#info = info;
    }

    connections(wires) {
        var instance = this;
        wires.forEach(output => {
            output.forEach(id => {
                this.#info("connections() id:",id);
                var node = instance.getNodeById(id);
                if ((node) && (node.type=="@hurenkam/hue-services/SceneNode") && (node.uuid)) {
                    this.#info("connections() scene:",node.uuid);
                }
            });
        });
    }

    init() {
        this.#info("init()");
        this.connections(this.node().wires);
        super.init();
    }

    destructor() {
        this.#info("destructor()");
        super.destructor();
    }

    onInput(msg) {
        this.#info("onInput(",msg,")");
        super.onInput(msg)
    }
}

module.exports = SceneCyclerNode;
