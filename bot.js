var Discord = require("discord.js");
var request = require("request");
var fluffbot = new Discord.Client();

fluffbot.loginWithToken("MTc5MTY3NTM0NjUyNzE5MTA0.Ch8bgw.7X1cBjzvpsb28hwvnfFkyCCvi4c");

fluffbot.on("ready", function(event) {
    fluffbot.setPlayingGame("Alpha v0.1");
});

fluffbot.on("message", function(message) {
    if (message.content.indexOf("!gifr") > -1) {
        var search = searchBuild(message.content.split(" "));
        request("http://api.giphy.com/v1/gifs/search?q="+search+"&limit=100&api_key=dc6zaTOxFJmzC", function (error, response, body){
            if (error || response.statusCode !== 200) {
                fluffbot.reply(message, "Couldn't get an image");
            }
            else {
                response = JSON.parse(body);
                if (response.pagination.total_count > 100) {
                    var count = 100;
                } else {
                    var count = response.pagination.total_count;
                }
                if (count > 0) {
                    var random = Math.floor((Math.random() * count) + 1);
                    var gif = response.data[random].url;
                    fluffbot.reply(message, gif);
                } else {
                    fluffbot.reply(message, "No image found");
                }
            }
        });
    }
});

function searchBuild(search) {

    var formattedTerms;
    var terms = new Array();

    for (var i = 1; i < search.length; i++) {
        terms.push(search[i]);
    }

    formattedTerms = terms.join('+');

    return formattedTerms;
}
