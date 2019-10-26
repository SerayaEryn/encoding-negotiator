'use strict'

const { Suite } = require('benchmark')
const encodingNegotiator = require('..')
const Negotiator = require('negotiator')

const suite = new Suite()

const header = 'gzip;q=0.5,deflate;q=0.6,identity;q=0.3'
const request = {
  headers: {
    'accept-encoding': header
  }
}
const supportedEncodings = ['gzip', 'deflate', 'identity', 'br']

suite
  .add('negotiator', function () {
    const negotiator = new Negotiator(request)
    negotiator.encoding(supportedEncodings)
  })
  .add('encoding-negotiator', function () {
    encodingNegotiator.negotiate({ header, supportedEncodings })
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
