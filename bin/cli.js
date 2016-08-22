#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var split2 = require('split2')
var sort = require('lodash.sortby')
var range = require('lodash.range')
var shuffle = require('lodash.shuffle')
var config = require('rc')('shuf', {
  n: null,
  lc: null
})

begin()

function begin () {
  if (config._.length === 0 && config.n === null) return mode_to_stdout()
  if (config._.length === 2 && config.n === null) {
    return mode_equal_dist()
  }
  if (config._.length !== 2 && config.n === null) {
    return mode_equal_dist()
  }
  if (config._.length === 2 && config.n !== null) {
    var a = fs.createWriteStream(path.resolve(config._[0]))
    var b = fs.createWriteStream(path.resolve(config._[1]))
    if (config.lc) return mode_two_file_with_limit_and_lc(a, b, config.n, config.lc)
    else return mode_two_file_with_limit(a, b, config.n)
  }
  if (config._.length !== 2 && config.n !== null) {
    console.log('Error, invalid mode. n option only available with 2 files')
    return usage()
  }
}
function mode_to_stdout () {
  process.stdin.pipe(split2())
    .on('data', function (line) {
      if (!!Math.floor(Math.random() * 2)) console.log(line)
    })
}

function mode_two_file_with_limit (a, b, limit) {
  var count = 0
  process.stdin.pipe(split2())
    .on('data', function (line) {
      var target = a
      if (count < limit) {
        if (!!Math.floor(Math.random() * 2)) {
          target = b
          count++
        }
      }
      target.write(line + '\n')
    })
}

function mode_two_file_with_limit_and_lc (a, b, limit, line_count) {
  var count = 0
  var numbers = sort(shuffle(range(0, line_count)).slice(0, limit))
  process.stdin.pipe(split2())
    .on('data', function (line) {
      if (count === numbers[0]) {
        b.write(line + '\n')
        numbers.shift()
      }
      else a.write(line + '\n')
      count++
    })
}

function mode_equal_dist () {
  var output = []
  config._.forEach(function (file) {
    output.push(fs.createWriteStream(path.resolve(file)))
  })
  process.stdin.pipe(split2())
    .on('data', function (line) {
      var random_index = Math.floor(Math.random() * output.length)
      var target = output[random_index]
      target.write(line + '\n')
    })
}

function usage () {
  console.log('cat file.txt | shuf [-n] out1.txt out2.txt')
}
