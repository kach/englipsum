The accepted Lorem Ipsum text is inherently messy. It has different character ratios and prevalent digraphs. The words are foreign to most of us, so they attract attention. There's barely any interesting formatting, because Cicero didn't have hyperlinks.

Englipsum solves those problems.

It generates grammatically-valid English that makes sense in context. It looks right, thus allowing itself to be ignored.

## Usage

Simply include `englipsum.js` in your HTML file. Elements of class `englipsum` will be populated with placeholder text automatically.

    <div class="englipsum"></div>

You can customize settings by including JSON in the element:

    <div class="englipsum">
    {
        "paragraphs": 3,
        "links": true
    }
    </div>

## Reference

| Property     | Value |
| ------------ | ----- |
| `paragraphs` | The number of paragraphs to generate |
| `sentences`  | The number of sentences per paragraph |
| `links`      | Generate random links? (they are uniquely stamped so that testing `a:visited` is easy) |
| `ems`        | Italicize random words? |
| `dict`       | Provide your own dictionary. Object with fields (all optional) `nouns`, `verbs`, `adjs`, `advs` |
