// Dependancies
var request = require('request')
var event = require('../lib/event')
// Below is needed to keep the message obj visible
var messageObj

// Main class Constructor
var YT = function Constructor(message, owner, bot, settings){
	messageObj = message
	this.searchTerm = searchBuild(message.content.split(" "))
}

// Main run function
YT.prototype.run = function() {
	return this.getVideo()
}

// Get a random gif based on the search term provided
YT.prototype.getVideo = function() {
	request("https://decapi.me/youtube/videoid?search="+this.searchTerm, function (error, response, body){
		if (error || response.statusCode !== 200) {
			event.bus.sendEvent('response', messageObj,  "Couldn't get an video")
		}
		else {
			response = body
			if (typeof(response) != '') {
				event.bus.sendEvent('message', messageObj, 'https://www.youtube.com/watch?v='+response)
			} else {
				event.bus.sendEvent('response', messageObj, "No video found")
			}
		}

	})

}

// Format the search terms for API call
function searchBuild(search) {

    var formattedTerms;
    var terms = new Array();

    for (var i = 1; i < search.length; i++) {
        terms.push(search[i]);
    }

    formattedTerms = terms.join('+');

    return formattedTerms;
}

module.exports = YT
