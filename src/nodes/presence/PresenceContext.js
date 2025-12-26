class PresenceContext {
    #info;
    #id;
    #node;
    constructor(id,nodeAPI) {
        this.#info = require('debug')('hue-behavior').extend('info').extend('PresenceNode').extend(id).extend('Context');
        this.#info("constructor()");
        this.#node = nodeAPI;
        this.#id = id;
    }

    id() {
        return this.#id;
    }
    node() {
        return this.#node;
    }
}

module.exports = PresenceContext;
