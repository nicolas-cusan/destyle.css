# Destyle

Opinionated reset stylesheet that provides a clean styling slate for your project. All spacing (margin & padding) and font-sizing is removed and set to be inherited from its parent.

This approach allows for a clean slate when starting a new project and avoids having to reset styles when creating different styled instances of the same element.

Like normalize.css just what needs reseting is reset to avoid bloat in the browsers style-inspector.

## Installation & Usage

Install with npm or download on github

## Rules & Caveats

-   The box model is reset to `border-box`
-   `code`, `pre` and other _code_ elements maintain a monospaced font-family
-   `hr` is set to be a solid 1px line that inherits its color from its parent's text color
-   Inline elements that carry style (`b`, `i`, `strong`, etc.) are not reset as they, apart from their semantics (if they have any), they only provide a single style and are easy to overwrite.
-   `textarea` maintains its natural height
-   `select` is reset using `appearance: none` which is not cross-browser be advised when styling custom selects

## Credits

This project is heavily inspired by normalize.css and the original reset by Eric Meyer.
