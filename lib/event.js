// Dependancies for Event System
var util = require('util')
var eventEmitter = require('events').EventEmitter

function Event () {
	eventEmitter.call(this)
}

util.inherits(Event, eventEmitter)

Event.prototype.sendEvent = function(type, message, data) {
	this.emit(type, message, data)
}

var eventBus = new Event()

module.exports = {
	emitter: Event,
	bus : eventBus
}
