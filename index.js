'use strict'

function negotiate ({ header, supportedEncodings, prefferedEncoding }) {
  if (!header) {
    return undefined
  }
  const supportedEncodingMap = createMap(supportedEncodings, prefferedEncoding)
  const acceptedEncodings = parse(header, prefferedEncoding)
    .sort(comparator)
    .filter(isNonZeroQuality)
  return determinePreffered(acceptedEncodings, supportedEncodingMap)
}

function determinePreffered (acceptedEncodings, supportedEncodings) {
  for (const encoding of acceptedEncodings) {
    const selected = supportedEncodings[encoding.name]
    if (selected) {
      return selected
    }
  }
  return null
}

function createMap (supported) {
  const supportedEncodings = {}
  if (supported.length > 0) {
    supportedEncodings['*'] = supported[0]
  }
  for (const encoding of supported) {
    supportedEncodings[encoding] = encoding
  }
  return supportedEncodings
}

function parse (header, prefferedEncoding) {
  const split = header.split(',')
  return split.map((encoding) => parseEncoding(encoding, prefferedEncoding))
}

function isNonZeroQuality (encoding) {
  return encoding.quality !== 0
}

function parseEncoding (encoding, prefferedEncoding) {
  const [name, second] = encoding.trim().split(';')
  const isPrefferedEncoding = name === prefferedEncoding
  const quality = getQuality(second, isPrefferedEncoding, prefferedEncoding)
  return {
    name,
    quality
  }
}

function getQuality (second, isPrefferedEncoding, preffered) {
  if (isPrefferedEncoding && !second) {
    return 2
  }
  if (!second) {
    return 1
  }
  const [, quality] = second.trim().split('=')
  return parseFloat(quality)
}

function comparator (a, b) {
  return b.quality - a.quality
}

module.exports = {
  negotiate
}
