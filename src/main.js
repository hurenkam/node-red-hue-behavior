module.exports = function(RED) {
    const PresenceNode = require('./nodes/presence/PresenceNode');
    PresenceNode.nodeAPI = RED;
    RED.nodes.registerType("@hurenkam/hue-behavior/Presence",PresenceNode);
}
