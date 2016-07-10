// Dependancies
var request = require('request')
var event = require('../lib/event')
// Below is needed to keep the message obj visible
var messageObj

// Main class Constructor
var Img = function Constructor(message, owner, bot, settings){
	messageObj = message
	this.searchTerm = searchBuild(message.content.split(" "))
	this.settings = settings
}

// Main run function
Img.prototype.run = function() {
	return this.getImgur()
}

// Get a random gif based on the search term provided
Img.prototype.getImgur = function() {
	var options = {
		url: "https://api.imgur.com/3/gallery/search?q="+this.searchTerm,
		headers: {
			"Authorization": "Client-ID "+this.settings.imgur
		}
	}
	request(options, function (error, response, body){
		if (error || response.statusCode !== 200) {
			event.bus.sendEvent('response', messageObj,  "Couldn't get an image")
		}
		else {
			response = JSON.parse(body)
			if (response.data.length != 0) {
				event.bus.sendEvent('message', messageObj, response.data[0].link)
			} else {
				event.bus.sendEvent('response', messageObj, "No image found")
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

module.exports = Img
