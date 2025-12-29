module.exports = function(RED) {
    function createPresenceNode(config) {
        const PresenceNode = require('./nodes/presence/PresenceNode');
        RED.nodes.createNode(this, config);
        this.node = new PresenceNode(this,config,RED);
    }
    RED.nodes.registerType("@hurenkam/hue-behavior/Presence", createPresenceNode);
}
