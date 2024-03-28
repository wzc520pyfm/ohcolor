# Ohcolor

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

🎨 ohcolor is a moden, expandable immutable color library.

## Usage

Install package:

```sh
# npm
npm install ohcolor

# yarn
yarn add ohcolor

# pnpm
pnpm install ohcolor

# bun
bun install ohcolor
```

Import:

```js
import { mycolor } from "ohcolor";
// or
import mycolor from "ohcolor";

mycolor("#ff3399").rgba(); // [255, 51, 153, 1]
mycolor("orange").rgba(); // [255, 165, 0, 1]
```

## Plugin

A plugin is an independent module that can be added to Ohcolor to extend functionality or add new features.

By default, Ohcolor comes with core code only and some core built-in plugins.

You can load multiple plugins based on your need.

### Customize

You could build your own Ohcolor plugin to meet different needs.

Feel free to open a pull request to share your plugin.

Template of a Ohcolor plugin.

```js
export default (option, ohcolorClass, ohcolorFactory) => {
  // extend ohcolor()
  // e.g. add ohcolor().isSameOrBefore()
  dayjsClass.prototype.isSameOrBefore = function(arguments) {}

  // extend ohcolor
  // e.g. add ohcolor.utc()
  dayjsFactory.utc = arguments => {}

  // overriding existing API
  // e.g. extend ohcolor().format()
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function(arguments) {
    // original format result
    const result = oldFormat.bind(this)(arguments)
    // return modified result
  }
}
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛 [@wzc520pyfm](https://github.com/wzc520pyfm)

Published under [MIT License](./LICENSE).

<br><br>
<a href="https://github.com/wzc520pyfm/ohcolor/graphs/contributors">
<img src="https://contrib.rocks/image?repo=wzc520pyfm/ohcolor" />
</a>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/ohcolor?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/ohcolor
[npm-downloads-src]: https://img.shields.io/npm/dm/ohcolor?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/ohcolor
[codecov-src]: https://img.shields.io/codecov/c/gh/wzc520pyfm/ohcolor/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/wzc520pyfm/ohcolor
[bundle-src]: https://img.shields.io/bundlephobia/minzip/ohcolor?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=ohcolor
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/wzc520pyfm/ohcolor/ci.yml?branch=main&style=flat-square&colorA=18181B&colorB=F0DB4F
[github-actions-href]: https://github.com/wzc520pyfm/ohcolor/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/github/license/wzc520pyfm/ohcolor?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/wzc520pyfm/ohcolor/blob/main/LICENSE
