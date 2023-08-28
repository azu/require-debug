# `require` debug

CommonJS `require` debug.

## Usage

    node --require ./require-hooks.js src/main.js

Node.js's [--require module](https://nodejs.org/api/cli.html#-r---require-module) loads `module` before executing `src/main.js`.

## What's this?

`require-hooks.js` add logging to `require` function.
It will log the time spent on loading each module.

```js
const MODULE = require('module');
const orig = MODULE._load;
MODULE._load = function (request) {
    const start = Date.now();
    console.log(`Loading ${request}...`);
    const exports = orig.apply(this, arguments);
    const end = Date.now();
    console.log(`Loaded ${request} in ${end - start}ms`);
    return exports;
};
```

If some file is hanging, you can see the last log message.

If you want to see the time spent on loading each module on DevTools, you can use `require-so-slow`:

- [GoogleCloudPlatform/require-so-slow: `require`s taking too much time? Profile 'em.](https://github.com/GoogleCloudPlatform/require-so-slow)

## Debug Tips

- `--inspect --inspect-brk` is more useful than console log debugging.
  - https://nodejs.org/en/docs/guides/debugging-getting-started
