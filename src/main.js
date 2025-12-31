module.exports = function(RED) {
    "use strict";

    var nodes = {
        "Presence": "./nodes/presence/PresenceNode",
        "SceneCycler": "./nodes/scene_cycler/SceneCyclerNode"
    };

    Object.keys(nodes).forEach((id) => {
        var typeName = "@hurenkam/hue-behavior/"+id;
        var create_node = function(config) {
            RED.nodes.createNode(this, config);
            const node = require(nodes[id]);
            this.node = new node(this,config,RED);
            this.node.init();
        }
        RED.nodes.registerType(typeName, create_node);
    });
}
