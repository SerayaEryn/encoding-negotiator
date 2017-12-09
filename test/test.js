'use strict';

const t = require('tap');
const test = t.test;
const enodingNegotiator = require('..');

test('should return identity', (t) => {
  t.plan(1);
  const header = 'identity;q=1';
  const supported = ['gzip'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'identity');
})

test('should return identity', (t) => {
  t.plan(1);
  const supported = ['gzip'];

  const result = enodingNegotiator.negotiate(undefined, supported);

  t.strictEquals(result, 'identity');
})

test('should return gzip', (t) => {
  t.plan(1);
  const header = 'gzip;q=1, identity;q=0.5';
  const supported = ['gzip', 'deflate'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'gzip');
})

test('should return gzip', (t) => {
  t.plan(1);
  const header = 'deflate;q=0.5,identity; q=0.5';
  const supported = ['gzip', 'deflate'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'deflate');
})

test('"*" and ["gzip", "deflate"]', (t) => {
  t.plan(1);
  const header = '*';
  const supported = ['gzip', 'deflate'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'gzip');
})

test('"deflate;q=1.0, *" and ["gzip"]', (t) => {
  t.plan(1);
  const header = 'deflate;q=1.0, *';
  const supported = ['gzip'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'gzip');
})

test('"gzip;q=0" and ["gzip"]', (t) => {
  t.plan(1);
  const header = 'gzip;q=0';
  const supported = ['gzip'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'identity');
})

test('compress;q=0.5, gzip;q=1.0 and ["gzip", compress"]', (t) => {
  t.plan(1);
  const header = 'compress;q=0.5, gzip;q=1.0';
  const supported = ['gzip', 'compress'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'gzip');
})

test('compress;q=0.5, gzip;q=1.0 and ["compress"]', (t) => {
  t.plan(1);
  const header = 'compress;q=0.5, gzip;q=1.0';
  const supported = ['compress'];

  const result = enodingNegotiator.negotiate(header, supported);

  t.strictEquals(result, 'compress');
})