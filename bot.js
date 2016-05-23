var Discord = require('discord.io');
var http = require('http');
var bot = new Discord.Client({
    autorun: true,
    token: "MTc5MTY3NTM0NjUyNzE5MTA0.Ch8bgw.7X1cBjzvpsb28hwvnfFkyCCvi4c"
});

bot.on('ready', function() {
    bot.setPresence({
        game: "FluffyMatt is building"
    })
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    if (message == '@FluffBot#7794 Hello') {
        bot.sendMessage({
            to: channelID,
            message: "@"+userID+"I'm still be built sorry!",
            typing: true,
        });
    }
    if (message == '!Hello') {
        bot.sendMessage({
            to: userID,
            message: "I'm still be built sorry!",
            typing: true,
        });
    }
});
