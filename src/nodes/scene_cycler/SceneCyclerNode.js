const BaseNode = require("../BaseNode");

class SceneCyclerNode extends BaseNode {
    #info;

    constructor(node,config,api) {
        var info = require('debug')('info').extend('hue-behavior').extend('SceneCycler').extend(config.id);
        info("constructor()");
        super(node,config,api);
        this.#info = info;
    }

    #connected_ids=[];
    #connected_ids_by_type={};
    #connected_nodes_by_id={};
    find_connected_nodes() {
        this.#info("find_connected_nodes()");

        var instance=this;
        var connected_ids = [];
        this.node().wires.forEach(output => {
            output.forEach(id => {
                connected_ids.push(id);
            });
        });
        this.#connected_ids=connected_ids;

        var connected_nodes_by_id = {};
        var connected_ids_by_type = {};
        this.api().nodes.eachNode(function(node) {
            if (connected_ids.indexOf(node.id) != -1) {
                if (!connected_ids_by_type[node.type]) {
                    connected_ids_by_type[node.type]=[];
                }
                instance.#info("find_connected_nodes() found:",node);
                connected_ids_by_type[node.type].push(node.id);
                connected_nodes_by_id[node.id]=node;
            }
        });
        this.#connected_ids_by_type = connected_ids_by_type;
        this.#connected_nodes_by_id = connected_nodes_by_id;
    }

    init() {
        this.#info("init()");
        super.init();
        this.find_connected_nodes();
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
