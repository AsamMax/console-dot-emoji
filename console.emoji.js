/**
 *
 *  Inspired by and based on Console.frog.
 *
 *  MIT licensed
 */


function camelize(str) {
    return str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}

// see https://blog.jonnew.com/posts/poo-dot-length-equals-two
function fancyCount(str) {
    const joiner = "\u{200D}";
    const split = str.split(joiner);
    let count = 0;

    for (const s of split) {
        //removing the variation selectors
        const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length;
        count += num;
    }

    //assuming the joiners are used appropriately
    return count / split.length;
}

(function dothething() {

    // Act on either the window.console, or the normal console.
    var con = console;
    if (typeof (window) !== 'undefined') {
        con = window.console;
    }

    fetch("https://unpkg.com/emoji.json/emoji.json")
        .then(response => response.json())
        .then(json => generateAliases(json));


    con.emoji = function () {

        // Gets args as a string
        var args = Array.prototype.slice.call(arguments);
        var emoji = args.shift()
        var stringOfArgs = args.join(' ');

        // Well maybe emoji isn't a emoji
        var whitespace = " ".repeat(fancyCount(emoji) + 3);

        var result = [
            "",
            whitespace,
            emoji + " ",
            whitespace
        ];

        // Add the bubble if there is something to log!
        if (stringOfArgs.length > 0) {
            result[1] = result[1] + "  ---" + ("-".repeat(stringOfArgs.length)) + "--";
            result[2] = result[2] + "-(   " + stringOfArgs + "   )";
            result[3] = result[3] + "  ---" + ("-".repeat(stringOfArgs.length)) + "--";
        }

        // Log everything!
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
        }
    }

    function generateAliases(obj) {
        // noinspection JSUnfilteredForInLoop
        for (const emoji of obj) {
            var name = emoji.name;
            name = name.replaceAll(": ", " ")
            name = camelize(name)
            console[name] = con.emoji.bind(con, emoji.char)

        }

    }
})();
