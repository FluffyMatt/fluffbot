// Event dependancy
var event = require('./event')

// FluffBot class initialisation
var FluffBot = function Constructor() {
	this.settings = require('../config/settings')
	this.commands = require('../config/commands')
}

// Check if message is a command
FluffBot.prototype._runCommand = function(message) {

	var content = message.content

	if (typeof(message.mentions[0]) == 'undefined') {
		var mention = ''
	} else {
		var mention = message.mentions[0].username
	}

	var command = content.split(' ')[0].replace('!', '')
	this.getCommand(message, command, this._needsHelp(content), this._mentionsOwner(mention), this._mentionsFluffBot(mention))
}

// Check if FluffBot is mentioned
FluffBot.prototype._mentionsFluffBot = function(message) {
	return message.indexOf(this.settings.name) > -1
}

// Check if owner is mentioned
FluffBot.prototype._mentionsOwner = function(message) {
	return message.indexOf(this.settings.owner) > -1
}

// Check if help is needed
FluffBot.prototype._needsHelp = function(message) {
	return message.indexOf('help') > -1
}

// Get the current command / expand for DB at a later date
FluffBot.prototype.getCommand = function(message, command, help, owner, bot) {

	var inFile = typeof(this.commands[command])

	if (inFile != 'undefined' && !help) {
		this.getResponse(message, command, owner, bot)
	}

	if (inFile != 'undefined' && help) {
		this.getHelp(message, command)
	}

}

// Grab the response to send back
FluffBot.prototype.getResponse = function(message, command, owner, bot) {

	var hasFile = typeof(this.commands[command]['file'])

	if (hasFile == 'undefined') {
		event.bus.sendEvent('response', message, this.commands[command]['response'])
	}

	if (hasFile != 'undefined') {
		var commands = require(this.commands[command]['file'])
		commands = new commands(message, owner, bot, this.settings)
		commands.run()
	}

}

// Help is handled here
FluffBot.prototype.getHelp = function(message, command) {
	 event.bus.sendEvent('response', message, this.commands[command]['help']+' | '+this.commands[command]['description'])
}

module.exports = FluffBot
