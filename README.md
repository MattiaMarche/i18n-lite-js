# I18n Lite

`i18n-lite-js` is a Vanilla JS localization module created to add super simple JS translations to a website.


## Quick start

You can use it in any web page:

- Install the module (or copy the code)
- Import the script (assuming you installed this module in `node_modules/i18n-lite-js`): `<script src="/node_modules/i18n-lite-js/index.js"></script>`
- A `window._I18n` class is now ready!

### Initialization

Create an object containing translations (or parse a JSON):

```js
const translations = { "en": { "hello": "Hello" }, "it": { "hello": "Ciao" } };
```

Create a new instance:

```js
const _i18n = new window._I18n(
    translations,   // Object containing translations
    [ 'en', 'it' ], // Available languages as language codes
    'en',           // Default language as language code
    null,           // Current language as code: keep it null to let the class detect it from a 'lang' query parameter (if present), or from the browser's settings
    'lang-'         // Class: if you want JS to show and hide elements, set here the prefix for all CSS classes meant to define language based contents
);
```

### Usage

Now you just need to invoke the translation method with your instance:

```js
_i18n.t( 'hello' );
```

For example in contexts or methods:

```js
alert( _i18n.t( 'hello' ) );
```

Document writing:

```js
document.write( window._i18n.t( 'hello' ) );
```

Or templates:

```js
const welcomeModalTemplate = `<div><h3>` + _i18n.t( 'hello' ) + `</h3></div>`;
```

### Classes

If you specified the `class` parameter now you can add classes to your HTML elements to show them only when the correct language is selected:

```html
<a class="lang-en" href="./index.html?lang=en">English</a>
<a class="lang-it" href="./index.html?lang=it">Inglese</a>
```


## Demo

This repo comes with a fully working demo:

- `/demo/index.html`


## Why Vanilla JS?

Initially used for personal projects with common needs:

- Simplicity
- Small codebase
- No technical debt
- Keep maintenance costs low

Those projects evolved:

- Strategy Board Game: [Echoes of Battles](https://echoes-of-battles.com)
- Book: [Echo](https://echo-myth.com)

So the slideshow evolved into a separated module with no dependencies:
- Easy to use
- Performance friendly
- Easy to maintain

### TypeScript

Want to use it in TypeScript or scoped? No problem!

[Just ask me!](mailto:info@mattiamarchesini.com)


## Author

- Name: Mattia
- Surname: Marchesini
- Email: [info@mattiamarchesini.com](info@mattiamarchesini.com)
- Country: Italy


## License

This project is licensed under the **Attribution License (MIT-Style)**. 
You are free to use and modify the code, would be really appreciated if you give credit to the original author.

© 2025 [Mattia Marchesini](https://github.com/MattiaMarche)