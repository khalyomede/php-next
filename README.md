# php-next

Write modern PHP code.

![](https://img.shields.io/npm/v/php-next.svg?style=flat) ![](https://img.shields.io/npm/l/php-next.svg?style=flat)

Modern PHP

```php
namespace Khalyomede;

class Arr {
  protected array $array;

  public __construct(array $array) => {
    $this->array = $array;
  }

  public first(int $nthFirsts = 1) => $this->slice(0, $nthFirsts);

  public slice(int $offset, int $length) => array_slice($this->array, $offset, $length);
}
```

Transpiled

```php
namespace Khalyomede;

class Arr
{
  protected $array;

  public function __construct(array $array) {
    $this->array = $array; 
  }

  public function first(int $nthFirst = 1) { return $this->slice(0, $nthFirst); }

  public function slice(int $offset, $length = null) { return array_slice($this->array, $offset, $length); }
}
```

## Summary

- [Installation](#installation)
- [Examples](#examples)
- [Shipped features](#shipped-features)
- [Create features](#create-features)

## Installation

```bash
npm install --save php-next@0.*
```

or

```bash
yarn add php-next@0.*
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

## Shipped features

- [arrow-function](#arrow-function)
- [for-in](#for-in)
- [short-method](#short-method)
- [use-from](#use-from)

### arrow-function

```php
class Arr {
  protected $array;

  public filter(callable $function): Arr => {
    $this->array = array_filter($this->array, $function);

    return $this;
  }

  public first() => $this->array[0];
}
```

```php
class Arr {
  protected $array;

  public function filter(callable $function): Arr  {
    $this->array = array_filter($this->array, $function);

    return $this;
  }

  public function first() { return $this->array[0]; }
}
```

### foreach-in

```php
for ($item in $array) {
    // ...
}
```

```php
foreach($array as $item) {
    // ...
}
```


### short-method

```php
public __construct() {}

protected first() {}

private static slice(int $offset, int $length) {}
```

```php
public function __construct() {}

protected function first() {}

private static function slice(int $offset, int $length) {}
```

### use-from

```php
use DB, Request, Crypt from Illuminate\Support\Facades;
```

```php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Crypt;
```

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