# is-async-func

[![Greenkeeper badge](https://badges.greenkeeper.io/loklaan/is-async-func.svg)](https://greenkeeper.io/)

![size](https://img.shields.io/badge/size-282%20B-grey.svg)
![dependencies](https://img.shields.io/badge/dependencies-0-grey.svg)
[![Travis](https://img.shields.io/travis/loklaan/is-async-func.svg)](https://travis-ci.org/loklaan/is-async-func)
[![Codecov](https://img.shields.io/codecov/c/github/loklaan/is-async-func.svg)](https://codecov.io/gh/loklaan/is-async-func)

Check if a value is an async function, from ES2017 specification

Supports runtime implementations, as well as babel transpiled code.

```js
const isAsyncFunction = require('is-async-func');

isAsyncFunction(async function () {})
// true

isAsyncFunction(async function foo () {})
// true

isAsyncFunction(async () => {})
// true

const foo = { async bar () {} }
isAsyncFunction(foo.bar)
// true

const foo = { bar: async function () {} }
isAsyncFunction(foo.bar)
// true

const foo = { bar: async () => {} }
isAsyncFunction(foo.bar)
// true

class Foo () {
  async bar () {}
}
isAsyncFunction((new Foo()).bar)
// true
```

## Install

```shell
npm install is-async-func
# yarn add is-async-func
```

## Should I use this?

For runtimes that support async/await, yes!

For transpiled async/await, probably! :grimacing:  
The transpilation tests cover many different combinations of async declarations and babel transform presets, but the transpiled detection generally takes a hacky approach. Probably-definitely don't use this in hot code.

## License

Licensed under the MIT License, Copyright © 2017 Lochlan Bunn.