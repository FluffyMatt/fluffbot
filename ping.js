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
    if (message == '!live') {
        var live = http.get('http://api.twitch.tv/kraken/streams/'+user, function(response) {
            var body;
            response.on('data', function(chunk){
                body += chunk;
            });
            console.log(body);
        });

    }
});
