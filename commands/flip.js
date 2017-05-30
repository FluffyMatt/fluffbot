// Event dependancy
var event = require('../lib/event')

// Flip class initialisation
var Flip = function Constructor(message, owner, bot, settings) {
	this.message = message
	this.mentionsOwner = owner
	this.mentionsBot = bot
	this.response
}

// Main run function
Flip.prototype.run = function() {
	if (!this.mentionsOwner && !this.mentionsBot) {
		this.respond()
	}
	if (this.mentionsOwner) {
		this.ownerResponse()
	}
	if (this.mentionsBot) {
		this.botResponse()
	}
}

// Called if bot is mentiond for flipping
Flip.prototype.botResponse = function() {
	event.bus.sendEvent('response', this.message, "How dare you? Let's see how you like it! (╯°□°）╯︵ "+flipString(this.message.author.username))
}

// Called if owner is mentioned for flipping
Flip.prototype.ownerResponse = function() {
	event.bus.sendEvent('response', this.message,  "https://media.giphy.com/media/3o85xuO1siCT147FrG/giphy.gif")
}

// Main flip response call
Flip.prototype.respond = function() {
	if (this.message.mentions.members.size == 0) {
		event.bus.sendEvent('response', this.message,  "Invalid user")
	} else {
		event.bus.sendEvent('response', this.message,  "(╯°□°）╯︵ "+flipString(this.message.mentions.users.first().username))
	}
}

// Build the flip string
function flipString(aString) {
    var last = aString.length - 1;
    var result = new Array(aString.length)
    for (var i = last; i >= 0; --i) {
        var c = aString.charAt(i)
        var r = flipTable[c]
        result[last - i] = r != undefined ? r : c
    }
    return result.join('')
}

// Variabl containing upside down chars
var flipTable = {
    a : 'ɐ',
    b : 'q',
    c : 'ɔ',
    d : 'p',
    e : 'ǝ',
    f : 'ɟ',
    g : 'ƃ',
    h : 'ɥ',
    i : 'ᴉ',
    j : 'ɾ',
    k : 'ʞ',
    l : 'l',
    m : 'ɯ',
    n : 'u',
    o : 'o',
    p : 'd',
    q : 'b',
    r : 'ɹ',
    s : 's',
    t : 'ʇ',
    u : 'n',
    v : 'ʌ',
    w : 'ʍ',
    x : 'x',
    y : 'ʎ',
    z : 'z',
    A : '∀',
    B : 'q',
    C : 'Ɔ',
    D : 'p',
    E : 'Ǝ',
    F : 'Ⅎ',
    G : 'פ',
    H : 'H',
    I : 'I',
    J : 'ſ',
    K : 'ʞ',
    L : '˥',
    M : 'W',
    N : 'N',
    O : 'O',
    P : 'Ԁ',
    Q : 'Q',
    R : 'ᴚ',
    S : 'S',
    T : '┴',
    U : '∩',
    V : 'Λ',
    W : 'M',
    X : 'X',
    Y : '⅄',
    Z : 'Z',
}

module.exports = Flip
