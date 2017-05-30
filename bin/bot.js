// Include needed files
var fluffbot = require('../lib/fluffbot')
var discord = require('discord.js')
var event = require('../lib/event')

// Instantiate bots
var fluffbot = new fluffbot()
discord = new discord.Client({autoReconnect:true})

discord.login(fluffbot.settings.bot_token)

// Initiate the playing game to say the current version
discord.on('ready', function(event) {
	this.user.setStatus('online', 'Alpha v2.0.4 by FluffyMatt');
})

// Event listener when bot is added to a server
discord.on('serverCreated', function(server) {
	this.sendMessage(server.generalChannel ,'@here FluffBot has joined '+server.name+' and is here to help!');
})

// Event listener for new member joining
discord.on('serverNewMember', function(server, user) {
	this.sendMessage(server.generalChannel ,'@here Welcome '+user.toString()+' to the Fam');
})

// Event listener registered
event.bus.on('response', function(message, data) {
	message.reply(data)
})

// Event listener registered
event.bus.on('message', function(message, data) {
	message.reply(data)
})

// Message event listener
discord.on('message', function(message) {

	if (message.content.indexOf('!') > -1 && message.content[0] == '!') {
		fluffbot._runCommand(message)
	}

})
