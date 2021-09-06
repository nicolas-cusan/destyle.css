# destyle.css

[![npm][npm-image]][npm-url] [![license][license-image]][license-url]

Opinionated [reset stylesheet](https://cssreset.com/what-is-a-css-reset/) that provides a clean slate for styling your html.

## Benefits

- Ensures consistency across browsers as much as possible
- Prevents the necessity of reseting user agent styles
- Prevents style inspector bloat by only targeting what is necessary
- Removes margins & paddings
- Removes default font styles and ensures proper inheritance
- Contributes to the separation of presentation and semantics
- Sets sensible default styles (see [rules](#rules))
- Well suited for utility class libraries and large codebases
- Supports modern browsers, therefor is small in size (~0.95kb, minified gzipped)

## Installation

```shell
$ npm install --save destyle.css
```

- Download: https://raw.githubusercontent.com/nicolas-cusan/destyle.css/master/destyle.css
- CDN: https://classic.yarnpkg.com/en/package/destyle.css

## Usage

Include `destyle.css` in the `head` of your HTML file before your main stylesheet.

### Recommended

Add your base font and color styles to the `html` or `body` element in your stylesheet, all other elements will inherit the style from the body.

```css
/* app.css */

html {
  color: #333;
  font: 16px/1.4 "Helvetica Neue", sans-serif;
}
```

### Styling generated content

It is discouraged to define styles for raw html tags apart from `body` and `html`, use classes (or any other selectors / system) for styling.

If you need to create styles for tags generated by a CMS or markdown wrap them in a class (e.g. `.type`).

```css
.type h1 {
  /* styles */
}

.type h2 {
  /* styles */
}
```

```html
<div class="type">{{ generated_markup_goes_here }}</div>
```

## Rules

- The box model is set to `border-box` for `*`, `::before` and `::after`.
- The `border-style` is set to `solid` for `*`, `::before` and `::after` and the `border-width` is set to 0 (to hide the borders).
- `code`, `pre`, `kbd`, `samp` maintain a monospaced font-family.
- `hr` is set to be a solid 1px line using `border-top` that inherits its color from its parent's `color` property.
- Inline elements that carry style (`b`, `i`, `strong`, etc.) are not reset.
- `canvas` and `iframe` maintain their default width and height (varies depending on the browser).
- `button`, `select`, `textarea` and `input` (except `[type='checkbox']` and `[type='radio']`), are reset using `appearance: none`.
- `textarea` maintains its default height.
- `meter` and `progress` elements are not reset.
- Replaced content like `img`, `iframe` and `svg` use `vertical-align: bottom` to prevent alignment issues.
- Focusable elements retain a focus outline, style depends on browser.

## Caveats

- `range` & `color` inputs are affected by `appearance: none` but are not completely destyled (varies depending on the browser).
- `button` elements that have a fixed `height` will center its content vertically (can not be reset).

## Examples

### Headings

An `h1` might need to be bold & large in some context (e.g. at the top of a text page) but might be small and inconspicuous in others (e.g. on a settings page in an app).

Creating two different styles for `h1` is made easy, only the properties for the respective desired visual results have to be applied, there is no need to overwrite default styles, all while maintaining semantics.

```css
/* No reseting of the user agent styles necessary,
 * just take care of making things look how you want to. */

/* Bold, large title */
.main-title {
  font-size: 3em;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Just some padding and gray color, otheriwse looks like normal text */
.secondary-title {
  color: gray;
  padding: 10px;
}
```

```html
<!-- article.html -->
<h1 class="main-title">Large title</h1>

<!-- profile.html -->
<h1 class="secondary-title">Small title</h1>

<!-- Looks the same as `h1.secondary-title` -->
<p class="secondary-title">Other small title</p>
```

### Buttons

`button` tags have a lot of default styles that can make them cumbersome to use from a styling perspective, especially if they should look like plain links or need to wrap some other content, but `button` tags are the recommended elements to use as click targets for user interactions. Falling back to using `<a href="#">` even with `role="button"` is [not recomended](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) from an accessibility standpoint as screen readers will recognize `button`s as interactive elements by default and treat them accordingly. `a` should be used when there is the need to link to a page via `href`.

<!-- prettier-ignore-start -->
destyle.css resets buttons completely to make them usable as any other element <small>* see note [below](#caveats)</small>.
<!-- prettier-ignore-end -->

```css
/* Make anything look like a link, even a <button> */
.link {
  color: lightblue;
  text-decoration: underline;
}

/* Make anything look like a button
 * font styles will be inheritet from the parent */
.btn {
  padding: 0.2em 0.5em;
  border-radius: 0.2em;
  background-color: blue;
  color: white;
  text-align: center;
}

.block {
  display: block;
  width: 100%;
}
```

```html
<!-- Make it look like a link -->
<button class="link">Interactive link</button>

<!-- Make anchor look like a button -->
<a href="page.html" class="btn">Link that looks like a button</a>

<!-- Use as block level element -->
<button class="block">
  <img src="..." alt="..." />
</button>
```

## Changelog

- **v3.0.0.** 2021-09-03
  - Remove IE support 🎉
  - Bring back `outline` for focusable elements
  - Remove redundant `line-height: inherit` rule from headings reset
  - Remove redundant `text-decoration` rule from `abbr`
  - Added `svg` selector to replaced content rule
  - Added `text-transform: inherit` rule to form elements
  - Replaced `[disabled]` selector with `:disabled`
  - Removed `::-moz-focus-inner` rules for old Firefox versions
  - Improved `:-moz-focusring` style, no more dotted outline
  - Destyled `select:disabled` in Chrome
  - Add outline to focused `[contenteditable]` elements
  - Fixed border color inheritance for `table` borders in Chrome
- **v2.0.0.** 2020-10-15 - Add `border-style: solid` and `border-width: 0` to `*, ::before, ::after` selector. This change might affect how borders are used and therefor is considered a breaking change. The benefit is that simply adding a border-width to an element will display a border without the need to set the border-style explicitly.

## Why?

[Eric Meyer's reset](https://meyerweb.com/eric/tools/css/reset/) resets properties on elements that do not need it, are unused or even deprecated, this creates bloat in the browser's style inspector which makes developing and debugging less efficient. [Normalize.css](https://github.com/necolas/normalize.css) makes elements look consistent across browsers and it does it well, but it does not remove the user agent's assumptions about how things look. Destyle.css targets both reseting & normalization.

Compare the results [here](https://nicolas-cusan.github.io/destyle.css/compare.html).

## Credits

This project is heavily inspired by [normalize.css](https://github.com/necolas/normalize.css) and the original [reset](https://meyerweb.com/eric/tools/css/reset/) by Eric Meyer. The source of the test page is from [html5-test-page](https://github.com/cbracco/html5-test-page) with some additions.

Tested with:

<a href="https://www.browserstack.com">
  <img src="assets/Browserstack-logo.svg?sanitize=false" alt="browserstack" width="160">
</a>

[license-image]: https://img.shields.io/npm/l/destyle.css.svg?style=flat-square
[license-url]: LICENSE
[npm-image]: https://img.shields.io/npm/v/destyle.css.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/destyle.css

<!-- Outline -->
