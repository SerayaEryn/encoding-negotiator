# encoding-negotiator
## Install
```
npm install encoding-negotiator
```
## Example
```js
const encodingNegotiator = require('encoding-negotiator');

encodingNegotiator.negotiate('compress;q=0.5, gzip;q=1.0', ['gzip', 'deflate']); //returns gzip
```
## API
### negotiate(header, supported)
Returns the most preffered encoding available in `supported` The first element of the `supported` array will be used in case of an asterisk.
#### header
The `accept-encoding` header.
#### supported
An array of the supported encodings.
## License

[MIT](./LICENSE)