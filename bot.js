// Include needed files
var fluffbot = require('./lib/fluffbot')
var discord = require('discord.js')
var event = require('./lib/event')

// Instantiate bots
var fluffbot = new fluffbot()
discord = new discord.Client()

discord.loginWithToken(fluffbot.settings.bot_token)

// Initiate the playing game to say the current version
discord.on('ready', function(event) {
	this.setPlayingGame('Alpha v1.0')
})

// Event listener when bot is added to a server
discord.on('serverCreated', function(server) {
	this.sendMessage(server.generalChannel ,'@everyone FluffBot has joined '+server.name+' and is here to help!');
})

// Event listener for new member joining
discord.on('serverNewMember', function(server, user) {
	this.sendMessage(server.generalChannel ,'@everyone Welcome '+user.toString()+' to the Fluff Fam');
})

// Event listener for member being removed
discord.on('serverMemberRemoved', function(server, user) {
	this.sendMessage(server.generalChannel ,'@everyone '+user.toString()+' was removed');
})

// Event listener registered
event.bus.on('response', function(message, data) {
	discord.startTyping(message)
	discord.stopTyping(message)
	discord.reply(message, data)
})

// Message event listener
discord.on('message', function(message) {

	if (message.content.indexOf('!') > -1 && message.content[0] == '!') {
		fluffbot._runCommand(message)
	}

})
