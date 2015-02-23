#!/bin/env node

var root = path.join(__dirname, '../');
var templates = path.join(root, 'templates/');

console.log(templates);

process.argv.forEach(function(entry, index, arr) {
  console.log(entry);
});
