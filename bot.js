// Include needed files
var fluffbot = require('./lib/fluffbot')
var discord = require('discord.js')

// Instantiate bots
var fluffbot = new fluffbot()
discord = new discord.Client()

discord.loginWithToken(fluffbot.settings.bot_token)

discord.on('ready', function(event) {
	this.setPlayingGame('Alpha v1.0')
})

discord.on('message', function(message) {

	var commandResponse = fluffbot._isCommand(message.content);

	if (commandResponse) {
		this.reply(message, commandResponse)
	}

})
