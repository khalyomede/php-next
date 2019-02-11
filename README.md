# php-next

Write modern PHP code.

![](https://img.shields.io/npm/v/php-next.svg?style=flat) ![](https://img.shields.io/npm/l/php-next.svg?style=flat)

Write modern PHP

```php
array_filter($posts, $post => $post->published);
```

And transpile it

```php
array_filter($posts, function($post) {
  return $post->published;
});
```

## Summary

- [Installation](#installation)
- [Examples](#examples)
- [Features list](#features-list)
- [Create features](#create-features)

## Installation

```bash
npm install --save-dev php-next@0.*
```

or

```bash
yarn add --dev php-next@0.*
```

## Examples

- [Example 1: basic usage](#example-1-basic-usage)

### Example 1: basic usage

```javascript
const phpNext = require('php-next');
const arrowFunction = require('php-next-arrow-function');

const transpiled = phpNext('./path/to/file.php', {
    features: [arrowFunction]
});
```

## Features list

If you want your feature to be listed here, please propose a Pull Request and update this file.

## Create features

Features are functions that returns a string, transpiling the code given in first parameter.

You can inspire from the `use-from` feature source code:

**lib/feature/use-from.js _(simplified)_**

```javascript
const useFrom = function (code) {
  return code.replace(/use(.+)from(.+);/g, function (match, classes, namespace) {
    // "DB, Session" becames ["DB", "Session"]
    const classList = classes.split(",");
    let statements = [];

    namespace = namespace.trim();

    // ["DB"] becames "use ...\DB;"
    for (const className of classList) {
      statements.push("use " + namespace + "\\" + className + ";");
    }

    return statements.join("\n");
  });
};

module.exports = useFrom;
```