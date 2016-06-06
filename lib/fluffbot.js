// FluffBot class initialisation
var FluffBot = function Constructor() {
	this.settings = require('../config/settings')
	this.commands = require('../config/commands')
}

// Check if message is a command
FluffBot.prototype._isCommand = function(message) {
	if (message.indexOf('!') > -1 && message[0] == '!') {
		var command = message.split(' ')[0].replace('!', '')
		return this.getCommand(command, this._needsHelp(message))
	}

	return false
}

// Check if FluffBot is mentioned
FluffBot.prototype._mentionsFluffBot = function(message) {
	return message.indexOf(this.name) > -1
}

// Check if owner is mentioned
FluffBot.prototype._mentionsOwner = function(message) {
	return message.indexOf(this.owner) > -1
}

// Check if help is needed
FluffBot.prototype._needsHelp = function(message) {
	return message.indexOf('help') > -1
}

FluffBot.prototype.getCommand = function(command, help) {
	if (help) {
		return this.commands[command]['help']
	}

	return this.commands[command]['response']
}

module.exports = FluffBot
