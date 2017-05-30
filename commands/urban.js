// Dependancies
var request = require('request')
var event = require('../lib/event')
// Below is needed to keep the message obj visible
var messageObj

// Main class Constructor
var Urban = function Constructor(message, owner, bot, settings){
	messageObj = message
	this.search = searchBuild(message.content.split(" "), ' ')
	this.searchTerm = searchBuild(message.content.split(" "), '+')
}

// Main run function
Urban.prototype.run = function() {
	return this.getUrban()
}

// Get a random gif based on the search term provided
Urban.prototype.getUrban = function() {
	var search = this.search
	request("http://api.urbandictionary.com/v0/define?term="+this.searchTerm, function (error, response, body){
		if (error || response.statusCode !== 200) {
			event.bus.sendEvent('response', messageObj,  "Couldn't get a definition")
		}
		else {
			response = JSON.parse(body)
			console.log(response.list);
			if (response.result_type != 'no_results') {
				event.bus.sendEvent('message', messageObj, '**'+search+'** \n ```'+response.list[0].definition+'``` \n **Example:** '+response.list[0].example)
			} else {
				event.bus.sendEvent('response', messageObj, "No definition found")
			}
		}

	})

}

// Format the search terms for API call
function searchBuild(search, joinBy) {

    var formattedTerms;
    var terms = new Array()

    for (var i = 1; i < search.length; i++) {
        terms.push(search[i])
    }

    formattedTerms = terms.join(joinBy);
    return formattedTerms
}

module.exports = Urban
