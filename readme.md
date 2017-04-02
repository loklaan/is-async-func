# is-async-func

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
The transpilation tests cover many different combinations of async declarations and babel transform presets, but the transpiled detection generally takes a hacky approach. Propbably definitely don't use this in hot code.

## License

Licensed under the MIT License, Copyright © 2017 Lochlan Bunn.