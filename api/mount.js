"use strict"

var Vnode = require("../render/vnode")
var coreRenderer = require("../render/render")
var autoredraw = require("../api/autoredraw")
var dummy = {view: function() {}}

module.exports = function(renderer, pubsub) {
	return function(root, component) {
		pubsub.unsubscribe(root.redraw)

		var run = autoredraw(root, renderer, pubsub, function() {
			renderer.render(
				root,
				Vnode(component === null ? dummy : component, undefined, undefined, undefined, undefined, undefined)
			)
		})

		run()

		if (component === null) {
			pubsub.unsubscribe(root.redraw)
			delete root.redraw
		}
	}
}
