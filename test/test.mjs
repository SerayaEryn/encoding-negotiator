import test from "ava";
import { negotiateEncoding } from "../index.mjs";

test("should return identity", (t) => {
  const header = "identity;q=1";
  const supportedEncodings = ["gzip", "identity"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "identity");
});

test("should return gzip", (t) => {
  const header = "gzip;q=1, identity;q=0.5";
  const supportedEncodings = ["gzip", "deflate"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "gzip");
});

test("should return deflate", (t) => {
  const header = "deflate;q=0.5,identity; q=0.5";
  const supportedEncodings = ["gzip", "deflate"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "deflate");
});

test('"*" and ["gzip", "deflate"]', (t) => {
  const header = "*";
  const supportedEncodings = ["gzip", "deflate"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "gzip");
});

test('"deflate;q=1.0, *" and ["gzip"]', (t) => {
  const header = "deflate;q=1.0, *";
  const supportedEncodings = ["gzip"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "gzip");
});

test("should ignore invalid encoding if another valid encoding", (t) => {
  const header = "test,br";
  const supportedEncodings = ["br"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "br");
});

test('"gzip;q=0" and ["gzip"]', (t) => {
  const header = "gzip;q=0";
  const supportedEncodings = ["gzip", "identity"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, null);
});

test("unknown encoding", (t) => {
  const header = "white rabbit";
  const supportedEncodings = ["gzip", "identity"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, null);
});

test("return undefined if no header", (t) => {
  const supportedEncodings = ["gzip", "identity"];

  const result = negotiateEncoding(undefined, supportedEncodings);

  t.is(result, undefined);
});

test('compress;q=0.5, gzip;q=1.0 and ["gzip", compress"]', (t) => {
  const header = "compress;q=0.5, gzip;q=1.0";
  const supportedEncodings = ["gzip", "compress"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "gzip");
});

test('compress;q=0.5, gzip;q=1.0 and ["compress"]', (t) => {
  const header = "compress;q=0.5, gzip;q=1.0";
  const supportedEncodings = ["compress"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "compress");
});

test('Should return "br" for "gzip, deflate, br" and ["br", "gzip", "deflate"]', (t) => {
  const header = "gzip, deflate, br";
  const supportedEncodings = ["br", "gzip", "deflate"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "br");
});

test('Should return "br" for "*" and ["br", "gzip", "deflate"]', (t) => {
  const header = "*";
  const supportedEncodings = ["br", "gzip", "deflate"];

  const result = negotiateEncoding(header, supportedEncodings);

  t.is(result, "br");
});
