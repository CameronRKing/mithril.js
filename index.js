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
const { find, findAll } = require('./find/find');
m.find = find;
m.findAll = findAll;
m.componentCreated = require('./render/componentcreated').addHandler;

// stub functions to help autocomplete
// logic is in mithil-rewrite snowpack plugin (happens at build-time)
// though a run-time version would be a fine idea too
// (to assist in rapid experimentation/prototyping in-browser)
m.xhtml = (str) => str
m.cmp = (obj, cb) => {
    if (cb) cb(obj);
    return obj;
};

module.exports = m
