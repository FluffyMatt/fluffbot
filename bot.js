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
    if (message.content.indexOf("!flip") > -1) {
        if (message.mentions.length > 0) {
            if (message.mentions[0].username == 'FluffBot') {
                fluffbot.reply(message, "How dare you? Let's see how you like it! (╯°□°）╯︵ "+flipString(message.author.username));
            } else if (message.mentions[0].username == 'FluffyMatt') {
                fluffbot.reply(message, "https://media.giphy.com/media/3o85xuO1siCT147FrG/giphy.gif");
            } else {
                fluffbot.reply(message, "(╯°□°）╯︵ "+flipString(message.mentions[0].username));
            }
        } else {
        	fluffbot.reply(message, coin[Math.floor((Math.random() * 2) + 1)]);
        }
    }
    if (message.content.indexOf("!seppuku") > -1) {
        fluffbot.reply(message, "pulls out their tantō and disembowels themselves!");
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

var coin = {
    1 : 'Heads',
    2 : 'Tails'
}
