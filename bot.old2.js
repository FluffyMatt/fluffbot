/**
// Main dependancies
var Discord = require('discord.js')

// Custom dependancies
var fluffbot = new Discord.Client()
var commands = JSON.parse(require('fs').readFileSync('./config/commands.json', 'utf8'))

// Log fluffybot in
fluffbot.loginWithToken('')

// Set a fluffbot status
fluffbot.on('ready', function (event) {
    fluffbot.setPlayingGame('Routine Maintenance')
})

// Messages received check for commands
fluffbot.on('message', function (message) {
	if (message.content.startsWith('!') && message.content.length > 1) {
		// Context assumes help is sent
		var command = message.content.split(' ')[0].replace('!', '').trim()
		var	context = message.content.split(' ')

			console.log(command)
			console.log(context)

		if (context.length === 2) {
            context = context.pop()
			fluffbot.reply(message, commands[command][context])
		}
	}
})
**/


/**
command = string.split(' ')[0].replace('!', '').trim()
context = string.split(' ')
console.log(context)
console.log(context.length)
console.log(string.split(' ').pop())
console.log(commands[command][context])
var test = require(commands[command]['file'])
console.log(test.message())
