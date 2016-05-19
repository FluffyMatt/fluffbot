var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: "MTc5MTY3NTM0NjUyNzE5MTA0.Ch8bgw.7X1cBjzvpsb28hwvnfFkyCCvi4c"
});

bot.on('ready', function() {
    //console.log(bot.username + " - (" + bot.id + ")");
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "http://i.giphy.com/bVDziKRE7jBq8.gif"
        });
    }
	if (message === "!sing") {
		bot.joinVoiceChannel("179950016327188481", function() {
			bot.getAudioContext({ channel: "179950016327188481", stereo: true}, function(stream) {
			    stream.playAudioFile('http://www.tonycuffe.com/mp3/tail%20toddle.mp3'); //To start playing an audio file, will stop when it's done.
			});
		});
	}
});
