#!/usr/bin/env node
var split2 = require('split2')

process.stdin.pipe(split2())
  .on('data', function (line) {
    if (!!Math.floor(Math.random() * 2)) console.log(line)
  })
