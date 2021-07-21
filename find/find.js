module.exports.find = function(node, test) {
    if (test(node)) return node;

    if (node.instance) {
        return m.find(node.instance, test);
    } else if (node.children && node.children.length) {
        for (let idx = 0; idx < node.children.length; idx++) {
            if (!node.children[idx]) continue;

            const recurse = find(node.children[idx], test);
            if (recurse) return recurse;
        }
    }
    return null;
}

module.exports.findAll = function(node, test, acc = []) {
    // if node not given, assume one is attached to document.body
    if (!test && typeof node === 'function') {
        return module.exports.findAll(document.body.vnodes[0], node);
    }
    
    if (test(node)) acc.push(node);

    if (node.instance) {
        m.findAll(node.instance, test, acc);
    } else if (node.children && node.children.length) {
        for (let idx = 0; idx < node.children.length; idx++) {
            if (!node.children[idx]) continue;

            m.findAll(node.children[idx], test, acc);
        }
    }
    return acc;
}