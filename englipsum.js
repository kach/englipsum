var englipsum = function() {
    var dict = {
        "nouns": ["server", "client", "frontend", "backend", "programmer", "hacker", "content", "style", "script", "software", "network", "uptime", "template", "framework", "cache", "host", "domain", "service", "database", "content-delivery network", "repository", "dependency", "bot", "spam", "API", "blog", "link", "optimization", ["search", "engine"], "crawler", "query", "authentication", "cookie", "crypto", "algorithm", "module", "browser"],
        verbs: ["fixes", "breaks", "installs", "uninstalls", "crushes", "smells", "destroys", "adores", "loves", "defeats", "catches", "finds", "kicks", "embodies", "represents", "saves", "addresses", "pings"],
        adjs: ["impatient", "sullen", "happy", "unhappy", "strong", "weak", "rare", "brilliant", "stuffed", "young", "old", "annoying", "smart", "hard-working", "mature", "immature", "big", "small", "first", "second", "third", "last", "fast", "slow"],
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
        startlink: {
            "default": "_",
            "html": "<a href='http://example.com/?" + Math.random() + "'>",
            "md": "["
        },
        endlink: {
            "default": "_",
            "html": "</a>",
            "md": "](http://example.com/?id=" + Math.random() + ")"
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




    function makeparagraph(options) {
        var noun = $.ch( (options.dict && options.dict.nouns) || dict.nouns);
        var cn = $.lit(
            $.ch(["the", "every", "this", "that", "one"]),
            $.mb($.ch( (options.dict && options.dict.adjs) || dict.adjs)),
            noun
        );
        var pf = $.lit($.ch(dict.preps), cn);
        var simple = $.lit(
            cn,
            $.mb(
                $.ch( (options.dict && options.dict.adverbs) || dict.advs)
            ),
            $.ch( (options.dict && options.dict.verbs) || dict.verbs),
            cn,
            $.mb(pf)
        );
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
            [punct.open, simple, punct.comma, punct.close, "says", cn],
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
        
        var tokens = [];
        for (var i=0; i< (options.sentences || 3); i++) {
            tokens = tokens.concat($.crush(sentence));
        }
        return format(tokens, options);
    }

    function format(words, options) {
        options = options || {};
        var output = "";
        var shouldCapitalize = true;
        var dontspace = false;
        for (var i=0; i<words.length; i++) {
            var tok = words[i];
            if (tok.constructor === String) {
                var space = dontspace ? "" : " ";
                dontspace = false;
                if (shouldCapitalize) {
                    output += space + tok.charAt(0).toUpperCase();
                    output += tok.substring(1);
                    shouldCapitalize = false;
                } else {
                    if (options.links && Math.random() < 0.01) {
                        output += space + punct.select(punct.startlink, options.target) +
                            tok + punct.select(punct.endlink, options.target);
                    } else if (options.ems && Math.random() < 0.03) {
                        output += space + punct.select(punct.startem, options.target) +
                            tok + punct.select(punct.endem, options.target);
                    } else {
                        output+= space + tok.toString();
                    }
                }
            } else {
                if (tok === punct.open || tok === punct.lparen) {
                    output += " ";
                }
                output += punct.select(tok, options.target);
                if (tok === punct.period || tok === punct.exclamation) {
                    shouldCapitalize = true;
                }
                if (tok === punct.open || tok === punct.dash || tok === punct.lparen) {
                    dontspace = true;
                }
            }
        }
        return output;
    };

    function generate(options) {
        var str = "";
        for (var i=0; i< (options.paragraphs || 5); i++) {
            str += punct.select(punct.startpara, options.target) +
                makeparagraph(options) +
                punct.select(punct.endpara, options.target);
        }
        return str;
    }

    
    // Programmatical beaurocracy.
    var exp = generate;
    if (typeof window === 'undefined') {
        module.exports = exp; // Node friendly :D
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
