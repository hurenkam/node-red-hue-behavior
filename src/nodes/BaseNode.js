class BaseNode {
    #node;
    #config;
    #api;
 
    constructor(node, config, api) {
        this.#node = node;
        this.#config = config;
        this.#api = api;

        var instance = this;
        node.on('input', function(msg) { instance.onInput(msg); });
        node.on('close', function() { instance.destructor(); } );
    }

    init() {}

    destructor() {}

    node() { return this.#node; }
    config() { return this.#config; }
    api() { return this.#api; }

    onInput(msg) {}

    getNodeById(id) {
        var instance = this;
        var result;
        this.api().nodes.eachNode(function(node) {
            //instance.#info("getNode() node.id:",node.id,"id:",id);
            if (node.id == id) {
                result = node;
            }
        });        
        return result;
    }
}

module.exports = BaseNode;
