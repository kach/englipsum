# Englipsum

See http://hardmath123.github.io/englipsum.

## Usage

Simply include `englipsum.js` in your HTML file:

```html
<script src="https://github.com/Hardmath123/englipsum/raw/gh-pages/englipsum.js"></script>
```
OR (an easy-to-remember-but-not-guaranteed-to-always-exist alternative)
```html
<script src="http://is.gd/englipsum"></script>
```
OR (an it-works-offline-but-I-need-to-download-a-file alternative)
```html
$ curl https://github.com/Hardmath123/englipsum/raw/gh-pages/englipsum.js > englipsum.js
<script src="englipsum.js"></script>

```

Elements of class `englipsum` will be populated with placeholder text automatically.

```html
<div class="englipsum"></div>
```

You can customize settings by including JSON in the element:

```html
<div class="englipsum">
{
    "paragraphs": 3,
    "links": true
}
</div>
```

## Reference

| Property     | Value |
| ------------ | ----- |
| `paragraphs` | The number of paragraphs to generate |
| `sentences`  | The number of sentences per paragraph |
| `links`      | Generate random links? (they are uniquely stamped so that testing `a:visited` is easy) |
| `ems`        | Italicize random words? |
| `dict`       | Provide your own dictionary. Object with fields (all optional) `nouns`, `verbs`, `adjs`, `advs` |
| `dict`       | Reference a provided dictionary. Possible values: `"farm"` |

## Examples

Create a to-do list:

```html
<ol>
    <li class="englipsum"> {"sentences": 1, "paragraphs": 1}</li>
    <li class="englipsum"> {"sentences": 1, "paragraphs": 1}</li>
    <li class="englipsum"> {"sentences": 1, "paragraphs": 1}</li>
    <li class="englipsum"> {"sentences": 1, "paragraphs": 1}</li>
</ol>
```

Placeholder text about animals:

```html
<div class="englipsum">
{
    "dict": {
        "nouns": ["cow", "pig", "sheep", "fish", "farmer", "tractor"],
        "verbs": ["makes", "grows", "works", "produces", "helps"]
    }
}
</div>
```

## Node

Englipsum is published on `npm`. I'm not sure how it'll help you, but feel free to `npm install englipsum`.

## Contributing

Yeah. PRs are appreciated. Ideally, there would be larger dictionaries, and more phrases.
