The accepted Lorem Ipsum text is inherently messy. It has different character ratios and prevalent digraphs. The words are foreign to most of us, so they attract attention. There's barely any interesting formatting, because Cicero didn't have hyperlinks.

Englipsum solves those problems.

It generates grammatically-valid English that makes sense in context. It looks right, thus allowing itself to be ignored. Englipsum pays attention to the little details that make text natural-looking. The default dictionary includes words found on most tech-ey websites.

## Usage

Simply include `englipsum.js` in your HTML file. Elements of class `englipsum` will be populated with placeholder text automatically.

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
