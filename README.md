# encoding-negotiator
## Install

![Build Status](https://github.com/SerayaEryn/encoding-negotiator/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/SerayaEryn/encoding-negotiator/badge.svg?branch=master)](https://coveralls.io/github/SerayaEryn/encoding-negotiator?branch=master)
[![NPM version](https://img.shields.io/npm/v/encoding-negotiator.svg?style=flat)](https://www.npmjs.com/package/encoding-negotiator)

```
npm i encoding-negotiator -S
```
## Example

```mjs
import negotiateEncoding from 'encoding-negotiator';

negotiateEncoding({
  header: 'compress;q=0.5, gzip;q=1.0',
  supportedEncodings: ['gzip', 'deflate', 'identity']
); //returns gzip
```
## API
### negotiateEncoding(header, supported)
Returns the most preffered encoding available in `supportedEncodings` The first 
element of the `supportedEncodings` array will be used in case of an asterisk.

#### header

The `accept-encoding` header.

#### supportedEncodings

An array of the supported encodings.

##### prefferedEncoding (optional)

An encoding preffered by the server if the client sends multiple encodings no 
quality value (for example `Accept-Encoding: gzip, deflate, br`).

## Benchmark

```
$ node benchmark/benchmark.js 
negotiator x 863,149 ops/sec ±0.40% (99 runs sampled)
encoding-negotiator x 2,346,708 ops/sec ±0.53% (98 runs sampled)
Fastest is encoding-negotiator
```

## License

[MIT](./LICENSE)
