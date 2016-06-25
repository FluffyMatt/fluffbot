// Dependancies
var request = require('request')
var event = require('../lib/event')
// Below is needed to keep the message obj visible
var messageObj

// Main class Constructor
var Gif = function Constructor(message, owner, bot){
	messageObj = message
	this.searchTerm = searchBuild(message.content.split(" "))
}

// Main run function
Gif.prototype.run = function() {
	return this.getGif()
}

// Get a random gif based on the search term provided
Gif.prototype.getGif = function() {
	request("http://api.giphy.com/v1/gifs/search?q="+this.searchTerm+"&limit=100&api_key=dc6zaTOxFJmzC", function (error, response, body){
		if (error || response.statusCode !== 200) {
			event.bus.sendEvent('response', messageObj,  "Couldn't get an image")
		}
		else {
			response = JSON.parse(body)
			if (response.pagination.total_count > 100) {
				var count = 100
			} else {
				var count = response.pagination.total_count
			}
			if (count > 0) {
				var random = Math.floor((Math.random() * count) + 1);
				var gif = response.data[random].url
				event.bus.sendEvent('response', messageObj, gif)
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

module.exports = Gif
