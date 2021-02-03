"use strict"

var hyperscript = require("./hyperscript")
var request = require("./request")
var mountRedraw = require("./mount-redraw")

var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.mount = mountRedraw.mount
m.route = require("./route")
m.render = require("./render")
m.redraw = mountRedraw.redraw
m.request = request.request
m.jsonp = request.jsonp
m.parseQueryString = require("./querystring/parse")
m.buildQueryString = require("./querystring/build")
m.parsePathname = require("./pathname/parse")
m.buildPathname = require("./pathname/build")
m.vnode = require("./render/vnode")
m.PromisePolyfill = require("./promise/polyfill")
m.censor = require("./util/censor")

m.find = (test, node=null) => {
    if (!node) node = document.body.vnodes[0];

    if (test(node)) return node;

    if (node.instance) {
        return m.find(test, node.instance);
    } else if (node.children && node.children.length) {
        for (let idx = 0; idx < node.children.length; idx++) {
            // sometimes there's a null child. don't ask me why.
            if (node.children[idx] === null) continue;

            const recurse = m.find(test, node.children[idx]);
            if (recurse) return recurse;
        }
    }
    return null;
}

m.findAll = (test, acc = [], node = null) => {
    if (!node) node = document.body.vnodes[0];

    if (test(node)) acc.push(node);

    if (node.instance) {
        m.findAll(test, acc, node.instance);
    } else if (node.children && node.children.length) {
        for (let idx = 0; idx < node.children.length; idx++) {
            // sometimes there's a null child. don't ask me why.
            if (node.children[idx] === null) continue;

            m.findAll(test, acc, node.children[idx]);
        }
    }
    return acc;
}

module.exports = m
