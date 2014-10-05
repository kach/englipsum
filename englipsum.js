var englipsum = function() {
    var dict = {
        nouns: ["person", "friend", "father", "mother", "brother", "sister", "son", "daughter", "boy", "girl", "man", "woman", "child", "teacher", "musician", "knight", "warrior", "ninja", "tailor", "sailor", "farmer", "politician", "pilot", "swimmer", "diver", "golfer", "hacker", "truth", "metaphor", "allegory", "program", "villain", "demigod", "webpage", "guardian", "prisoner", "champion", "doctor", "nurse", "athlete", "coach", "captain", "alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile", "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "hamster", "hippopotamus", "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark", "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"], 
        verbs: ["eats", "crushes", "smells", "hugs", "teaches", "destroys", "adores", "loves", "defeats", "catches", "finds", "kicks", "licks", "embodies", "represents", "saves", "addresses", "consoles", "pardons", "accuses"],
        adjs: ["red", "blue", "impatient", "sullen", "happy", "unhappy", "strong", "weak", "purple", "rare", "brilliant", "stuffed", "young", "old", "rich", "poor", "annoying", "smart", "hard-working", "mature", "immature", "big", "small"],
        advs: ["calmly", "occasionally", "often", "intentionally", "silently", "secretly", "halfheartedly", "instinctively", "never", "always", "decisively", "responsibly"],
        preps: ["near", "beside", "disregarding", "despite"]
    };

    function argsToArray(a) {
        var ans = [];
        for (var i=0; i<a.length; i++) {
            ans.push(a[i]);
        }
        return ans;
    }
    var $ = {
        lit: function() {
            var a = argsToArray(arguments);
            return function() {
                return a;
            };
        },
        ch: function(a) {
            return function() {
                return a[Math.floor(Math.random()*a.length)];
            };
        },
        kl: function(a) {
            var rand = function() {
                if (Math.random() < 0.3) {
                    return $.lit(a, rand());
                } else {
                    return a;
                }
            }
            return rand;
        },
        mb: function(a) {
            return function() {
                if (Math.random() < 0.3) {
                    return a;
                } else {
                    return $.lit();
                }
            };
        },
        crush: function(structure) {
            var flat = [];
            function flatten(s) {
                if (s.constructor === Array) {
                    for (var i=0; i<s.length; i++) {
                        flatten(s[i]);
                    }
                } else if (s.constructor === Function) {
                    flatten(s());
                } else {
                    flat.push(s);
                }
            }
            flatten(structure);
            return flat;
        }
    };



    var punct = {
        select: function(mark, type) {
            return mark[type || "default"] || mark["default"];
        },
        startpara: {
            "default": "",
            "html": "<p>",
            "plain": "    "
        },
        endpara: {
            "default": "\n\n",
            "html": "</p>\n\n",
        },
        startem: {
            "default": "*",
            "html": "<em>",
            "tex": "\\textit{",
            "md": "*"
        },
        endem: {
            "default": "*",
            "html": "</em>",
            "tex": "}",
            "md": "*"
        },
        comma: {
            "default": ","
        },
        semicolon: {
            "default": ";"
        },
        period: {
            "default": "."
        },
        exclamation: {
            "default": "!"
        },
        open: {
            "default": "\"",
            "html": "<q>",
            "tex": "``",
        },
        close: {
            "default": "\"",
            "html": "</q>",
            "tex": "\""
        },
        dash: {
            "default": "---",
            "html": "&mdash;",
            "tex": "---",
            "md": "--",
            "plain": "---"
        },
        lparen: {
            "default": "("
        },
        rparen: {
            "default": ")"
        }
    };


    var noun = $.ch(dict.nouns);
    var cn = $.lit($.ch(["the", "every", "this", "that", "one"]), $.mb($.ch(dict.adjs)), noun);
    var pf = $.lit($.ch(dict.preps), cn);
    var simple = $.lit(cn, $.mb($.ch(dict.advs)), $.ch(dict.verbs), cn, $.mb(pf));
    var compound = $.ch([
        ["when", simple, punct.comma, simple],
        ["if", simple, punct.comma, "then", simple],
        ["while", simple, punct.comma, simple],
        [simple, "until", simple],
        ["sometimes", simple],
        ["since", simple, punct.comma, simple],
        [simple, punct.semicolon, simple],
        ["meanwhile", punct.comma, simple],
        ["however", punct.comma, simple],
        ["even", "though", simple, punct.comma, simple],
        ["as", "they", "say", punct.comma, punct.open, simple, punct.close],
        [punct.open, simple, punct.comma, punct.close, "said", cn],
        [simple, punct.comma, "but", simple],
        [simple, punct.comma, "therefore", simple],
        [simple, punct.comma, "however", punct.comma, simple],
        ["consequently", punct.comma, simple],
        ["it", "is", "worth", "noting", "that", simple],
        ["anyhow", punct.comma, simple],
        [simple, punct.dash, "even", "if", simple],
        [simple, punct.lparen, "even", "though", simple, punct.rparen]
    ]);
    var sentence = $.lit($.ch([simple, compound]), $.ch([punct.period, punct.period, punct.period, punct.exclamation]));

    function format(words, options) {
        options = options || {};
        var output = "";
        var shouldCapitalize = true;
        for (var i=0; i<words.length; i++) {
            var tok = words[i];
            if (tok.constructor === String) {
                if (shouldCapitalize) {
                    output += " " + tok.charAt(0).toUpperCase();
                    output += tok.substring(1);
                    shouldCapitalize = false;
                } else {
                    output+= " " + tok.toString();
                }
            } else {
                output += punct.select(tok, options.target);
                if (tok === punct.period || tok === punct.exclamation) {
                    shouldCapitalize = true;
                }
            }
        }
        return output;
    };

    function makeparagraph(options) {
        var tokens = [];
        for (var i=0; i< (options.sentences || 5); i++) {
            tokens = tokens.concat($.crush(sentence));
        }
        return format(tokens, options);
    }

    function generate(options) {
        var str = "";
        for (var i=0; i< (options.paragraphs || 3); i++) {
            str += punct.select(punct.startpara, options.target) +
                makeparagraph(options) +
                punct.select(punct.endpara, options.target);
        }
        return str;
    }

    var exp = generate;
    if (typeof window === 'undefined') {
        module.exports = exp;
    } else {
        window.addEventListener("load", function() {
            [].forEach.call(document.getElementsByClassName("englipsum"), function(el) {
                var opts = {};
                try {
                    opts = JSON.parse(el.innerText);
                } catch(e) {
                }
                opts.target = "html";
                el.innerHTML = englipsum(opts);
            });
        });
    }
    return exp;
}();
